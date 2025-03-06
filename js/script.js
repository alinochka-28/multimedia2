const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = new Audio('music/muz1.mp3');
const source = audioCtx.createMediaElementSource(audioElement);
const analyser = audioCtx.createAnalyser();
source.connect(analyser);
analyser.connect(audioCtx.destination);

const balls = document.querySelectorAll('.ball');

function animateBalls() {
    requestAnimationFrame(animateBalls);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    balls.forEach((ball, index) => {
        const maxJumpHeight = 90;
        const amplitude = dataArray[index] || 0;
        const jumpHeight = (amplitude / 255) * maxJumpHeight;
        ball.style.transform = `translateY(-${jumpHeight}px)`;
    });
}

audioElement.onplay = () => {
    audioCtx.resume();
    animateBalls();
};

const images = [
    { src: 'img/image1.png', comment: 'heat waves' },
    { src: 'img/image2.png', comment: 'best friend' },
    { src: 'img/image3.png', comment: 'mine' }
];
let currentIndex = 0;
let intervalId;

document.addEventListener('DOMContentLoaded', () => {
    updateImage();
    setAutoSwitch();
});

function updateImage() {
    const imageElement = document.getElementById('current-image');
    const commentElement = document.getElementById('comment');
    imageElement.style.opacity = 0;

    setTimeout(() => {
        imageElement.src = images[currentIndex].src;
        commentElement.textContent = images[currentIndex].comment;
        imageElement.onload = () => {
            imageElement.style.opacity = 1;
        };
    }, 500);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

function setAutoSwitch() {
    clearInterval(intervalId);
    intervalId = setInterval(nextImage, intervalTime);
}

let intervalTime = 3000;

function setAutoSwitch() {
    clearInterval(intervalId);
    intervalId = setInterval(nextImage, intervalTime);
}

document.getElementById('set-timing').addEventListener('click', () => {
    const timingInput = document.getElementById('timing-input').value;
    intervalTime = timingInput * 1000;
    setAutoSwitch();
});

document.getElementById('cancel-switch').addEventListener('click', () => {
    clearInterval(intervalId);
});

document.addEventListener('DOMContentLoaded', () => {
    updateImage();
    setAutoSwitch();
});

let isPlaying = false;

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

audioElement.addEventListener('timeupdate', () => {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar.dragging) {
        progressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
    }
});

const progressBar = document.getElementById('progress-bar');
progressBar.addEventListener('mousedown', () => {
    progressBar.dragging = true;
});

progressBar.addEventListener('mouseup', () => {
    progressBar.dragging = false;
    changeAudioPosition();
});

progressBar.addEventListener('input', () => {
    if (progressBar.dragging) {
        audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
    }
});

function changeAudioPosition() {
    audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
}

const audioFiles = ['music/muz1.mp3', 'music/muz2.mp3', 'music/muz3.mp3'];
let currentTrackIndex = 0;

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % audioFiles.length;
    changeTrack(currentTrackIndex);
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + audioFiles.length) % audioFiles.length;
}

function changeTrack(trackNumber) {
    audioElement.src = audioFiles[trackNumber];
    audioElement.play();
    document.getElementById('play-pause-icon').src = 'icons/pause.png';
    isPlaying = true;

    // Обновление визуализации
    if (source) {
        source.disconnect();
    }
    source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
}

document.querySelector('button').addEventListener('click', () => {
    const audio = document.getElementById('myAudio');
    audio.play().catch(error => {
        console.log('Ошибка воспроизведения:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    audioElement.play();
});
