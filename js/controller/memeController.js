'use strict'
let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    window.addEventListener('resize', resizeCanvas)
    renderMeme()
}

function renderMeme() {
    const currMeme = getMeme()
    console.log('currMeme', currMeme)
    const elImg = new Image() // Create a new html img element
    elImg.src = `img/${currMeme.selectedImgId}.jpg` // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height
        )
        gCtx.font = '30px Arial'
        gCtx.fillStyle = 'white'
        const txt = currMeme.lines[0].txt
        gCtx.fillText(txt, 120, 50)
        gCtx.fillText('So much', 120, 370)
    }
}

function resizeCanvas(width, height) {
    console.log('width,height', width, height)
    // create a new canvas element with the desired dimensions
    const newCanvas = document.createElement('canvas');
    newCanvas.width = width;
    newCanvas.height = height;

    // get the 2D context of both canvases
    const newCtx = newCanvas.getContext('2d');

    // draw the image onto the new canvas in the new position
    newCtx.drawImage(
        gElCanvas, // image object
        0, // source x
        0, // source y
        gElCanvas.width,
        gElCanvas.height,
        0, // destination x
        0, // destination y
        newCanvas.width, // destination width
        newCanvas.height // destination height
    )
    // }
}