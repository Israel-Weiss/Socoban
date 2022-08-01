'use strict'

var gClock;
var gClockClear;

function clockRestart() {
	clockStop()
	freeStop()
}

function clockStart() {
	gClock = setInterval(() => {
		addClock(gBoard, GLUE, GLUE_IMG)
	}, 10000);
}

function clockStop() {
	clearTimeout(gClockClear);
	clearInterval(gClock)
}

function addClock(board) {
	var condition = true
	while (condition) {
		var iPosition = getRandomInt(1, board.length - 1)
		var jPosition = getRandomInt(1, board[0].length - 1)
		var cell = gBoard[iPosition][jPosition]
		if (cell.type === FLOOR && !cell.gameElement) {
			cell.gameElement = CLOCK
			var location = { i: iPosition, j: jPosition }
			renderCell(location, CLOCK_IMG)
			condition = false

			gClockClear = setTimeout(() => {
				clearClock(location)
			}, 5000);
		}
	}
}

function clearClock(location) {
	if (gBoard[location.i][location.j].gameElement !== BOX
		&& gBoard[location.i][location.j].gameElement !== GAMER) {
		gBoard[location.i][location.j].gameElement = null
		renderCell(location, null)
	}
}

function runClock(i, j) {
	step(i, j, GAMER, GAMER_IMG);
	clockStop();
	gFreeStep = true;
}

function freeSteps() {
	gStepCount--
	gScore++
	gFreeCount++
	if (gFreeCount === 10) {
		freeStop()
	}
}

function freeStop() {
	gFreeStep = false
	gFreeCount = 0
	clockStart()
}