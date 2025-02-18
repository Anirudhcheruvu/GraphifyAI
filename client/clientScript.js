import config from './config.json';

function getTimestamp() {
  const now = new Date();
  return `${now.toISOString()} [${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
}

console.log(getTimestamp(), "Guidance UI Script loaded");

class Response {
  constructor(data) {
    this.text = null;
    this.audioData = null;
    this.endOfTurn = null;

    if (data.text) {
      this.text = data.text
    }

    if (data.audio) {
      this.audioData = data.audio;
    }
  }
}

function handleReceivedImage(renderedImage) {
  if (!renderedImage) return;

  const imageUrl = `data:image/png;base64,${renderedImage}`;
  dynamicImage.src = imageUrl;

  // Show the image container
  imageContainer.style.display = "block";
}


// Define the AudioInputHandler class to handle audio input streams
class AudioInputHandler {
  constructor() {
    this.audioContext = null;
    this.audioWorkletNode = null;
    this.pcmData = [];
    this.interval = null;
    this.webSocket = null;
    this.stream = null;
    this.isRecording = false;
  }

  async initializeAudioInputStreaming() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: config.input_sample_rate,
      });

      // Load the AudioWorklet module from the extension
      const moduleUrl = chrome.runtime.getURL('pcm-input-processor.js');
      await this.audioContext.audioWorklet.addModule(moduleUrl);

      console.log(getTimestamp(), "Audio Input Worklet module loaded successfully:", moduleUrl);

      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, sampleRate: 16000 },
      });

      const source = this.audioContext.createMediaStreamSource(this.stream);
      this.audioWorkletNode = new AudioWorkletNode(this.audioContext, 'pcm-input-processor');

      // Listen for messages from the AudioWorkletProcessor
      this.audioWorkletNode.port.onmessage = (event) => {
        const pcm16 = event.data;
        this.pcmData.push(...pcm16);
      };

      source.connect(this.audioWorkletNode);
      console.log(getTimestamp(), "Initialized Audio Input Streaming");
      return { success: true };

    } catch (error) {
      console.error(getTimestamp(), "Error Initializing Audio Input Streaming.", error);
      return { success: false, error };
    }
  }




  // Convert PCM data to base64 and send using the callback
  async startRecording() {

    if (this.isRecording) return;  // Prevent overlapping calls
    try {

      // console.log(getTimestamp(), "Starting conversion of PCM Data to base64")
      this.isRecording = true;
      /* 
      this.pcmData contains audio samples (numbers) in a raw format. 
      To send this data as Base64, we first need to pack it into a binary buffer.
      PCM audio data is typically represented as 16-bit signed integers (Int16). 
      Since each Int16 takes 2 bytes, we need this.pcmData.length * 2 bytes of memory. 
      */
      const buffer = new ArrayBuffer(this.pcmData.length * 2);

      /* 
      A DataView object is created to interact with the binary data in the ArrayBuffer.
      DataView provides methods to read and write specific data types (like 16-bit integers) 
      at specified byte offsets in the buffer.
      */
      const view = new DataView(buffer);


      /*
      Each sample in this.pcmData (a 16-bit integer) is written into the ArrayBuffer using the setInt16 method of DataView.
      index * 2: This calculates the byte offset for each sample because each sample takes 2 bytes.
      value: This is the PCM value being written.
      true: This specifies little-endian byte order, which is a common format for audio data.
      */

      this.pcmData.forEach((value, index) => {
        view.setInt16(index * 2, value, true);
      });


      /*
      The Uint8Array is used to create a view of the ArrayBuffer as bytes (8-bit unsigned integers).
      String.fromCharCode.apply(null, ...) is then used to create a string where each byte from the Uint8Array is converted to a character.
      The btoa function is used to convert that string into a Base64-encoded string.
      */
      const b64PCM = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
      // console.log(getTimestamp(), "PCM Data converted to base64")

      return b64PCM;
    }
    catch (error) {
      console.error(getTimestamp(), "Error during PCM to Base64 conversion", error);
      return null;
    }
    finally {
      this.pcmData = [];
      this.isRecording = false;
    }
  }


  stopRecording() {
    console.log(getTimestamp(), "Stopping audio input recording");
    
    // Stop the media stream tracks
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    // Disconnect and clean up audio nodes
    if (this.audioWorkletNode) {
      this.audioWorkletNode.disconnect();
      this.audioWorkletNode = null;
    }

    // Close the audio context
    if (this.audioContext) {
      this.audioContext.close()
        .then(() => {
          this.audioContext = null;
          console.log(getTimestamp(), "Audio context closed successfully");
        })
        .catch(error => {
          console.error(getTimestamp(), "Error closing audio context:", error);
        });
    }

    this.isRecording = false;
  }

}

class StreamHandler {
  constructor() {
    this.startButton = document.getElementById('startButton');
    this.stopButton = document.getElementById('stopButton');
    this.generateGraphButton = document.getElementById('generateGraphButton');
    this.screenCaptureHandler = null;
    this.audioOutputHandler = null;
    this.audioInputHandler = null;
    this.audioInterval = null;
    this.URL = "ws://localhost:8080/ws";
    this.isVideoMode = false; 
  }

  async startStreaming() {
    try {
        // AUDIO MODE: Initialize audio components
      this.audioInputHandler = new AudioInputHandler();
      this.audioOutputHandler = new AudioOutputHandler();
      
      // Initialize both input and output audio
      const audioInInit = await this.audioInputHandler.initializeAudioInputStreaming();
      const audioOutInit = await this.audioOutputHandler.initializeAudioOutputStreaming();
      
      if (!audioInInit.success || !audioOutInit.success) {
        throw new Error('Audio initialization failed');
      }
      
      await this.connect();
      this.startAudioStreaming();
      
  
      // Common UI updates
      document.getElementById('toggleModeButton').disabled = true;
      this.stopButton.disabled = false;
      this.startButton.disabled = true;
  
    } catch (error) {
      console.error(getTimestamp(), "Error during streaming initialization:", error);
      // Change this:
      this.cleanupResources(); 
      // To:
      this.isVideoMode ? this.cleanupVideoResources() : this.cleanupAudioResources();
    }
  }
  

  startAudioStreaming() {
    this.audioInterval = setInterval(async () => {
      try {
        const b64PCM = await this.audioInputHandler.startRecording();
        if (b64PCM) {
          const nextResult = await this.sendMessageToServer(b64PCM);
        }
        // Process the result if needed
      } catch (error) {
        console.error(getTimestamp(), "Error during audio streaming:", error);
      }
    }, config.stream_interval);

    console.log(getTimestamp(), "Audio Interval started:", this.audioInterval);
  }

  

  startScreenCapture() {
    this.captureInterval = window.setInterval(() => {
      this.screenCaptureHandler.captureImage();
    }, config.stream_interval);

    console.log(getTimestamp(), "Capture Interval started:", this.captureInterval);
  }

  async handleGenerateGraph() {
    
    // Add null check
    if (!this.screenCaptureHandler) {
      console.error("No screen capture handler initialized");
      return;
    }
  
    try {
      this.generateGraphButton.disabled = true;
      this.screenCaptureHandler.captureImage();
      
      // Add validation
      if (!this.screenCaptureHandler.currentFrameB64) {
        throw new Error("Failed to capture screen image");
      }

      const imageData = this.screenCaptureHandler.currentFrameB64;
      
      const response = await fetch(`${config.apiHost}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({image: imageData})
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      handleReceivedImage(result.renderedImage);
    } catch (error) {
      console.error(getTimestamp(), "Graph generation failed:", error); 
    } finally {
      this.generateGraphButton.disabled = false;
    }


  }
  

  async sendMessageToServer(b64PCM) {
    if (this.webSocket == null) {
      console.log(getTimestamp(), "Websocket not initialized");
      return;
    }

    // Build an array of media chunks (audio is always sent)
    const mediaChunks = [{
      mime_type: "audio/pcm",
      data: b64PCM,
    }];

    // If in video mode and an image was captured, add the video payload.
    if (this.isVideoMode && this.screenCaptureHandler?.currentFrameB64) {
      mediaChunks.push({
        mime_type: "image/jpeg",
        data: this.screenCaptureHandler.currentFrameB64,
      });
    }
    

    const payload = {
      realtime_input: {
        media_chunks: mediaChunks,
      },
    };
    this.webSocket.send(JSON.stringify(payload));
    console.log(getTimestamp(), "Sent to Server: ");
  }


  async stopStreaming() {
    console.log(getTimestamp(), "Stopping Streaming.");
  
    if (this.isVideoMode && this.screenCaptureHandler) {
    this.screenCaptureHandler.stopRecording();
    this.screenCaptureHandler = null; 
    }
 
    if (this.audioInterval) {
      clearInterval(this.audioInterval);
      this.audioInterval = null;
    }
    
    if (this.webSocket) {
      this.webSocket.close();
      this.webSocket = null;
    }

    this.audioInputHandler?.stopRecording();
    this.audioOutputHandler?.stopRecording();
    
    document.getElementById('toggleModeButton').disabled = false;
    this.stopButton.disabled = true;
    this.startButton.disabled = false;
  }
  

  async connect() {
    console.log(getTimestamp(), "Connecting: ", this.URL);

    this.webSocket = new WebSocket(this.URL);

    this.webSocket.onclose = (event) => {
      console.log(getTimestamp(), "Websocket Closed: ", event);
      if (event.code === 1006) {
        alert("Connection Closed Unexpectedly");
      }
    };


    this.webSocket.onerror = (event) => {
      console.log(getTimestamp(), "Websocket Error: ", event);
    };

    this.webSocket.onopen = async (event) => {
      console.log(getTimestamp(), "Websocket Open: ", event);
      await this.sendInitialSetupMessage(); // Now you can await this call
    };

    this.webSocket.onmessage = async (event) => {
      await this.receiveMessage(event);  // Handle the async receiveMessage here.
    };

  }

  async sendInitialSetupMessage() {

    console.log(getTimestamp(), "Sending setup message");
    const setup_client_message = {
      setup: {
        generation_config: { response_modalities: [config.generation_config.response_modalities] },
        tools: config.tools
      }
    };

    this.webSocket.send(JSON.stringify(setup_client_message));

  }

  async receiveMessage(event) {
    const messageData = JSON.parse(event.data);
    const response = new Response(messageData);

    if (response.audioData) {
        await this.audioOutputHandler.injestAudioChunkToPlay(response.audioData);
    }
    if (response.text) {
        displayMessage(response.text);
    }

    // If an image is received, process it
    if (messageData.renderedImage) {
        await handleReceivedImage(messageData.renderedImage);
    }
}

  
  
  
  cleanupVideoResources() {
    if (this.screenCaptureHandler) {
      this.screenCaptureHandler.stopRecording();
      this.screenCaptureHandler = null;
    }
  }
  
  cleanupAudioResources() {
    this.audioInputHandler?.stopRecording();
    this.audioOutputHandler?.stopRecording();
  }
}

// Define the AudioOutputHandler class to handle audio output streams
class AudioOutputHandler {
  constructor() {
    this.audioContext = null;
    this.audioWorkletNode = null;
    this.initialized = false;
  }

  // Initialize the audio output context and audio worklet
  async initializeAudioOutputStreaming() {
    if (this.initialized) return;

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: config.output_sample_rate,
      });
      // Load the AudioWorklet module from the extension
      const moduleUrl = chrome.runtime.getURL('pcm-output-processor.js');
      await this.audioContext.audioWorklet.addModule(moduleUrl);

      console.log(getTimestamp(), "Audio Output Worklet module loaded successfully:", moduleUrl);

      this.audioWorkletNode = new AudioWorkletNode(this.audioContext, "pcm-output-processor");
      this.audioWorkletNode.connect(this.audioContext.destination);
      this.initialized = true;
      console.log(getTimestamp(), "Initialized Audio Output Streaming");
      return { success: true };

    } catch (error) {
      console.error(getTimestamp(), "Error Initializing Audio Output Streaming.", error);
      return { success: false, error };
    }
  }

  stopRecording() {
    if (this.audioWorkletNode) {
      this.audioWorkletNode.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  // Convert base64 audio data to ArrayBuffer and play it
  async injestAudioChunkToPlay(base64AudioChunk) {
    try {
      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume();
      }
      const arrayBuffer = base64ToArrayBuffer(base64AudioChunk);
      const float32Data = convertPCM16LEToFloat32(arrayBuffer);

      // console.log("Received Float32 audio data:", float32Data); // Add this log
      this.audioWorkletNode.port.postMessage(float32Data);
    } catch (error) {
      console.error(getTimestamp(), "Error processing audio chunk:", error);
    }
  }
}

function base64ToArrayBuffer(base64) {
  // console.log("Input Base64 String:", base64); // Add this log
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  // console.log("Decoded ArrayBuffer:", bytes); // Add this log

  return bytes.buffer;
}

function convertPCM16LEToFloat32(pcmData) {
  const inputArray = new Int16Array(pcmData);
  const float32Array = new Float32Array(inputArray.length);
  // console.log("Input PCM Int16Array:", inputArray); // Add this log

  for (let i = 0; i < inputArray.length; i++) {
    float32Array[i] = inputArray[i] / 32768;
  }
  // console.log("Converted Float32Array:", float32Array); // Add this log

  return float32Array;
}

const uiContainer = document.createElement('div');  
uiContainer.id = 'screen-capture-ui';  
// Inject the UI HTML into the container
uiContainer.innerHTML = `
  <div class="screen-capture-overlay">
    <video id="videoElement" autoplay style="display:none;"></video>
    <canvas id="canvasElement" style="display:none;"></canvas>
    <div class="button-container-gemini">
      <button id="startButton" class="anirudh-button-class start-btn">Start Listening</button>
      <button id="toggleModeButton" class="anirudh-button-class mode-btn">Visualize</button>
      <button id="generateGraphButton" class="anirudh-button-class" style="display: none">Generate Graph</button>
      <button id="stopButton" class="anirudh-button-class stop-btn" disabled>Stop Listening</button>
    </div>
  </div>
`;
{/* <div id="chatLog"></div> */}

// Function to display a message in the chat log
function displayMessage(text) {
  console.log("Display Text is: ", text)
  try {
    // Parse the input text as JSON
    const textJSON = JSON.parse(text);
    console.log("Text JSON is: ", textJSON)
    
    // Extract the guide from the JSON response
    const guide = textJSON[0].response.result;

    // Extract the guide title (text before the first newline)
    const guideTitle = guide.split("\n")[0];

    // Create a new paragraph element to display the title
    const newParagraph = document.createElement("p");
    // Add the guide title in bold using <strong>
    newParagraph.innerHTML = `Fetching Guide for: <strong>${guideTitle}</strong>`;

    // Append the title to the chat log
    const chatLog = document.getElementById("chatLog");
    chatLog.appendChild(newParagraph);

    // Scroll to the bottom of the chat log
    chatLog.scrollTop = chatLog.scrollHeight;
  } catch (error) {
    console.error("Error processing the guide:", error);
  }
}

const style = document.createElement("style");
style.textContent = `
  .screen-capture-overlay {
    border-radius: 8px;
    }
    
  #screen-capture-ui {
  border: 1px solid rgba(0,0,0,0.1);
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  background-color: rgb(245, 245, 230);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid black;
  // width: 360px; /* Fixed width */
  // height: 150px; /* Fixed height */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 15px; 
}
  
.button-container-gemini {
  display: flex;
  justify-content: space-between; /* Ensures even spacing */
  align-items: center; /* Aligns buttons vertically */
  width: 100%;
  gap: 12px; /* Ensures spacing between buttons */
  padding: 12px 0;
  box-sizing: border-box; /* Ensures padding doesn't increase width */
}

.anirudh-button-class {
  all: unset; /* Reset inherited styles */
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif !important;
  padding: 12px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  flex: 1; /* Ensures buttons take equal width */
  min-width: 100px; /* Maintains uniform button width */
  max-width: 100px; /* Prevents uneven stretching */
  height: 38px; /* Ensures all buttons have the same height */
  white-space: normal !important; /* Prevents text from wrapping */
  line-height: 1.1; 
  word-break: break-word;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle depth */
  transition: all 0.2s ease; /* Smooth hover effects */
}

.anirudh-button-class:not(:disabled) {
  // background-color: #4CAF50;
  color: white;
}

.anirudh-button-class:hover {
  // background-color: #45a049;
}

.anirudh-button-class:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}
  
.anirudh-button-class:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
  .start-btn {
  background-color: #4CAF50;
}

.start-btn:hover {
  background-color: #45a049;
}

.stop-btn {
  background-color: rgba(220, 53, 70, 0.54);
}

.stop-btn:hover {
  background-color: #a71d2a;
}

.mode-btn {
  background-color: #2196F3;
  min-height: 40px; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
}

.mode-btn:hover {
  background-color: #1976D2;
}

#generateGraphButton {
  background-color: #9C27B0;  /* Modern purple */
  color: white;
  transition: all 0.2s ease;
}

#generateGraphButton:hover {
  background-color: #7B1FA2;  /* Deep amethyst */
}

#generateGraphButton:active {
  background-color: #6A1B9A;  /* Rich royal purple */
}

#generateGraphButton:disabled {
  background-color: #CE93D8;  /* Soft lavender */
  cursor: not-allowed;
}

  #chatLog {
    width: 320px;
    height: 560px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    margin-top: 10px;
    background-color: #f5f5f5;
  }

  #chatLog p {
    margin: 8px 0;
    padding: 12px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    color: black;
  }

  #chatLog p:nth-child(odd) {
    background-color: #e8eaf6;
  }
`;

// Append the style and container to the document
document.head.appendChild(style);
document.body.appendChild(uiContainer);


// ----- Dynamic Image Handling Section -----

// Create a dynamic image container (hidden by default)
const imageContainer = document.createElement("div");
imageContainer.id = "dynamicImageContainer";
imageContainer.style.position = "fixed";
imageContainer.style.top = "50%";
imageContainer.style.left = "50%";
imageContainer.style.transform = "translate(-50%, -50%)";
imageContainer.style.backgroundColor = "rgba(0,0,0,0.8)";
imageContainer.style.padding = "15px";
imageContainer.style.borderRadius = "8px";
imageContainer.style.display = "none"; // Initially hidden
imageContainer.style.zIndex = "10000";
imageContainer.style.textAlign = "center";

// Create an image element to display received images
const dynamicImage = document.createElement("img");
dynamicImage.id = "dynamicImage";
dynamicImage.style.maxWidth = "90vw";
dynamicImage.style.maxHeight = "90vh";
dynamicImage.style.display = "block";
dynamicImage.style.marginBottom = "10px";

// Create a close button for the image viewer
const closeButton = document.createElement("button");
closeButton.innerText = "Close";
closeButton.style.padding = "10px 15px";
closeButton.style.border = "none";
closeButton.style.backgroundColor = "#ff4444";
closeButton.style.color = "white";
closeButton.style.borderRadius = "5px";
closeButton.style.cursor = "pointer";

// Close the image viewer when the button is clicked
closeButton.addEventListener("click", () => {
  imageContainer.style.display = "none"; // Hide the container
});

// Append the image and close button to the container
imageContainer.appendChild(dynamicImage);
imageContainer.appendChild(closeButton);

// Append the container to the body (but keep it hidden initially)
document.body.appendChild(imageContainer);



// Enable dragging for the UI container
let isDragging = false;
let offsetX, offsetY;

// Event 
uiContainer.addEventListener('mousedown', (event) => {
  isDragging = true;

  // Get the mouse position relative to the UI container
  const rect = uiContainer.getBoundingClientRect();
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;

  // Change the cursor to move
  uiContainer.style.cursor = 'move';
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    
    // Prevent text selection while dragging
    event.preventDefault();

    // Set the new position of the UI container
    uiContainer.style.left = `${event.clientX - offsetX}px`;
    uiContainer.style.top = `${event.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;

  // Reset the cursor
  uiContainer.style.cursor = 'default';
});



// Append the UI container to the body of the page
document.body.appendChild(uiContainer);

console.log(getTimestamp(), "UI container appended");

const streamHandlerInstance = new StreamHandler();


// Default mode: audio only
streamHandlerInstance.isVideoMode = false;

async function captureImage() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { action: "captureVisibleTab" },
      (response) => {
        if (!response || response.success === false) {
          console.error("Failed to capture screen:", response?.error || "Unknown error");
          reject(new Error(response?.error || "Unknown error"));
          return;
        }
        resolve(response.dataUrl.split(",")[1]); // Return base64 image data
      }
    );
  });
}


async function sendTableAndReceiveImage(capturedImage){
  const response = await fetch(`${config.apiHost}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({image: capturedImage})
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
}



// After initializing streamHandlerInstance
 streamHandlerInstance.generateGraphButton.addEventListener(
  'click', 
  async () => {
    try{
      // generateButton.innerText = 'Generating graph...'; 
      streamHandlerInstance.generateGraphButton.disabled = true;
        const capturedImage = await captureImage();
        
        if (!capturedImage) {
          throw new Error("Failed to capture screen image");
        }

        const response = await sendTableAndReceiveImage(capturedImage)
        
        const result = await response.json();

        handleReceivedImage(result.renderedImage);

      } catch (error) {
        console.error(getTimestamp(), "Graph generation failed:", error); 
      } finally {
        streamHandlerInstance.generateGraphButton.disabled = false;
        // generateButton.innerText = 'Generate Graph';
      }

      }
);

const toggleModeButton = document.getElementById('toggleModeButton');



toggleModeButton.addEventListener('click', () => {
  streamHandlerInstance.isVideoMode = !streamHandlerInstance.isVideoMode;

  streamHandlerInstance.generateGraphButton.style.display = streamHandlerInstance.isVideoMode ? 'inline-block' : 'none';
  streamHandlerInstance.startButton.style.display = streamHandlerInstance.isVideoMode ? 'none' : 'inline-block';
  streamHandlerInstance.stopButton.style.display = streamHandlerInstance.isVideoMode ? 'none' : 'inline-block';

  // screenCaptureHandler = new ScreenCapture();

  toggleModeButton.innerText = streamHandlerInstance.isVideoMode 
    ? 'back' 
    : 'Visualize';
});


streamHandlerInstance.startButton.addEventListener("click", () => streamHandlerInstance.startStreaming());
streamHandlerInstance.stopButton.addEventListener("click", () => streamHandlerInstance.stopStreaming());