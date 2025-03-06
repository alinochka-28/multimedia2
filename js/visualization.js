let analyzer;
let fft;
let audioContext;
let source;
let audioElement;

function setup() {
    createCanvas(windowWidth, 200);
    noFill();

    // Инициализация аудио
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioElement = document.querySelector('audio');
    source = audioContext.createMediaElementSource(audioElement);
    analyzer = audioContext.createAnalyser();
    fft = new p5.FFT();

    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
    analyzer.fftSize = 256;

    // Запуск визуализации
    fft.setInput(source);
}

function draw() {
    background(0);

    // Получение данных частот
    const spectrum = fft.analyze();

    // Отрисовка визуализации
    stroke(255);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < spectrum.length; i++) {
        const amplitude = spectrum[i];
        const y = map(amplitude, 0, 255, height, 0);
        vertex(map(i, 0, spectrum.length, 0, width), y);
    }
    endShape();
}   