'use strict'

var gElement = {
    i: 0,
    j: 0,
    object: null
}

var gCell = {}

function lucateElement(cell, i, j) {
    if (gElement.object) lucateSelection(cell, i, j)
    else objectSelection(cell, i, j)
}

function objectSelection(targetCell, i, j) {
    if (targetCell.type === WALL
        || targetCell.type === FLOOR && !targetCell.gameElement) return;

    if (targetCell.type === WALL_IN) {
        gElement.object = WALL
    } else if (targetCell.type === TARGET) {
        gElement.object = TARGET
    } else if (targetCell.gameElement === BOX) {
        gElement.object = BOX
    }

    gElement.i = i
    gElement.j = j
    gCell = targetCell
}

function lucateSelection(targetCell, i, j) {
    if (targetCell.type === WALL
        || targetCell.type === WALL_IN
        || targetCell.type === TARGET
        || targetCell.gameElement === BOX) return;

    deleteObject(gCell)
    lucateObject(targetCell, i, j)
}

function deleteObject(cell) {
    cell.type = FLOOR
    cell.gameElement = null
    var location = { i: gElement.i, j: gElement.j }
    renderCell(location, '')
    renderStyleCell(location, 'rgb(208, 166, 166')
}

function lucateObject(cell, i, j) {
    var location = { i: i, j: j }

    switch (gElement.object) {
        case WALL:
            cell.type = WALL_IN
            renderStyleCell(location, 'rgb(103, 37, 37)')
            break;
        case TARGET:
            cell.type = TARGET
            renderStyleCell(location, 'rgb(252, 107, 107')
            break;
        case BOX:
            cell.gameElement = BOX
            console.log(location);
            renderCell(location, BOX_IMG)
            break;
    }
    gElement.object = null
}
