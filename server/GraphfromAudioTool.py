from database import *
from prompts import Prompts
from google import genai
import json
import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import base64
import io
from typing import Union

def process_graph_from_audio_tool(query: str, client: genai.Client) -> Union[str,None]:
    
    response_dict = fetch_data_and_plotcode_from_query(query, client)   

    if not response_dict:
        raise ValueError("Failed to generate response from Gemini")

    print("Here is the df_command: " + response_dict["df_command"])
    print("Here is the plot_code: " + response_dict["plot_code"])

    evaluated_df = execute_data_query(response_dict["df_command"])
    base64_image =  execute_python_query_and_plot(response_dict["plot_code"],evaluated_df)

    return base64_image
        
def execute_data_query(data_query: str) -> pd.DataFrame:
    try:
        evaluated_df = eval(data_query)
        print("temp DataFrame:")
        print(evaluated_df)
    except Exception as e:
        raise ValueError(f"Error executing data query {e}")
        
    return evaluated_df

def execute_python_query_and_plot(python_query: str, evaluated_df: pd.DataFrame) -> str:
    try:
        globals={}
        locals={'evaluated_df': evaluated_df}
        buf = io.BytesIO()
        exec(python_query, globals, locals) 
        print("temp DataFrame:")
        print(evaluated_df)

    except Exception as e:
        raise ValueError(f"Error executing python query {e}")

    
    plt.tight_layout()  # Ensures proper spacing
    plt.savefig(buf, format="png", bbox_inches="tight")
    plt.close() 
    buf.seek(0)  

    return base64.b64encode(buf.getvalue()).decode("utf-8")
        
def fetch_data_and_plotcode_from_query(query: str, client: genai.Client) -> dict:
    system_instruction = Prompts.QUERY_TO_GRAPH_PROMPT

    response = client.models.generate_content(
        model="gemini-2.0-pro-exp-02-05",
        contents=[system_instruction," Here is the User query: "+query],
        config={
            'temperature':0.0,  
            'top_p':0.0,        
        }
    )

    # response.resolve()

    if not response.text:
        raise ValueError(
            "No text response received from Gemini for table extraction.") 
    
    response_text = response.text.strip()
    response_text = response_text.replace('```json', '').replace('```', '').strip()

    print("Raw Response from Gemini:")
    print(response_text)

    response_dict = convert_from_json(response_text)

    return response_dict

def convert_from_json(json_string: str) -> dict:
    """Validates if a string is valid JSON. Raises ValueError if invalid."""
    try:
       dict_data =  json.loads(json_string) 
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON format: {e}")
    return dict_data  

if __name__=="__main__":
    from PIL import Image
    from ClientHandler import ClientHandler
    query = "Give me the graph of the prices of products"
    base64_image = process_graph_from_audio_tool(query, client=ClientHandler().get_client())
    pil_image = Image.open(io.BytesIO(base64.b64decode(base64_image)))
    pil_image.show()