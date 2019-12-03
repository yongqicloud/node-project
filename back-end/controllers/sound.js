const soundModel = require('../models/soundModel')

const findAll =  async (req,res,next)=>{
  res.set('Content-Type', 'application/json; charset=utf-8')
  console.log(req.query)
  let info = await soundModel.find(req.query)
  console.log(info)
  res.render('success',{
      data : JSON.stringify({
          info 
      })
  })
}
const save = async (req,res,next)=>{
  res.set('Content-type','application/json; charset=utf-8')
  let data = req.body
  data.cover_image = req.filename

  let result = await soundModel.save(data)
  if(result){
      res.render('success',{
          data : JSON.stringify({
              message : '插入成功'
          })
      })
  }
}
const findOne = async (req,res,next)=>{
  res.set('Content-type','application/json; charset=utf-8')
  let id = req.query.id
  let result = await soundModel.findOne(id)
  console.log(result)
  if(result){
      res.render('success',{
          data : JSON.stringify({
              info : result
          })
      })
  }else{
      res.render('fail',{
          data : JSON.stringify({
              message : '没有该数据'
          })
      }) 
  }
}
const update = async (req,res,next)=>{
    res.set('Content-type','application/json; charset=utf-8')
    let result = await soundModel.update(req.body._id,req.body)
    console.log(result)
    if(result){
        res.render('success',{
            data : JSON.stringify({
                message : '数据修改成功'
            })
        })
    }else{
        res.render('fail',{
            data : JSON.stringify({
                message : '操作失败'
            })
        })
    }
    
}
const remove = async (req,res,next)=>{
    res.set('Content-Type','application/json; charset=utf-8')
    console.log(req.body)
    let result = await soundModel.removeOne(req.body._id)
    console.log(result)
    if(result){
        res.render('success',{
            data : JSON.stringify({
                message : '数据删除成功'
            })
        }) 
    }else{
        res.render('fail',{
            data : JSON.stringify({
                message : '操作失败'
            })
        })
    }
}
const search = async (req,res,next)=>{
    res.set('Content-Type','application/json; charset=utf-8')
    let result = await soundModel.search(req.body.keyWords)
    console.log(result)
    if(result.length){
        res.render('success',{
            data : JSON.stringify({
                info : result
            })
        }) 
    }else{
        res.render('fail',{
            data : JSON.stringify({
                message : '没有该数据'
            })
        })
    }
}
module.exports = {
  findAll,
  save,
  findOne,
  update,
  remove,
  search
}

