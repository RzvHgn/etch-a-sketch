document.addEventListener('DOMContentLoaded', newGrid);
document.getElementById('reset').addEventListener('click',resetGrid);
document.getElementById('eraser').addEventListener('click',enableErase);
document.getElementById('black').addEventListener('click',drawingColor);

function newGrid() {
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.addEventListener('mousemove', colorPixel);
            maincontainer.appendChild(pixel);
        }
    }
}

let erase = false;

function colorPixel(event) {
    event.target.style.backgroundColor = erasing ? 'white' : drawingColor;
}

function resetGrid() {
    const pixels = document.querySelectorAll('.pixel');
    // Reset the background color of all pixels
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white';
    });
}

function enableErase() {
    erase = !erase;
    const eraseButton = document.getElementById('eraseButton');
            eraseButton.textContent = erase ? 'Drawing Mode' : 'Eraser Mode';
}

function drawingColor() {
        // Set the drawing color to black
        drawingColor = 'black';
}