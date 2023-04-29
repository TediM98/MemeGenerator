'use strict'
let gElCanvas
let gCtx
let gStartPos


const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    window.addEventListener('resize', resizeCanvas)
    addListeners()
    renderKeyWords()
    renderGallery()
    renderMeme()
}

function renderMeme() {
    const currMeme = getMeme()
    const elImg = new Image()
    elImg.src = `img/${currMeme.selectedImgId}.jpg`
    elImg.onload = () => {
        if (window.innerWidth < 400) {
            gElCanvas.width = 390
            gElCanvas.height = 390
        }
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        currMeme.lines.forEach(line => {
            gCtx.lineWidth = 1
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.fontColor
            gCtx.strokeStyle = line.strokeColor
            gCtx.textAlign = line.align
            const txt = line.txt
            gCtx.fillText(txt, line.pos.x, line.pos.y)
            gCtx.strokeText(txt, line.pos.x, line.pos.y)
            drawBorder()
        })
    }
}

function resizeCanvas(width, height) {
    const newCanvas = document.createElement('canvas')
    newCanvas.width = width
    newCanvas.height = height
    const newCtx = newCanvas.getContext('2d')
    newCtx.drawImage(
        gElCanvas,
        0,
        0,
        gElCanvas.width,
        gElCanvas.height,
        0,
        0,
        newCanvas.width,
        newCanvas.height
    )
}
function onClickImg(imgId) {
    setImg(imgId)
    renderMeme()
}

function setFontColor(ev) {
    changeFontColor(ev.target.value)
}

function setStrokeColor(ev) {
    changeStrokeColor(ev.target.value)
}


function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onSwitchLines() {
    const currLine = getLine()
    if (!currLine) updateLineIdx(1)
    switchLines()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchend', onUp)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function onDown(ev) {
    const { offsetX, offsetY } = ev
    const isClicked = isLineClicked(offsetX, offsetY)
    if (!isClicked) updateLineIdx(null)
    renderMeme()
}

function onMove(ev) {
}

function onUp() {

}

function onRemoveLine() {
    if (confirm('you sure you want to delete this item?')) {
        removeLine()
        renderMeme()
    }
}

function onFontChange(font) {
    const currLine = getLine()
    currLine.font = font
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onAlignmentChange(alignment) {
    alignText(alignment)
    renderMeme()
}

function onDownloadMeme(link) {
    renderMeme()
    const memeUrl = gElCanvas.toDataURL()
    link.href = memeUrl
}

function onSelectSection(page) {
    switch (page) {
        case 'gallery':
            openGallery()
            onToggleMenu()
            break
        case 'memes':
            openSavedMemes()
            onToggleMenu()
            break
        case 'about':
            openAbout()
            onToggleMenu()
            break
    }
}

