'use strict'
const gSavedMemes = []

function renderSavedMemes() {
    const savedMemes = loadFromStorage(STORAGE_KEY)
    let strHtmls
    if (savedMemes.length) {
        strHtmls = savedMemes
            .map((meme) => {
                console.log(meme)
                return `<div class="img-gallery" data-id="${meme.id}">
                    <img src="${meme.url}" onclick="onOpenImgModal('${meme.url}', '${meme.id}')" />
                </div>`
            })
            .join('')
    } else {
        strHtmls = `No Memes to show:( `
    }
    document.querySelector('.savedMemes-container').innerHTML = strHtmls
}

function onSaveModal() {
    const savedMemeURL = gElCanvas.toDataURL()
    saveMeme(savedMemeURL)

}

function saveMeme(src) {
    const id = _makeId()
    gSavedMemes.push({ id, src })
    saveMemesToStorage
}

function _makeId(length = 6) {
    var txt = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}