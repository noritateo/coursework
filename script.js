const audio = document.getElementById('audio-player');

// List of audio files
const trackList = [
    'https://thetestdata.com/assets/audio/mp3/thetestdata-sample-mp3-1.mp3',  // replace with your actual file paths
    'https://thetestdata.com/assets/audio/mp3/thetestdata-sample-mp3-2.mp3',
    'https://thetestdata.com/assets/audio/mp3/thetestdata-sample-mp3-3.mp3'
];

let currentTrack = 0;

// Load the first track
audio.src = trackList[currentTrack];