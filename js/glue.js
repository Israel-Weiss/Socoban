'use strict'

var gGlue
var gGlueClear

function glueRestart() {
    glueStop()
    glueStart()
}

function glueStart() {
	gGlue = setInterval(() => {
		addGlue(gBoard)
	}, 10000);
}

function glueStop() {
	clearTimeout(gGlueClear);
	clearInterval(gGlue)
}

function addGlue(board) {
	var condition = true
	while (condition) {
		var iPosition = getRandomInt(1, board.length - 1)
		var jPosition = getRandomInt(1, board[0].length - 1)
		var cell = gBoard[iPosition][jPosition]
		if (cell.type === FLOOR && !cell.gameElement) {
			cell.gameElement = GLUE
			var location = { i: iPosition, j: jPosition }
			renderCell(location, GLUE_IMG)
			condition = false

			gGlueClear = setTimeout(() => {
				clearGlue(location)
			}, 5000);
		}
	}
}

function clearGlue(location) {
	if (gBoard[location.i][location.j].gameElement !== BOX
		&& gBoard[location.i][location.j].gameElement !== GAMER) {
		gBoard[location.i][location.j].gameElement = null
		renderCell(location, null)
	}
}

function runGlue(i, j) {
	clearTimeout(gGlueClear)
	gameOn = false
	setTimeout(() => {
		release(i, j)
	}, 5000);
    gStepCount += 4
    gScore -= 4
	step(i, j, GAMER, GAMERP_IMG)
}

function release(i, j) {
	step(i, j, GAMER, GAMER_IMG)
	gameOn = true
}