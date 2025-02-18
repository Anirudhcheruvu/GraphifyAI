from google import genai
import base64
from prompts import Prompts
import io


def process_graph_from_image_tool(latest_image: str, client: genai.Client) -> str:

    csv_output = fetch_csv_from_image(latest_image, client)
    function_declaration_code = fetch_function_declaration_from_csv(
        csv_output, client)
    base64_image = get_graph_from_function_declaration_code(
        function_declaration_code, csv_output)

    return base64_image


def fetch_csv_from_image(latest_image: str, client: genai.Client) -> str:
    image_bytes = base64.b64decode(latest_image)

    system_instruction = Prompts.IMAGE_TO_CSV_PROMPT

    response = client.models.generate_content(
        model="gemini-2.0-pro-exp-02-05",
        contents=[
            {
                "parts": [
                    {"inline_data": {"mime_type": "image/jpeg", "data": image_bytes}},
                    {"text": system_instruction}
                ]
            }
        ]
    )

    if not response.text:
        raise ValueError(
            "No text response received from Gemini for table extraction.")

    csv_output = response.text.strip()
    csv_output = csv_output.replace(
    '```csv', '').replace('```', '').strip()

    print("CSV Output from Gemini (fetchGraphfromTable):")
    print(csv_output)


    return csv_output


def fetch_function_declaration_from_csv(csv_output: str, client: genai.Client) -> str:
    system_instruction = Prompts.CSV_TO_CODE_PROMPT
    user_query = f"""### **CSV Data Structure:**\n{csv_output}"""

    response = client.models.generate_content(
        model="gemini-2.0-pro-exp-02-05",
        contents=[system_instruction, user_query],
        config={
            'temperature': 0.0,
            'top_p': 0.0}
    )

    function_delcaration_code = response.text.strip()
    function_delcaration_code = function_delcaration_code.replace(
        '```python', '').replace('```', '').strip()
    print("Python code generated: "+function_delcaration_code)

    return function_delcaration_code


def get_graph_from_function_declaration_code(function_declaration_code: str, csv_output: str) -> str:

    try:
        namespace_function_declaration = {}

        exec(function_declaration_code, namespace_function_declaration)

        function_to_execute = namespace_function_declaration.get(
            'generate_plot')

        if not function_to_execute:
            raise ValueError(
                "Function 'generate_plot' not found in the generated code.")

        base64_image = function_to_execute(csv_output)

        return base64_image  # Return the Base64 encoded image string

    except NameError as e:
        print("Unexpected function name by model ", e)

    except Exception as e:
        error_message = f"Error during Gemini API call in genereating pythoncode: {e}"
        print(error_message)
        return error_message


if __name__ == "__main__":
    # Sample query
    from PIL import Image
    from ClientHandler import ClientHandler

    test_query = "Generate a graph for sales data."

    test_image = Image.open("TableImage.png")

    with io.BytesIO() as buffer:
        test_image.save(buffer, format="PNG")  # Convert image to bytes
        base64_image = base64.b64encode(buffer.getvalue()).decode("utf-8")

    result = process_graph_from_image_tool(
        base64_image, client=ClientHandler().get_client())

    pil_image = Image.open(io.BytesIO(base64.b64decode(result)))
    pil_image.show()
