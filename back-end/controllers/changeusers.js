const usersModel = require('../models/usersModel') 
const Tools = require('../utils/tools')
const findUser = async (req, res,next)=>{
    // console.log(req.body)
    let {username} = req.body
    let result = await usersModel.findOne({username})
    // console.log(username)
    console.log(result)
    if(result){
      res.render('success',{
          data : JSON.stringify({
              info : result
          })
      }) 
    }
}
const update = async (req,res,next)=>{
  let data = req.body
  if(req.filename !== ""){
    data.cover_image = req.filename
  }
  let result = await usersModel.update(data.username,data)
  console.log(result)
  if(result){
    res.render('success',{
        data : JSON.stringify({
            info : result
        })
    }) 
  }
}

module.exports = {
  findUser,
  update
}