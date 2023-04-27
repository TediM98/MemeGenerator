'use strict'
let gIsDownloading = false
let gCurrLineIdx = 0

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] },
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 28,
            align: 'center',
            fontColor: 'white',
            strokeColor: 'black',
            font: 'Impact',
            pos: { x: 120, y: 50 },
            isDrag: false,
        }
    ]
}

function setImg(imgId) {
    if (!imgId) return
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elGalleryContainer = document.querySelector('.gallery-container')
    const elToolBar = document.querySelector('.editor-container')
    document.querySelector('.gallery').classList.remove('active')
    document.querySelector('.control-box').classList.remove('hidden')
    elCanvasContainer.classList.remove('hidden')
    elGalleryContainer.classList.add('hidden')
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
    gMeme.lines[gCurrLineIdx].fontColor = color
    renderMeme()
}

function changeStrokeColor(color) {
    gMeme.lines[gCurrLineIdx].strokeColor = color
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
    const elTxtInput = document.querySelector('.canvas-txt')
    gCurrLineIdx++
    if (gCurrLineIdx === gMeme.lines.length) gCurrLineIdx = 0
    const currLine = getLine()
    elTxtInput.value = currLine.txt
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

// function setTextDrag(isDrag) {
//     gMeme.lines[gCurrLineIdx] = isDrag
// }

function addLine() {
    const lines = getLines()
    const newLineNum = lines.length + 1
    const newLine = _createLine(newLineNum)
    gMeme.lines.push(newLine)
    gCurrLineIdx = (gMeme.lines.length - 1)
    const elTxtInput = document.querySelector('.canvas-txt')
    elTxtInput.value = ''
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
        size: 28,
        align: 'center',
        fontColor: 'white',
        strokeColor: 'black',
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

function drawBorder() {
    if (gIsDownloading) return
    const line = getLine()
    if (!line) return
    gCtx.beginPath()
    gCtx.rect(
        line.pos.x - (gCtx.measureText(line.txt).width) / 2 - 10,
        line.pos.y - 25,
        gCtx.measureText(line.txt).width + 20,
        line.size + 20
    )
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.stroke()
    gCtx.closePath()
}

function updateDownload() {
    gIsDownloading = true
}

function openGallery() {
    document.querySelector('.control-box').classList.add('hidden')
    document.querySelector('.canvas-container').classList.add('hidden')
    // document.querySelector('.editor-container').classList.add('none')
    document.querySelector('.gallery-container').classList.remove('hidden')
    document.querySelector('.gallery').classList.add('active')
}

// function openMemes() {
//     document.querySelector('.gallery-container').classList.add('hidden')
//     document.querySelector('.control-box').classList.add('hidden')
//     document.querySelector('.canvas-container').classList.add('hidden')
// }

// function openAbout() {
//
// }

