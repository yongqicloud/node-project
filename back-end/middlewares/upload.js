const multer = require('multer')
const path = require('path')
const randomstring = require('randomstring')

var filename = ''
const mimetypeMap = {
  'image/png': '.png',
  'image/jpg': '.jpg',
  'image/jpeg': '.jpeg',
  'image/gif': '.gif'
}

const storage = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null,path.resolve(__dirname,'../public/uploads'))
  },
  filename : (req,file,cb)=>{
    let {fieldname,mimetype} = file
    filename = fieldname + '-' + randomstring.generate() +mimetypeMap[mimetype]
    cb(null,filename)
  }
})
const upload = multer({
  storage
}).single('cover_image')

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    req.filename = filename
    filename = ""
    next()
  })
}