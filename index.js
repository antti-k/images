const express = require('express')
const Jimp = require('jimp')

const app = express()


app.get('/color.png', (req, res) => {
  const [red, green, blue] = Array(3).fill().map(_ => Math.round(Math.random() * 255))
  const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
  console.log(color)

  const x = Math.round(Math.random() * 300)
  const y = Math.round(Math.random() * 300)

  let image = new Jimp(x, y, color, (err, image) => {
    if (err) throw err
  })
  image.getBuffer(Jimp.AUTO, (e, buffer) => {
    if (e) throw e
    res.send(buffer)
  })
})
  
app.get('/text-image/:text', (req, res) => {
  const [red, green, blue] = Array(3).fill().map(_ => Math.round(Math.random() * 255))
  const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
  console.log(color)

  const x = 500
  const y = 100

  let image = new Jimp(x, y, color, (err, image) => {
    if (err) throw err
  })

  const text = req.params.text

  Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
    .then(font => {
      image.print(font, 10, 10, text.slice(0, -4))
      return image
    })
    .then(img => {
      img.getBuffer(Jimp.AUTO, (e, buffer) => {
        if (e) throw e
        res.send(buffer)
      })
    })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
