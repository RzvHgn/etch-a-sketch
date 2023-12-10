document.addEventListener('DOMContentLoaded', newGrid);
document.getElementById('reset').addEventListener('click', resetGrid);
document.getElementById('eraser').addEventListener('click', enableErase);
document.getElementById('colorPickerButton').addEventListener('click', pickColor);
document.getElementById('toggleModeButton').addEventListener('click', toggleMode);

let erase = false;
let drawingColor = 'black';
let hoverMode = true;

function newGrid() {
    const maincontainer = document.getElementById('maincontainer');
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.addEventListener(hoverMode ? 'mousemove' : 'click', colorPixel);
            maincontainer.appendChild(pixel);
        }
    }
}

function colorPixel(event) {
    event.target.style.backgroundColor = erase ? 'white' : drawingColor;
}

function handleTouchStart(event) {
    event.preventDefault();
}

function handleTouchMove(event) {
    event.preventDefault();
    const simulatedMouseEvent = new MouseEvent(hoverMode ? 'mousemove' : 'click', {
        bubbles: true,
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
    });
    event.target.dispatchEvent(simulatedMouseEvent);
}

function resetGrid() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white';
    });
}

function enableErase() {
    erase = !erase;
    const eraseButton = document.getElementById('eraser');
    eraseButton.classList.toggle('toggled', erase);
    eraseButton.textContent = erase ? 'Drawing Mode' : 'Eraser Mode';
}

function updateColor() {
    const colorPicker = document.getElementById('colorPicker');
    drawingColor = colorPicker.value;
}

function toggleMode() {
    hoverMode = !hoverMode;
    const toggleModeButton = document.getElementById('toggleModeButton');
    toggleModeButton.textContent = hoverMode ? 'Toggle Click Mode' : 'Toggle Hover Mode';

    // Remove existing event listeners and add the appropriate one
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.removeEventListener(hoverMode ? 'click' : 'mousemove', colorPixel);
        pixel.addEventListener(hoverMode ? 'mousemove' : 'click', colorPixel);
    });
}