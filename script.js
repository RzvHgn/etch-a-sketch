let hoverMode = true;

document.addEventListener('DOMContentLoaded', () => {
    newGrid();
    document.getElementById('reset').addEventListener('click', resetGrid);
    document.getElementById('eraser').addEventListener('click', enableErase);
    document.getElementById('colorPickerButton').addEventListener('click', openColorPicker);
    document.getElementById('toggleModeButton').addEventListener('click', toggleMode);
});

let erase = false;
let drawingColor = 'black';

function newGrid() {
    const maincontainer = document.getElementById('maincontainer');
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.addEventListener('mouseover', (event) => colorPixel(event, hoverMode));
            pixel.addEventListener('click', (event) => colorPixel(event, hoverMode));
            pixel.addEventListener('touchstart', (event) => handleTouch(event, hoverMode));
            pixel.addEventListener('touchmove', (event) => handleTouch(event, hoverMode));
            maincontainer.appendChild(pixel);
        }
    }
}

function colorPixel(event, hoverMode) {
    if ((event.type === 'click' && !hoverMode) || (event.type === 'mouseover' && hoverMode)) {
        event.target.style.backgroundColor = erase ? 'white' : drawingColor;
    }
}

function handleTouch(event, hoverMode) {
    event.preventDefault(); // Prevent default touch behavior (like scrolling)
    const touch = event.touches[0];
    const touchTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (touchTarget && touchTarget.classList.contains('pixel')) {
        touchTarget.style.backgroundColor = erase ? 'white' : drawingColor;
    }
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
    console.log('Updated color:', drawingColor);
}

function openColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.click();
}

function refreshEventListeners() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.removeEventListener('click', colorPixel);
        pixel.removeEventListener('mouseover', colorPixel);
        pixel.removeEventListener('touchstart', handleTouch);
        pixel.removeEventListener('touchmove', handleTouch);

        pixel.addEventListener(hoverMode ? 'mouseover' : 'click', (event) => colorPixel(event, hoverMode));
        pixel.addEventListener('touchstart', (event) => handleTouch(event, hoverMode));
        pixel.addEventListener('touchmove', (event) => handleTouch(event, hoverMode));
    });
}

function toggleMode() {
    hoverMode = !hoverMode;
    refreshEventListeners();
    const toggleModeButton = document.getElementById('toggleModeButton');
    toggleModeButton.textContent = hoverMode ? 'Toggle Click Mode' : 'Toggle Hover Mode';
}
