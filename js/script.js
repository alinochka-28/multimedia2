const images = [
    { src: 'img/image1.png', comment: 'heat waves' },
    { src: 'img/image2.png', comment: 'best friend' },
    { src: 'img/image3.png', comment: 'mine' }
];
const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let audioSourse;
let analyser;
let currentIndex = 0;
let intervalId;
let intervalTime = 3000;

container.addEventListener('click', function () {
    const audioElement = document.getElementById('audio-element');
    audioElement.src = 'music/muz1.mp3';  // Убедитесь, что путь к файлу правильный
    const audioContext = new AudioContext();
    audioElement.play();
    
    const audioSource = audioContext.createMediaElementSource(audioElement);
    const analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const barWidth = 15;
    let barHeight;
    let x;

    // Функция для анимации
    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Очищаем холст
        analyser.getByteFrequencyData(dataArray); // Получаем данные с анализатора
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray); // Рисуем визуализацию
        requestAnimationFrame(animate);  // Следующий кадр
    }
    
    animate();  // Запускаем анимацию
});

function drawVisualiser(bufferLenght, x, barWidth, barHeight, dataArray){
    for (let i = 0; i < bufferLenght; i++){
        barHeight = dataArray[i] * 1.5;
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i * 4);
        const hue = i * 0.3;
        ctx.fillStyle = 'hsl(' + hue + ', 100%, ' + barHeight / 3 + '%)';        
        ctx.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;
        ctx.restore();
    }
}

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

document.getElementById('set-timing').addEventListener('click', () => {
    const timingInput = document.getElementById('timing-input').value;
    intervalTime = timingInput * 1000;
    setAutoSwitch();
});

document.getElementById('cancel-switch').addEventListener('click', () => {
    clearInterval(intervalId);
});

function setAutoSwitch() {
    clearInterval(intervalId);
    intervalId = setInterval(nextImage, intervalTime);
}