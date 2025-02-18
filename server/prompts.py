
class Prompts:

    IMAGE_TO_CSV_PROMPT = """
Extract the table from the image provided.
Return the table data as CSV (Comma Separated Values).
Ensure the CSV is well-formatted with commas as delimiters and each row on a new line.
If there are header rows in the table, include them as the first row in the CSV output.
"""

    CSV_TO_CODE_PROMPT = """Your task is to generate a complete Python function code block that can be run to generate a graph for the given CSV data using Matplotlib and Pandas.
Write python code to generate just a single graph.

### Instructions: ###
1. Read the given CSV data string using `pd.read_csv(io.StringIO(csv_output))`. You will already have the access to string csv_output, do not write lines like df = pd.read_csv('data.csv') to read the csv.
2. **Best Graph Selection**: Analyze the structure of the CSV and determine the most appropriate type of graph to represent the data. The user should intuitively understand the graph.
3. **RULES**:
- Ensure the Python code is **syntactically correct, efficient**.
- Use **Matplotlib** for visualization.
- Use **Pandas** for data processing.
- **Do NOT include plt.show(). Use plt.savefig()** or similar methods..
- Provide **clear labels, titles, and legends**.
-**DO NOT USE ANY COMMENTS OR EXPLAINATIONS IN THE CODE**
- Give me the complete python code block that will generate the plot.

### Expected Output: ###
 
```python 
def generate_plot(csv_output):
    df = pd.read_csv(io.StringIO(csv_output))

    # code to generate the plot
    ### ***WRITE YOUR CODE TO GENERATE PLO
    
    #Save to in-memory buffer
    buffer = io.BytesIO()
    plt.savefig(buffer, format="png", bbox_inches="tight")
    plt.close(fig)  # Close to prevent display

    #Convert buffer to base64
    buffer.seek(0)
    img_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return img_base64
```
"""
    QUERY_TO_GRAPH_PROMPT = """
The pandas DataFrames contain the following tables:

Table: customers_df
Schema:
- customer_id: int
- first_name: str
- last_name: str
- email: str

Table: products_df
Schema:
- product_id: int
- product_name: str
- price: float

Table: orders_df
Schema:
- order_id: int
- customer_id: int
- order_date: str

Table: order_items_df
Schema:
- order_item_id: int
- order_id: int
- product_id: int
- quantity: int

Given a user query, generate two things:

1) A df_command as a DataFrame query to fetch the required data as per user request. No need to assign the result to a variable. Just as a single query.
2) A plot_code as a complete Python code block to generate the appropriate plot that uses the evaluated_df DataFrame that i will store the result of df_command query in a variable named evaluated_df. Do NOT include plt.show(). Use plt.savefig() or similar methods.

Additionally, higlight the data point that the user wants in the plot.

Return these in a single-line JSON string format for both the keys df_command and plot_code. NO EXPLANATION NEEDED. Just code for df_command.

Ensure that both the df_command and plot_code are syntactically correct, optimized, and use the evaluated_df DataFrame for the plot.
"""