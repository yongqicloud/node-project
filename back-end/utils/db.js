const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/maoer-admin',{ useUnifiedTopology: true, useNewUrlParser: true })
const Users = mongoose.model('users',{
    username : String,
    email : String,
    password   : String,
    cover_image:String,
    nickname:String
})
const Catalogroot = mongoose.model('catalogroot',{
    id : Number,
    CatalogName : String,
    Description : String,
    Pic_src: String,
    Status : String
})
const Sound = mongoose.model('sounds',{
    id : Number,
    soundstr : String,
    view_count : Number,
    comments_count : Number,
    cover_image : String,
    username : String,
    user_id : Number
})
module.exports = {
    Users,
    Catalogroot,
    Sound
}