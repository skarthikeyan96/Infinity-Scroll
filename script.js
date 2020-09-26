import key from './config.js'

const imageContainer = document.getElementsByClassName('image-container')[0]
const count = 4
let total = 0
let load = false

const url = `https://api.pexels.com/v1/curated?page=3&per_page=${count}`
const meta = {
  headers: {
    Authorization: key
  },
  request: 'GET'
}
async function loadPhotos () {
  try {
    const res = await window.fetch(url, meta)
    const json = await res.json()
    renderImages(json.photos)
  } catch (err) {
    window.alert(err)
  }
}

function renderImages (images) {
  images.forEach(image => {
    const anchor = document.createElement('a')
    anchor.href = image.url
    anchor.target = '_blank'
    anchor.rel = 'noopener noreferrer'
    const img = document.createElement('img')
    img.src = image.src.original
    img.alt = image.photographer
    img.loading = 'lazy'

    img.addEventListener('load', function () {
      console.log('image loaded ')
      total++
      console.log(total)
      if (count === total) {
        load = true
        // resetting the total back to 0
        total = 0
      }
    })
    anchor.appendChild(img)
    imageContainer.appendChild(anchor)
  })
}

window.addEventListener('scroll', function (e) {
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 1000 && load) {
    // you're at the bottom of the page
    load = false
    loadPhotos()
  }
})

loadPhotos()
