'use strict'

var gWoter;
var gWoterClear;

function woterRestart() {
    woterStop()
    woterStart()
}

function woterStart() {
	gWoter = setInterval(() => {
		addWoter(gBoard)
	}, 10000);
}

function woterStop() {
	clearTimeout(gWoterClear);
	clearInterval(gWoter)
}

function addWoter(board) {
	var condition = true
	while (condition) {
		var iPosition = getRandomInt(1, board.length - 1)
		var jPosition = getRandomInt(1, board[0].length - 1)
		var cell = gBoard[iPosition][jPosition]
		if (cell.type === FLOOR && !cell.gameElement) {
			cell.gameElement = WOTER
			var location = { i: iPosition, j: jPosition }
			renderCell(location, WOTER_IMG)
			condition = false

			gWoterClear = setTimeout(() => {
				clearWoter(location)
			}, 5000);
		}
	}
}

function clearWoter(location) {
	if (gBoard[location.i][location.j].gameElement !== BOX
		&& gBoard[location.i][location.j].gameElement !== GAMER) {
		gBoard[location.i][location.j].gameElement = null
		renderCell(location, null)
	}
}
