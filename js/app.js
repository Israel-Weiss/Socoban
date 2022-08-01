'use strict';

var WALL = 'WALL';
var WALL_IN = 'WALL IN';
var FLOOR = 'FLOOR';
var TARGET = 'TARGET';
var CONTENT = 'CONTENT';
var MARK = 'MARK';

var GAMER = 'GAMER';
var BOX = 'BOX';
var GLUE = 'GLUE';
var CLOCK = 'CLOCK';
var GOLD = 'GOLD';
var WOTER = 'WOTER';
var MAGNET = 'MAGNET';

var GAMER_IMG = '<img src="img/gamer.png" />';
var GAMERP_IMG = '<img src="img/gamer-purple.png" />';
var BOX_IMG = '<img src="img/box.png" />';
var GLUE_IMG = '<img src="img/glue.png" />';
var CLOCK_IMG = '<img src="img/clock.png" />';
var GOLD_IMG = '<img src="img/gold.png" />';
var WOTER_IMG = '<img src="img/woter.png" />';
var MAGNET_IMG = '<img src="img/magnet.png" />';

var gBoard;
var gGamerPos;
var gameOn;
var gameRun;
var gBoxCount;
var gStepCount;
var gFreeStep;
var gFreeCount;
var gScore;

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gameRun = false;
	gameOn = true;
	gBoxCount = 0;
	gStepCount = 0;
	gScore = 100;
	gFreeStep = false;
	gFreeCount = 0;
	renderCount();

	glueStop()
	clockStop()
	goldStop()
	woterStop()
	magnetStop()
}

function runGame() {
	if (gameRun) return
	gameRun = true;
	glueStart();
	clockStart();
	goldStart();
	woterStart();
	magnetStart();
}

function buildBoard() {
	var board = createMat(10, 12);

	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };

			if (i === 0
				|| i === board.length - 1
				|| j === 0
				|| j === board[0].length - 1) {
				cell.type = WALL;
			}

			if (j === 4 && i > 2 && i < board.length - 3
				|| j === board[0].length - 5 && i > 2 && i < board.length - 3) {
				cell.type = WALL_IN;
			}

			if (
				i === 4 && j === 5
				|| i === 3 && j === 6
				|| i === 6 && j === 5
				|| i === 5 && j === 6) {
				cell.type = TARGET;
			}

			board[i][j] = cell;
		}
	}

	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	board[3][2].gameElement = BOX;
	board[3][3].gameElement = BOX;
	board[3][8].gameElement = BOX;
	board[3][9].gameElement = BOX;

	return board;
}

function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];
			var cellClass = getClassName({ i: i, j: j });
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL || currCell.type === WALL_IN) cellClass += ' wall';
			else if (currCell.type === TARGET) cellClass += ' target';

			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BOX) {
				strHTML += BOX_IMG;
			}
			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

function moveTo(i, j) {
	if (!gameOn) return;

	var targetCell = gBoard[i][j];

	if (!gameRun) {
		lucateElement(targetCell, i, j);
		return;
	}

	if (targetCell.type === WALL
		|| targetCell.type === WALL_IN
		|| targetCell.type === CONTENT) return;

	var iAbsDiff = i - gGamerPos.i;
	var jAbsDiff = j - gGamerPos.j;
	var move = false;
	var direction = '';

	if (iAbsDiff === 1 && jAbsDiff === 0) {
		move = true;
		var direction = 'down';
	} else if (iAbsDiff === -1 && jAbsDiff === 0) {
		move = true;
		var direction = 'up';
	} else if (jAbsDiff === 1 && iAbsDiff === 0) {
		move = true;
		var direction = 'right';
	} else if (jAbsDiff === -1 && iAbsDiff === 0) {
		move = true;
		var direction = 'left';
	}
	if (move) {
		saveMemento()
		if (targetCell.gameElement === BOX) {
			pushBox(direction);
			return;
		} else if (targetCell.gameElement === GLUE) {
			runGlue(i, j);
			return;
		} else if (targetCell.gameElement === CLOCK) {
			runClock(i, j);
			return;
		} else if (targetCell.gameElement === GOLD) {
			runGold();
		} else if (targetCell.gameElement === WOTER) {
			return;
		} else if (targetCell.gameElement === MAGNET) {
			gMagnetCount++;
		}

		if (targetCell.type === MARK) {
			pullBox(direction);
			return;
		}
		if (gMarkCell.i > 0) cleanMark();

		step(i, j, GAMER, GAMER_IMG);
	}
}

function step(i, j, value, img) {
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
	renderCell(gGamerPos, '');

	gGamerPos.i = i;
	gGamerPos.j = j;
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = value;
	renderCell(gGamerPos, img);

	if (gFreeStep) freeSteps();

	gStepCount++;
	gScore--;
	renderCount();
}



// Undo functions
var mementos = [];

function saveMemento() {
	var statusGame = document.querySelector('tbody');
	mementos.push(statusGame);
}

function undo() {
	const lastMemento = mementos.pop();
	statusGame = lastMemento ? lastMemento : statusGame;
}

