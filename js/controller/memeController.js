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
    renderMeme()
}

function renderMeme() {
    const currMeme = getMeme()
    const elImg = new Image()
    // const currLineIdx = getCurrLineIdx()
    elImg.src = `img/${currMeme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        currMeme.lines.forEach((line, index) => {
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = line.stroke
            gCtx.textAlign = line.align
            const txt = line.txt
            gCtx.fillText(txt, line.pos.x, line.pos.y)
        })
    }
}

function resizeCanvas(width, height) {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = width;
    newCanvas.height = height;
    const newCtx = newCanvas.getContext('2d');
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

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onSwitchLines() {
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
    // Listen for resize ev
    // window.addEventListener('resize', () => {
    //     onInit()
    // })
}

function onDown(ev) {
    const { offsetX, offsetY } = ev
    const isClicked = isLineClicked(offsetX, offsetY)
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

