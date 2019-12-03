import positionView from '../views/position.art'
import positionAddView from '../views/position_add.art'
import positionUpdateView from '../views/position_update.art'
import httpModel from '../models/httpModel'
export const info = async (req,res,next)=>{
    let result = await httpModel.get({
        url : '/api/position'
    })
    console.log(result)
    if(result.ret){
        res.render(positionView({
            list : result.data.info
        }))
        _handelAdd(res)
        _handelUpdateClick(res)
    }else{
        res.go('/home')
    }
    
}
export const add = (req,res,next)=>{
    res.render(positionAddView({}))
    _handelSubmmit()
}
export const update = async (req,res,next)=>{
    let id = req.body.id
    let result = await httpModel.get({
        url : '/api/position/findOne',
        data:{ 
            id
        }
    })
    res.render(positionUpdateView({
        id,
        info : result.data.info
    }))
    _handelUpdate(id)
    console.log(result)
}
function _handelSubmmit(){
    $('#submitCatalog').on('click',async function(){
        let data = {
            CatalogName : $('#CatalogName').val(),
            id : $('#Id').val(),
            Description : $('#Description').val(),
            Pic_src : $('#Pic_src').val(),
            Status : $('#Status').val()
            
        }
        console.log(data)
        let submitRes = await httpModel.update({
            url : 'api/position',
            data
        })
        console.log(submitRes)
    })
}
function _handelAdd(res){
    $('#btn-add').on('click',function(){
        res.go('/position_add')
    })
}
function _handelUpdateClick(res){
    // 修改数据
    $('.btn-update').on('click',function(){
        let id = $(this).attr('data-id')
        res.go('/position_update',{id})
    })
}
function _handelUpdate(id){
    $('#submitUpdateCatalog').on('click',async function(){
        let data = {
            _id: id,
            CatalogName : $('#CatalogName').val(),
            id : $('#Id').val(),
            Description : $('#Description').val(),
            Pic_src : $('#Pic_src').val(),
            Status : $('#Status').val()
        }
        console.log(data)
        let result = await httpModel.update({
            url : '/api/position',
            type : 'patch',
            data
        })
        if(result.ret){
            $('#updateCatalog')[0].reset()  
        }else{
            alert('失败')
        }
    })
}