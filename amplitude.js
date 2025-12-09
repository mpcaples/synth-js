
const audioContext = new AudioContext();
let sourceNode; // This will hold your active AudioScheduledSourceNode
   // in order to later control amplitude, we need a gain node: 
    const gainNode = audioContext.createGain();

//Functions to start and stop audio: 
function startAudio () {
    sourceNode = audioContext.createOscillator();
    sourceNode.frequency.value = 440; // A4 note
    sourceNode.type = 'sine'; // Or 'square', 'sawtooth', 'triangle'
    sourceNode.connect(audioContext.destination);

 

    gainNode.gain.value = 0.5; // Set initial amplitude (volume)
    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    sourceNode.start(); // Starts immediately
}
const stopAudio = () => {
    if (sourceNode) {
        sourceNode.stop(0); // Stop immediately
        sourceNode.disconnect(); // Disconnect the source node
        sourceNode = null; // Clear the reference
    }
}
const adjustAmplitude = (amplitude) => {
    if (sourceNode) {
        gainNode.gain.value = amplitude;
    }
}

// grab the controls from the DOM:
const startControl = document.getElementById('play'); 
const stopControl = document.getElementById('stop'); 
const amplitudeControl = document.getElementById('amplitude');

// Event listeners for the controls:
startControl.addEventListener('click', startAudio); 
stopControl.addEventListener('click', stopAudio); 
amplitudeControl.addEventListener('input', (e) => {
    const amplitudeValue = e.target.value; 
    adjustAmplitude(amplitudeValue); 
})


