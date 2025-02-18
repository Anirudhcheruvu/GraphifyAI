class PCMProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.buffer = new Float32Array();

        // port.onmessage receives audio in this processor. 
        this.port.onmessage = (e) => {
            const newData = e.data;
            console.log("Data received in Worklet:", newData); // Add this log
            const newBuffer = new Float32Array(this.buffer.length + newData.length);
            newBuffer.set(this.buffer);
            newBuffer.set(newData, this.buffer.length);
            this.buffer = newBuffer;
        };
    }

    process(inputs, outputs, parameters) {
        // Process method writes buffer to output channel.
        const outputBuffer = outputs[0]; // The output buffer from the worklet. Working with mono audio, so taking the first element.
        const audioSamples = outputBuffer[0]; // The audio sample data for the first channel of audio

        if (this.buffer.length >= audioSamples.length) {
            // If the current buffer has enough data to fill the output channel

            // Copy data from `this.buffer` into `audioSamples`
            audioSamples.set(this.buffer.slice(0, audioSamples.length));

            // Remove the data that has been copied to `audioSamples`
            this.buffer = this.buffer.slice(audioSamples.length);
            console.log("Output Worklet has given audio output")

            return true; 
            /* tells the browser that processing has been completed 
            and the process method can continue to the next iteration.
            the method always returns true, which means it keeps running in the 
            audio rendering loop as long as there is data to process. */
            }

        return true;
        /* If there's not enough data in this.buffer to fill audioSamples, 
        the code still returns true because it wants the AudioWorkletProcessor 
        to keep running and process the next chunk when more data becomes available. 
        */
    }
}

registerProcessor('pcm-output-processor', PCMProcessor);