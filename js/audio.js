let audioElement = document.getElementById('audio-element');
let isPlaying = false;
const audioFiles = ['music/muz1.mp3', 'music/muz2.mp3', 'music/muz3.mp3'];
let currentTrackIndex = 0;

function togglePlayPause() {
    if (isPlaying) {
        audioElement.pause();
        document.getElementById('play-pause-icon').src = 'icons/play.png';
    } else {
        audioElement.play();
        document.getElementById('play-pause-icon').src = 'icons/pause.png';
    }
    isPlaying = !isPlaying;
}

document.getElementById('play-pause-button').addEventListener('click', togglePlayPause);

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % audioFiles.length;
    changeTrack(currentTrackIndex);
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + audioFiles.length) % audioFiles.length;
    changeTrack(currentTrackIndex);
}

function changeTrack(trackNumber) {
    audioElement.src = audioFiles[trackNumber];
    audioElement.play();
    document.getElementById('play-pause-icon').src = 'icons/pause.png';
    isPlaying = true;
}
