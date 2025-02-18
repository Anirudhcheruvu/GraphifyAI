import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, HTTPException
from GraphfromTableTool import process_graph_from_image_tool
from toolcall import process_toolcall
from google.genai import types
from ClientHandler import ClientHandler
import asyncio
import json
import websockets
import matplotlib
matplotlib.use('Agg')  


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


@app.post("/process-image")
async def process_image_endpoint(data: dict):
    try:
        image_data = data.get('image')
        if not image_data:
            raise HTTPException(status_code=400, detail="No image provided")

        client_handler = ClientHandler()
        base64_image = process_graph_from_image_tool(
            image_data,
            client_handler.get_client()
        )

        print("Received image data")
        return {"renderedImage": base64_image}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        client_handler = ClientHandler()

        # Receive initial configuration
        config_message = await websocket.receive_text()
        config_data = json.loads(config_message)
        config = config_data.get("setup", {})
        config["system_instruction"] = "You are a helpful Assistant. Users will ask for data visualization. Use the tool call 'process_graph_from_audio_tool'. YOU MUST NOT ASK too many follow-up questions about user's query!!. Greet the users in english."

        async with client_handler.get_client().aio.live.connect(model="gemini-2.0-flash-exp", config=config) as session:
            print("Connected to Gemini API")
            connection_params = {
                "client_websocket": websocket,
                "session": session,
                "active": True
            }

            send_task = asyncio.create_task(
                ClientHandler.send_to_gemini_realtime(connection_params))
            receive_task = asyncio.create_task(
                receive_from_gemini_and_forward_to_client(connection_params))

            await asyncio.gather(send_task, receive_task)

    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        if 'send_task' in locals():
            send_task.cancel()
        if 'receive_task' in locals():
            receive_task.cancel()
        await websocket.close()
        print("WebSocket connection closed")


async def receive_from_gemini_and_forward_to_client(connection_params):
    session = connection_params.get("session")
    try:
        while True:
            try:
                async for response in session.receive():  # Iterate through the generator
                    connection_params['function_responses'] = None
                    if response.tool_call:  # Check tool_call on each response object
                        function_responses = await process_toolcall(
                            response.tool_call, connection_params)
                        connection_params["function_responses"] = function_responses.get(
                            "response_to_client")
                        await session.send(input=types.LiveClientToolResponse(function_responses=function_responses.get("response_to_gemini")))

                    # Forward the actual response object to client handler
                    await ClientHandler.forward_to_client(connection_params, response)
                    print("Response sent to client")
            except websockets.exceptions.ConnectionClosed as e:
                print("Connection closed during receive : ", str(e))
                break
            except Exception as e:
                print(f"Error receiving from Gemini-1: {e}")
                break

    except Exception as e:
        print(f"Error receiving from Gemini-2: {e}")
    finally:
        print("Gemini session closed.")
        return


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="localhost",
        port=8080,
        reload=True,)

