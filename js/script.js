const images = [
    { src: 'img/image1.png', comment: 'heat waves' },
    { src: 'img/image2.png', comment: 'best friend' },
    { src: 'img/image3.png', comment: 'mine' }
];
let currentIndex = 0;
let intervalId;
let intervalTime = 3000;

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