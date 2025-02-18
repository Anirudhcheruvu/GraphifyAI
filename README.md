# GraphifyAI

## Overview

This project aims to enhance data interaction by providing users with a Chrome extension that leverages AI to generate real-time visualizations from spoken queries and on-screen tables.
This project is a Chrome extension that enables users to interact with Google's Gemini AI for real-time data visualization. It provides two key functionalities:

1. **Audio Mode:** Users can interact with Gemini via voice commands. When users request a database-related query, the Gemini API generates a tool call that executes on the server, retrieves relevant data, and generates a graph using Python.
2. **Visualization Mode:** Users can capture tables displayed on their screen, convert them into structured data (CSV), and generate visualizations.

## Features
- **Real-time interaction with Gemini**
- **Audio-driven database queries**
- **Automated graph generation from tables**
- **Seamless Chrome extension integration**

![image](https://github.com/user-attachments/assets/7513dcc5-b907-4339-ad68-b95b4b7ff81b)

## How It Works

This extension offers two primary modes of operation: Audio Mode and Visualization Mode. Audio Mode allows users to interact with Gemini using voice commands to retrieve and visualize database-related insights, while Visualization Mode enables users to convert on-screen tables into structured graphs.
### 1. Audio Mode (Voice Interaction)
- The user activates the extension and speaks a query.
- The Chrome extension captures the audio, processes it, and sends it to the backend server.
- The backend interacts with Gemini and receives a tool call request if the query is database-related.
- The server executes the tool call:
  - Makes an API call to Gemini to get a **database query** and a **python script** to visualize the data as per the user query.
  - Queries an internal database using the database query.
  - Runs the Python script to visualize the data, i.e generate the graph image.
  - The resulting graph image is sent back to the user.

### 2. Visualization Mode (Table to Graph Conversion)
- The user enables visualization mode and clicks the "Generate Graph" button.
- The extension captures the table as an image.
- The backend sends the image to Gemini, which converts it into CSV format.
- A new API call is made to Gemini to generated the Python script to convert the CSV into a graph.
- The python script is executed to generate the graph.
- The processed graph is sent back to the user for display.

## Project Structure
### **Client-Side (Chrome Extension)**
- `manifest.json`: Defines permissions, content scripts, and background processes.
- `background.js`: Handles background tasks like extension installation and message passing.
- `clientScript.js`: Manages UI interactions, WebSocket communication, and audio processing.
- `pcm-input-processor.js`: Handles PCM audio input processing.
- `pcm-output-processor.js`: Handles PCM audio output processing.

### **Server-Side**
- `main.py`: The FastAPI server handling WebSocket connections and API endpoints.
- `ClientHandler.py`: Manages the connection with Gemini API.
- `GraphfromAudioTool.py`: Processes audio queries and generates graphs.
- `GraphfromTableTool.py`: Converts captured tables to CSV and generates visualizations.
- `database.py`: Contains sample database tables.
- `toolcall.py`: Handles tool calls from Gemini.
- `prompts.py`: Defines system prompts used for Gemini interactions.

## Sequence Diagram
![GraphifyAI_sequence_diagram](https://github.com/user-attachments/assets/02fdbd0a-2402-4cf8-8154-511d6180fc21)

## Installation & Setup

### **1. Setting Up the Chrome Extension**
1. Clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer Mode" (top-right corner).
4. Click "Load unpacked" and select the `chrome-extension` directory.
5. The extension should now be available in your browser.

### **2. Running the Server**
1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
2. Set up environment variables (e.g., `GOOGLE_API_KEY` for Gemini access).
3. Start the FastAPI server:
   ```sh
   python main.py
   ```
4. The server will be available at `http://localhost:8080`.

## Usage Guide
1. Click on the extension icon to open the UI.
2. Switch between **Audio Mode** and **Visualization Mode** as needed.
3. Speak your query (for database-related insights) or capture a table for visualization.
4. View the generated graphs directly in the extension.

## Contributing
Feel free to submit issues, pull requests, or suggest improvements.

## License
This project is licensed under the MIT License.

