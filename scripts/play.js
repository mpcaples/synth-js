const audioContext = new AudioContext();
let sourceNode; // This will hold your active AudioScheduledSourceNode
let currentPitch = null; // Track which pitch is currently playing
   // in order to later control amplitude, we need a gain node: 
const gainNode = audioContext.createGain();

const synthKeysSelector = document.getElementById('synth-keys');
const synthKeysButtons = synthKeysSelector.querySelectorAll('button');
console.log(synthKeysButtons);
const pitchMap = {
    'C': 261.63,
    'D': 293.66,
    'E': 329.63,
    'F': 349.23,
    'G': 392.00,
    'A': 440.00,
    'B': 493.88,
    'C2': 523.25,
};

synthKeysButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pitch = pitchMap[button.textContent];
        
        if (currentPitch === pitch) {
            // Same key pressed again → stop the sound
            stopAudio();
        } else {
            // Different key (or no sound playing) → stop current and play new
            stopAudio();
            startAudio(pitch);
        }
    })
})

//Functions to start and stop audio: 
function startAudio (pitch) {
    sourceNode = audioContext.createOscillator();
    sourceNode.frequency.value = pitch;
    sourceNode.type = 'sine'; // Or 'square', 'sawtooth', 'triangle'

    gainNode.gain.value = 0.5; // Set initial amplitude (volume)
    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    sourceNode.start(); // Starts immediately
    currentPitch = pitch; // Track the current pitch
}
const stopAudio = () => {
    if (sourceNode) {
        sourceNode.stop(0); // Stop immediately
        sourceNode.disconnect(); // Disconnect the source node
        sourceNode = null; // Clear the reference
        currentPitch = null; // Clear the current pitch
    }
}
const controlAudio = (pitch) => {
    if (sourceNode) {
        stopAudio();
    } else {
        startAudio(pitch);
    }
}
const adjustAmplitude = (amplitude) => {
    if (sourceNode) {
        gainNode.gain.value = amplitude;
    }
}
const adjustShape = (shape) => {
    if (sourceNode) {
        sourceNode.type = shape;
    }
}

// grab the controls from the DOM:

const amplitudeControl = document.getElementById('amplitude');
const shapeControl = document.getElementById('shape');

// Event listeners for the controls:
amplitudeControl.addEventListener('input', (e) => {
    const amplitudeValue = e.target.value; 
    adjustAmplitude(amplitudeValue); 
})
shapeControl.addEventListener('change', (e) => {
    const shape = e.target.value;
    adjustShape(shape);
})


