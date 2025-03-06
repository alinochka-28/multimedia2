let analyzer;
let fft;
let audioContext;
let source;
let audioElement;

function startAudioVisualization() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        source = audioContext.createMediaElementSource(audioElement);
        analyzer = audioContext.createAnalyser();
        fft = new p5.FFT();
        
        source.connect(analyzer);
        analyzer.connect(audioContext.destination);
        fft.setInput(source);
    }
}
document.getElementById("play-pause-button").addEventListener("click", startAudioVisualization);

function setup() {
    let canvas = createCanvas(windowWidth, 200);
    canvas.parent("visualization-container"); // Привязка к контейнеру
    noFill();
}


function draw() {
    background(0); 
    let spectrum = fft.analyze(); 
    stroke(0, 255, 0); 
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < spectrum.length; i++) {
        let amplitude = spectrum[i];
        let y = map(amplitude, 0, 255, height, 0);
        vertex(map(i, 0, spectrum.length, 0, width), y);
    }
    endShape();
}
