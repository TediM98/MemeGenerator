'use strict'
renderGallery()
function renderGallery() {
    const images = getImages()
    const elImgContainer = document.querySelector('.image-container')

    const strHtml = images.map(img => {
        return `<div>
<img src="img/${img.id}.jpg" alt=""/>
    </div>`
    }).join('')
    console.log('strHtml', strHtml)
    elImgContainer.innerHTML = strHtml
}
