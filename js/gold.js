'use strict'

var gGold
var gGoldClear

function goldRestart() {
    goldStop()
    goldStart()
}

function goldStart() {
	gGold = setInterval(() => {
		addGold(gBoard)
	}, 10000);
}

function goldStop() {
	clearTimeout(gGoldClear)
	clearInterval(gGold)
}

function addGold(board) {
	var condition = true
	while (condition) {
		var iPosition = getRandomInt(1, board.length - 1)
		var jPosition = getRandomInt(1, board[0].length - 1)
		var cell = gBoard[iPosition][jPosition]
		if (cell.type === FLOOR && !cell.gameElement) {
			cell.gameElement = GOLD
			var location = { i: iPosition, j: jPosition }
			renderCell(location, GOLD_IMG)
			condition = false

			gGoldClear = setTimeout(() => {
				clearGold(location)
			}, 5000);
		}
	}
}

function clearGold(location) {
	if (gBoard[location.i][location.j].gameElement !== BOX
		&& gBoard[location.i][location.j].gameElement !== GAMER) {
		gBoard[location.i][location.j].gameElement = null
		renderCell(location, null)
	}
}

function runGold() {
	clearTimeout(gGoldClear)
	gScore += 100
}

