'use strict'
const STORAGE_KEY = 'MemesDB'


function saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMeme)
}

function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    return JSON.parse(str)
}

function clearStorage() {
    localStorage.clear()
    console.log('cleared')
}