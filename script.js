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
            maincontainer.appendChild(pixel);
        }
    }
    refreshEventListeners();
}

function colorPixel(event) {
    if (event.type === 'click' && !hoverMode) {
        event.target.style.backgroundColor = erase ? 'white' : drawingColor;
    } else if (event.type === 'mouseover' && hoverMode) {
        event.target.style.backgroundColor = erase ? 'white' : drawingColor;
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

function colorPixel(event) {
    if ((event.type === 'click' && !hoverMode) || (event.type === 'mouseover' && hoverMode)) {
        event.target.style.backgroundColor = erase ? 'white' : drawingColor;
    }
}

function refreshEventListeners() {
    console.log('Refreshing event listeners...');
    
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.removeEventListener('click', colorPixel);
        pixel.removeEventListener('mouseover', colorPixel);

        pixel.addEventListener(hoverMode ? 'mouseover' : 'click', colorPixel);
    });
}

function toggleMode() {
    console.log('Toggling mode...');
    hoverMode = !hoverMode;
    console.log('hoverMode is now:', hoverMode);
    refreshEventListeners();
    const toggleModeButton = document.getElementById('toggleModeButton');
    toggleModeButton.textContent = hoverMode ? 'Toggle Click Mode' : 'Toggle Hover Mode';
}
