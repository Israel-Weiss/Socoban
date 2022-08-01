'use strict'

var gMagnet;
var gMagnetClear;
var gMagnetCount = 0

function magnetRestart() {
    magnetStop()
    magnetStart()
}

function magnetStart() {
	gMagnet = setInterval(() => {
		addMagnet(gBoard, MAGNET, MAGNET_IMG)
	}, 10000);
}

function magnetStop() {
	clearTimeout(gMagnetClear)
	clearInterval(gMagnet)
}

function addMagnet(board) {
	var condition = true
	while (condition) {
		var iPosition = getRandomInt(1, board.length - 1)
		var jPosition = getRandomInt(1, board[0].length - 1)
		var cell = gBoard[iPosition][jPosition]
		if (cell.type === FLOOR && !cell.gameElement) {
			cell.gameElement = MAGNET
			var location = { i: iPosition, j: jPosition }
			renderCell(location, MAGNET_IMG)
			condition = false

			gMagnetClear = setTimeout(() => {
				clearMagnet(location)
			}, 5000);
		}
	}
}

function clearMagnet(location) {
	if (gBoard[location.i][location.j].gameElement !== BOX
		&& gBoard[location.i][location.j].gameElement !== GAMER) {
		gBoard[location.i][location.j].gameElement = null
		renderCell(location, null)
	}
}