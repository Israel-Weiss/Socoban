'use strict'

function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function handleKey(event) {
	if (!gameRun) return
	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}
}

function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector)
	elCell.innerHTML = value;
}

function renderStyleCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector)
	elCell.style.backgroundColor = value;
}

function renderCount() {
	var count = document.querySelector('p')
	count.innerText = 'Steps Count:' + gStepCount + ' , Score: ' + gScore
}

function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j
	return cellClass
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function playSound() {
    var sound = new Audio("audio/poyon.mp3")
    sound.play()
}
