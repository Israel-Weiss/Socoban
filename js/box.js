'use strict'

var gSlides
var gMarkCell = { i: null, j: null }

function pushBox(direction) {
    switch (direction) {
        case 'up':
            pushUp(direction)
            break;
        case 'down':
            pushDown(direction)
            break;
        case 'right':
            pushRight(direction)
            break;
        case 'left':
            pushLeft(direction)
            break;
    }
}

function pushUp(direction) {
    var cell = gBoard[gGamerPos.i - 2][gGamerPos.j]
    if (cell.type !== WALL && cell.type !== WALL_IN && cell.gameElement !== BOX) {
        if (cell.gameElement === WOTER) slides(direction)
        cell.gameElement = BOX
        var location = { i: gGamerPos.i - 2, j: gGamerPos.j }
        renderCell(location, BOX_IMG)
        step(gGamerPos.i - 1, gGamerPos.j, GAMER, GAMER_IMG)
        if (cell.type === TARGET) {
            targetBox(cell, location)
        }
    } else {
        clearInterval(gSlides)
        var markLocation = { i: gGamerPos.i + 1, j: gGamerPos.j }
        markCell(markLocation)
    }
}

function pushDown(direction) {
    var cell = gBoard[gGamerPos.i + 2][gGamerPos.j]
    if (cell.type !== WALL && cell.type !== WALL_IN && cell.gameElement !== BOX) {
        if (cell.gameElement === WOTER) slides(direction)
        cell.gameElement = BOX
        var location = { i: gGamerPos.i + 2, j: gGamerPos.j }
        renderCell(location, BOX_IMG)
        step(gGamerPos.i + 1, gGamerPos.j, GAMER, GAMER_IMG)
        if (cell.type === TARGET) {
            targetBox(cell, location)
        }
    } else {
        clearInterval(gSlides)
        var markLocation = { i: gGamerPos.i - 1, j: gGamerPos.j }
        markCell(markLocation)
    }
}

function pushRight(direction) {
    var cell = gBoard[gGamerPos.i][gGamerPos.j + 2]
    if (cell.type !== WALL && cell.type !== WALL_IN && cell.gameElement !== BOX) {
        if (cell.gameElement === WOTER) slides(direction)
        cell.gameElement = BOX
        var location = { i: gGamerPos.i, j: gGamerPos.j + 2 }
        renderCell(location, BOX_IMG)
        step(gGamerPos.i, gGamerPos.j + 1, GAMER, GAMER_IMG)
        if (cell.type === TARGET) {
            targetBox(cell, location)
        }
    } else {
        clearInterval(gSlides)
        var markLocation = { i: gGamerPos.i, j: gGamerPos.j - 1 }
        markCell(markLocation)
    }
}

function pushLeft(direction) {
    var cell = gBoard[gGamerPos.i][gGamerPos.j - 2]
    if (cell.type !== WALL && cell.type !== WALL_IN && cell.gameElement !== BOX) {
        if (cell.gameElement === WOTER) slides(direction)
        cell.gameElement = BOX
        var location = { i: gGamerPos.i, j: gGamerPos.j - 2 }
        renderCell(location, BOX_IMG)
        step(gGamerPos.i, gGamerPos.j - 1, GAMER, GAMER_IMG)
        if (cell.type === TARGET) {
            targetBox(cell, location)
        }
    } else {
        clearInterval(gSlides)
        var markLocation = { i: gGamerPos.i, j: gGamerPos.j + 1 }
        markCell(markLocation)
    }
}

function targetBox(cell, location) {
    cell.type = CONTENT
    renderStyleCell(location, 'rgb(31, 241, 45)')
    gBoxCount++
    clearInterval(gSlides)
    if (gBoxCount === 4) {
        gameOn = false
        glueStop()
        clockStop()
        goldStop()
        woterStop()
        magnetStop()
    }
}

function slides(direction) {
    gSlides = setInterval(() => {
        pushBox(direction)
    }, 100);
}

function markCell(location) {
    if (gMagnetCount === 0 || gBoard[location.i][location.j].type === WALL
        || gBoard[location.i][location.j].type === WALL_IN) return
    gMarkCell = location
    gBoard[location.i][location.j].type = MARK
    renderStyleCell(location, 'antiquewhite')
}

function cleanMark() {
    gBoard[gMarkCell.i][gMarkCell.j].type = FLOOR
    renderStyleCell(gMarkCell, 'rgb(208, 166, 166)')
    gMarkCell = { i: null, j: null }
}

function pullBox(direction) {
    switch (direction) {
        case 'up':
            pullUp()
            break;
        case 'down':
            pullDown()
            break;
        case 'right':
            pullRight()
            break;
        case 'left':
            pullLeft()
            break;
    }
    cleanMark()
}

function pullUp() {
    var location = { i: gGamerPos.i, j: gGamerPos.j }
    step(location.i - 1, location.j, GAMER, GAMER_IMG)

    gBoard[location.i][location.j].gameElement = BOX
    renderCell(location, BOX_IMG)

    var lastLocation = { i: location.i + 1, j: location.j }
    gBoard[lastLocation.i][lastLocation.j].gameElement = null
    renderCell(lastLocation, '')

    gMagnetCount--
}

function pullDown() {
    var location = { i: gGamerPos.i, j: gGamerPos.j }
    step(location.i + 1, location.j, GAMER, GAMER_IMG)

    gBoard[location.i][location.j].gameElement = BOX
    renderCell(location, BOX_IMG)

    var lastLocation = { i: location.i - 1, j: location.j }
    gBoard[lastLocation.i][lastLocation.j].gameElement = null
    renderCell(lastLocation, '')
    
    gMagnetCount--
}

function pullRight() {
    var location = { i: gGamerPos.i, j: gGamerPos.j }
    step(location.i, location.j + 1, GAMER, GAMER_IMG)

    gBoard[location.i][location.j].gameElement = BOX
    renderCell(location, BOX_IMG)

    var lastLocation = { i: location.i, j: location.j - 1 }
    gBoard[lastLocation.i][lastLocation.j].gameElement = null
    renderCell(lastLocation, '')
    
    gMagnetCount--
}

function pullLeft() {
    var location = { i: gGamerPos.i, j: gGamerPos.j }
    step(location.i, location.j - 1, GAMER, GAMER_IMG)

    gBoard[location.i][location.j].gameElement = BOX
    renderCell(location, BOX_IMG)

    var lastLocation = { i: location.i, j: location.j + 1 }
    gBoard[lastLocation.i][lastLocation.j].gameElement = null
    renderCell(lastLocation, '')
    
    gMagnetCount--
}


