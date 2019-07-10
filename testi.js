let Jimp = require('jimp')

let image = new Jimp(300, 530, 'green', (err, image) => {
  if (err) throw err
})

let file = `new_name.${image.getExtension()}`
image.write(file) // save
