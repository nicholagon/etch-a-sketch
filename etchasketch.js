const container = document.querySelector('#container');
const btns = document.querySelectorAll('button');
var divCell;
var cells;

btns.forEach(btn => btn.addEventListener('click', function(e){
    if(e.target.className.indexOf("pen-btn") !== -1){
        selectPen(e.target.id);
    }
    else if(e.target.className.indexOf("grid-size-btn") !== -1) {
        selectGridSize(e.target.id);
    }
    else if(e.target.id === 'reset-btn') {
        clearCanvas();
    }
}));

function clearCanvas() {
    cells.forEach((eachDiv) => {
        eachDiv.style['background-color'] = '#f0eeee';
    })
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
        divCell = document.createElement('div');
        divCell.setAttribute('id', 'cell');
        divCell.style['border'] = '0.5px solid #dddddd';
        container.appendChild(divCell);
    }
    
}

function resetPreviousGridDivs() {
    while(container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

function selectPen(penId) {
    let pen = '#999999';
    if(penId === 'rainbow-btn') {
        pen = '#' + generateRandomColor();
    }
    else if(penId === 'erase-btn') {
        pen = '#f0eeee';
    }

    cells = document.querySelectorAll('#cell');
    cells.forEach((divCell) => {
        divCell.addEventListener('mouseover', () => {
            divCell.style['background-color'] = pen;
        })
    })

}

function generateRandomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}



// this just sets an initial pen & 16x16 grid to be displayed upon page load
setGrid(16, 37.5);
selectPen();