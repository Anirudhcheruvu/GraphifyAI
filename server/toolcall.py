from GraphfromAudioTool import process_graph_from_audio_tool
from ClientHandler import ClientHandler


async def process_toolcall(toolCall, connection_params):
    print(f"Using Tool: {toolCall}")
    function_calls = toolCall.function_calls
    function_responses = {
        'response_to_client': [],
        'response_to_gemini': []
    }
    print("Toolcalling started\n")
    for function_call in function_calls:
        name = function_call.name
        args = function_call.args
        call_id = function_call.id

        # Validate function name
        if name == "process_graph_from_audio_tool":
            try:
                result = process_graph_from_audio_tool(
                    args["query"], client=ClientHandler().get_client())
                if result:
                    print("fetGraph has been called..\n")
                    function_responses['response_to_client'].append(
                        {
                            "name": name,
                            "response": {"result": result},
                            "id": call_id
                        }
                    )
                    function_responses['response_to_gemini'].append(
                        {
                            "name": name,
                            "response": {"result": "Graph has been plotted."},
                            "id": call_id
                        }
                    )

                else:
                    print(f"No data found for query: {args['query']}")
            except Exception as e:
                print(
                    f"Error executing function process_graph_from_audio_tool: {e}")
                return

            except Exception as e:
                print(
                    f"Error executing function process_graph_from_image_tool: {e}")
                return

    return function_responses
