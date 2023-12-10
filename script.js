document.addEventListener('DOMContentLoaded', newGrid);
document.getElementById('reset').addEventListener('click',resetGrid);
document.getElementById('eraser').addEventListener('click',enableErase);

function newGrid() {
    const maincontainer = document.getElementById('maincontainer');
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.addEventListener('mousemove', colorPixel);
            pixel.addEventListener('touchstart', handleTouchStart);
            pixel.addEventListener('touchmove', handleTouchMove);
            maincontainer.appendChild(pixel);
        }
    }
}

let erase = false;

function colorPixel(event) {
    event.target.style.backgroundColor = erase ? 'white' : 'black';
}

function handleTouchStart(event) {
    // Prevent the default touch behavior to avoid scrolling
    event.preventDefault();
}

function handleTouchMove(event) {
    // Prevent the default touch behavior to avoid scrolling
    event.preventDefault();

    // Get the corresponding mousemove event for touch devices
    const simulatedMouseEvent = new MouseEvent('mousemove', {
        bubbles: true,
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
    });

    // Dispatch the simulated mousemove event
    event.target.dispatchEvent(simulatedMouseEvent);
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
    const eraseButton = document.getElementById('eraser');
            eraseButton.textContent = erase ? 'Drawing Mode' : 'Eraser Mode';
}

function pickColor() {
    drawingColor = prompt('Enter a color (e.g., red, #00ff00):');
    if (!drawingColor) {
        drawingColor = 'black'; // Default color
    }
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