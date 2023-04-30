'use strict'
const STORAGE_KEY = 'MemesDB'
let gSavedMemes = []

function renderSavedMemes() {
    const savedMemes = loadFromStorage(STORAGE_KEY)
    let strHtmls
    if (savedMemes.length) {
        strHtmls = savedMemes
            .map((meme) => {
                console.log(meme)
                return `<div class="img-gallery flex" data-id="${meme.id}">
                    <img src="${meme.url}" ('${meme.id}')" />
                </div>`
            })
            .join('')
    } else {
        strHtmls = `No memes available`
    }
    document.querySelector('.saved-meme-container').innerHTML = strHtmls
}

function saveMeme(url) {
    const id = _makeId()
    gSavedMemes.push({ id, url })
    saveMemesToStorage()
}

function openSavedMemes() {
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.classList.add('hidden')

    const elContact = document.querySelector('.main-contact')
    elContact.classList.add('hidden')

    const elToolBar = document.querySelector('.editor-container')
    elToolBar.classList.add('hidden')

    document.querySelector('.gallery').classList.remove('active')
    document.querySelector('.main-nav .meme').classList.add('active')


    document.querySelector('.search-filter').classList.add('hidden')


    document.querySelector('.saved-memes').classList.remove('hidden')
    renderSavedMemes()
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

function saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    return JSON.parse(str)
}

function clearStorage() {
    localStorage.clear()
    console.log('cleared')
}

