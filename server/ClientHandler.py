from dotenv import load_dotenv
from google import genai
import os
import json
import base64
import websockets
from fastapi.websockets import WebSocketDisconnect


class SingletonFactory(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(
                SingletonFactory, cls).__call__(*args, **kwargs)
            print(f"Creating new instance of {cls}")
        else:
            print("Returning existing instance")
        return cls._instances[cls]


class ClientHandler(metaclass=SingletonFactory):
    def __init__(self):
        load_dotenv()
        self.client = genai.Client(
            api_key=os.getenv("GOOGLE_API_KEY"),
            http_options={
                'api_version': 'v1alpha'
            }
        )

    def get_client(self):
        return self.client

    def get_model_text(self):
        return self.model_text

    def get_model_vision(self):
        return self.model_vision

    @classmethod
    async def send_to_gemini_realtime(cls, connection_params):
        try:
            client_websocket = connection_params.get("client_websocket")
            session = connection_params.get("session")
            function_responses = connection_params.get("function_responses")

            if session is None:
                raise ValueError(
                    "client_websocket and session are required parameters")

            if function_responses:
                await session.send(input=function_responses)

            if client_websocket:
                try:
                    while True:
                        try:

                            if client_websocket.client_state == "DISCONNECTED":
                                print("WebSocket is closed, stopping receive loop.")
                                break

                            message = await client_websocket.receive_text()
                            data = json.loads(message)
                            if "realtime_input" in data:
                                for chunk in data["realtime_input"]["media_chunks"]:
                                    if chunk["mime_type"] == "audio/pcm":
                                        await session.send({"mime_type": "audio/pcm", "data": chunk["data"]})
                                    elif chunk["mime_type"] == "image/jpeg":
                                        connection_params["latest_image"] = chunk["data"]
                                        await session.send({"mime_type": "image/jpeg", "data": chunk["data"]})

                        except WebSocketDisconnect:
                            print("Client WebSocket disconnected.")
                            break

                        except Exception as e:
                            print(f"Error processing message: {e}")

                except Exception as e:
                    print(f"Error sending to Gemini: {e}")
                finally:
                    print("send_to_gemini closed")
        except websockets.exceptions.ConnectionClosed as e:
            print("Connection closed during send : ", str(e))
            return

    @staticmethod
    async def forward_to_client(connection_params, response):
        client_websocket = connection_params.get("client_websocket")
        function_responses = connection_params.get("function_responses")

        try:

            if function_responses:
                print("entered function_responses check\n")
                for response_item in function_responses:
                    print("response_item")
                    if "result" in response_item["response"]:
                        print("entered if condition")  # Check for Base64 image
                        await client_websocket.send_text(json.dumps({
                            "renderedImage": response_item["response"]["result"]
                        }))
                        print("✅ Image sent to client")

            if response.server_content:
                model_turn = response.server_content.model_turn
                if model_turn:
                    for part in model_turn.parts:
                        if hasattr(part, 'text') and part.text is not None:
                            await client_websocket.send_text(json.dumps({"text": part.text}))
                        elif hasattr(part, 'inline_data') and part.inline_data is not None:
                            print("audio mime_type:",
                                  part.inline_data.mime_type)
                            base64_audio = base64.b64encode(
                                part.inline_data.data).decode('utf-8')
                            payload = {
                                "audio": base64_audio,
                            }
                            payload = json.dumps(payload)
                            await client_websocket.send_text(payload)
                            print("audio received")

                if response.server_content.turn_complete:
                    print('\n<Turn complete>')

            else:
                print("Unhandled response from Gemini")

        except websockets.exceptions.ConnectionClosedOK:
            print("Client connection closed normally (receive)")
        except Exception as e:
            print(f"Error receiving from Gemini: {e}")
