'use strict'

function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // window.addEventListener('resize', resizeCanvas)
    renderMeme()
}

