'use strict'

let gCurrLineIdx = 0

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] }
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}

function setImg(imgId) {
    if (!imgId) return
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elImgContainer = document.querySelector('.image-container')
    const elToolBar = document.querySelector('.editor-container')
    elCanvasContainer.classList.remove('hidden')
    elImgContainer.classList.add('hidden')
    elToolBar.classList.remove('hidden')
    gMeme.selectedImgId = imgId
}

function getCtx() {
    return gCtx
}

function getElCanvas() {
    return gElCanvas
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gCurrLineIdx].txt = txt
    renderMeme()
}

function getImages() {
    return gImgs
}

function changeFontColor(color) {
    gMeme.lines[gCurrLineIdx].color = color
    renderMeme()
}

function increaseFont() {
    gMeme.lines[gCurrLineIdx].size++
}

function decreaseFont() {
    gMeme.lines[gCurrLineIdx].size--
}

function getCurrLineIdx() {
    return gCurrLineIdx
}

function switchLines() {
    gCurrLineIdx++
    if (gCurrLineIdx === gMeme.lines.length) gCurrLineIdx = 0
    renderMeme()
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function isLineClicked(offsetX, offsetY) {
    const lines = getLines()
    const clickedLineIdx = lines.findIndex((line) => {
        const lineWidth = gCtx.measureText(line.txt).width
        const lineHeight = line.size
        return (
            offsetX >= line.pos.x - lineWidth / 2 - 10 &&
            offsetX <= line.pos.x + lineWidth + 20 &&
            offsetY >= line.pos.y - 10 &&
            offsetY <= line.pos.y + lineHeight + 20
        )
    })
    if (clickedLineIdx !== -1) {
        updateLineIdx(clickedLineIdx)
        return true
    }
    return false
}

function getLine() {
    return gMeme.lines[gCurrLineIdx]
}

function getLines() {
    return gMeme.lines
}

function updateLineIdx(lineIdx) {
    gCurrLineIdx = lineIdx
}

function removeLine() {
    if (gMeme.lines.length > 0) {
        gMeme.lines[gCurrLineIdx]
        gMeme.lines.splice(gCurrLineIdx, 1)
        gCurrLineIdx = 0
    } else {
        alert('Sorry,Nothing to remove')
    }
}

function setTextDrag(isDrag) {
    gMeme.lines[gCurrLineIdx] = isDrag
}

function addLine() {
    const lines = getLines()
    const newLineNum = lines.length + 1
    const newLine = _createLine(newLineNum)
    gMeme.lines.push(newLine)
    gCurrLineIdx = (gMeme.lines.length - 1)
}

function _createLine(newLineNum) {
    let newPos
    if (newLineNum === 1) {
        newPos = { x: 120, y: 50 }
    }

    if (newLineNum === 2) {
        newPos = { x: 120, y: 300 }
    }

    if (newLineNum > 2) {
        newPos = { x: 120, y: 200 }
    }

    return {
        txt: '',
        size: 22,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: 'Impact',
        pos: { x: newPos.x, y: newPos.y },
        isDrag: false,
    }
}

function alignText(alignment) {
    const line = getLine()
    line.align = alignment
    switch (alignment) {
        case 'up':
            line.pos.y -= 10
            break;
        case 'down':
            line.pos.y += 10
            break;
        case 'end':
            line.pos.x = gElCanvas.width
            break;
        case 'start':
            line.pos.x = 0
            break;
        default: 'center'
            line.pos.x = gElCanvas.width / 2
    }
}