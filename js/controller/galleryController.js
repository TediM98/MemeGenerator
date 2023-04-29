'use strict'
let gKeyWordMap =
{
    funny: 32,
    cat: 17,
    dog: 20,
    president: 24,
    baby: 24,
    cute: 24,
}

let gOpenedMenu = false

function renderGallery() {
    const images = getImages()
    const elImgContainer = document.querySelector('.image-container')

    const strHtml = images.map(img => {
        return `<div>
<img src="img/${img.id}.jpg" alt="" onclick="onClickImg(${img.id})"/>
    </div>`
    }).join('')
    elImgContainer.innerHTML = strHtml
}

function onSetFilterBy(keyword) {
    setFilterBy(keyword)
    onKeyWordClick(keyword)
}

function onKeyWordClick(keyword) {
    if (!gKeyWordMap[keyword]) return
    gKeyWordMap[keyword]++
    setFilterBy(keyword)
    renderKeyWords()
}

function renderKeyWords() {
    const elKeywordContainer = document.querySelector('.keywords')
    let strHtml = ''
    for (const word in gKeyWordMap) {
        strHtml +=
            `
            <li onclick="onKeyWordClick('${word}')" style="font-size:${gKeyWordMap[word]}px">
             ${word}
          </li>
          `
    }
    elKeywordContainer.innerHTML = strHtml
}

function onToggleMenu() {
    if (window.innerWidth > 900) document.body.classList.remove('menu-open')
    else document.body.classList.toggle('menu-open')
    const elMenuBg = document.querySelector('.menu-bgToggle')
    elMenuBg.classList.remove('hidden')
    if (!document.body.classList.contains('menu-open')) {
        elMenuBg.classList.add('hidden')
    }
    const elBtnMenu = document.querySelector('.btn-menu')
    elBtnMenu.innerText = document.body.classList.contains('menu-open')
        ? '✕'
        : '☰';
}

