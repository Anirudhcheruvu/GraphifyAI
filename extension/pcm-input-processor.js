class PCMInputProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.buffer = [];
    }
    
    process(inputs, outputs, parameters) {
      const inputBuffer = inputs[0];
      if (inputBuffer && inputBuffer[0]) {
        const channelData = inputBuffer[0]; // Access the first channel (mono audio)
  
        // Convert Float32 samples to 16-bit PCM
        const pcm16 = new Int16Array(channelData.length);
        for (let i = 0; i < channelData.length; i++) {
          pcm16[i] = channelData[i] * 0x7fff; // Scale Float32 [-1, 1] to Int16 range [-32768, 32767]
        }
  
        // Post the PCM data back to the main thread
        this.port.postMessage(pcm16);
      }
  
      // Always return true to keep the processor running
      return true;
    }
  }
  
// Register the processor
registerProcessor('pcm-input-processor', PCMInputProcessor);
