/*
    Variables and Initializations
*/
let cells;
let eachCell;
let lastPenUsed;

const container = document.querySelector('#container');
const grid_btns = document.querySelectorAll('.grid-size-btn-area');
const pen_btns = document.querySelectorAll('.pen-btn-area');
const reset_btn = document.querySelector('#reset-btn');

/*
    Button event listeners
*/
grid_btns.forEach(btn => btn.addEventListener('click', initGrid));
pen_btns.forEach(btn => btn.addEventListener('click', initPen));
reset_btn.addEventListener('click', clearCanvas);

/*
    Grid functions
*/
function initGrid(e) {
    if(e.target.className.indexOf("grid-size-btn") !== -1) {
        selectGridSize(e.target.id);
        selectPen(lastPenUsed);
    }
}

function selectGridSize(btnId) {
    const GRID_LEN = 600;
    const defaultSizes = [16, 32, 64, 100];
    let eachCellLength;

    resetPreviousGridDivs();

    if(btnId === 'btn-16'){
        eachCellLength = GRID_LEN / defaultSizes[0]; 
        setGrid(defaultSizes[0], eachCellLength);
    }
    else if (btnId === 'btn-32') {
        eachCellLength = GRID_LEN / defaultSizes[1]; 
        setGrid(defaultSizes[1], eachCellLength);
    }
    else if (btnId === 'btn-64') {
        eachCellLength = GRID_LEN / defaultSizes[2]; 
        setGrid(defaultSizes[2], eachCellLength);
    }
    else if (btnId === 'btn-100') {
        eachCellLength = GRID_LEN / defaultSizes[3]; 
        setGrid(defaultSizes[3], eachCellLength);
    }
}

function setGrid(size, cellLength) {
    container.style['grid-template-columns'] = `repeat(${size}, ${cellLength}px)`;
    container.style['grid-template-rows'] = `repeat(${size}, ${cellLength}px)`;

    for(let i = 0; i < Math.pow(size, 2); i++) {
        eachCell = document.createElement('div');
        eachCell.setAttribute('id', 'cell');
        eachCell.style['border'] = '0.5px solid #dddddd';
        container.appendChild(eachCell);
    }
}

function clearCanvas() {
    cells.forEach((cell) => {
        cell.style['background-color'] = '#f0eeee';
    })
}

function resetPreviousGridDivs() {
    while(container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

/*
    Pen functions
*/
function initPen(e) {
    if(e.target.className.indexOf("pen-btn") !== -1){
        lastPenUsed = e.target.id;
        selectPen(e.target.id);
    }
}

function selectPen(penId) {
    if(penId === 'erase-btn') {
        pen = '#f0eeee';
    }
    else {
        pen = '#999999';
    }

    cells = document.querySelectorAll('#cell');
    cells.forEach((eachCell) => {
        eachCell.addEventListener('mouseover', () => {
            if(penId === 'rainbow-btn'){
                eachCell.style['background-color'] = `#${generateRandomColor()}`;
            }
            else {
                eachCell.style['background-color'] = pen;
            }
        })
    })
}

function generateRandomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}

/*
    Set the initial pen and 16*16 grid upon page load
*/
setGrid(16, 37.5);
selectPen();