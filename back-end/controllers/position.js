const positionModel = require('../models/positionModel')
const findAll = async (req,res,next)=>{
    res.set('Content-Type', 'application/json; charset=utf-8')
    let info = await positionModel.find()
    res.render('success',{
        data : JSON.stringify({
            info 
        })
    })
}
const save = async (req,res,next)=>{
    res.set('Content-type','application/json; charset=utf-8')
    
    let result = await positionModel.save(req.body)
    if(result){
        res.render('success',{
            data : JSON.stringify({
                message : '插入成功'
            })
        })
    }
}
const update = async (req,res,next)=>{
    res.set('Content-type','application/json; charset=utf-8')
    let result = await positionModel.update(req.body._id,req.body)
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
const findOne = async (req,res,next)=>{
    res.set('Content-type','application/json; charset=utf-8')
    let id = req.query.id
    let result = await positionModel.findOne(id)
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

module.exports = {
    findAll,
    save,
    update,
    findOne
}