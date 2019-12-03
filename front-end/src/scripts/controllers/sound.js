import httpModel from '../models/httpModel'
import soundView from '../views/sound.art'
import soundAddView from '../views/sound_add.art'
import soundUpdateView from '../views/sound_update.art'
export const info = async (req,res,next)=>{
  let result = await httpModel.get({
      url : '/api/sound',
      data:{
        start : 0,
        count : 5
      }
  })
  console.log('--------')
  console.log(result)
  if(result.ret){
      res.render(soundView({
          list : result.data.info.list,
          
      }))
      _handelAdd(res)
      _handelUpdateClick(res)
      _handelDeleteClick(res)
      _search(res)
  }else{
      res.go('/home')
  }
  
}
export const add = (req,res,next)=>{
  res.render(soundAddView({}))
  // _handelSubmmit()
} 
export const update = async (req,res,next)=>{
  let id = req.body.id
  let result = await httpModel.get({
      url : '/api/sound/findOne',
      data:{ 
          id
      }
  })
  console.log(result)
  res.render(soundUpdateView({
      id,
      info : result.data.info
  }))
  _handelUpdate(id)
  
}
function _handelAdd(res){
  $('body').on('click','#btn-add-sound',function(){
      res.go('/sound_add')
  })
}
function _handelUpdateClick(res){
  // 修改数据
  $('body').on('click','.btn-update',function(){
      let id = $(this).attr('data-id')
      res.go('/sound_update',{id})
  })
}
function _handelUpdate(id){
  $('body').on('click','#submitUpdateSound',async function(){
    let data = $('#submitSoundUpdate').serialize()
    let result = await httpModel.update({
      url : '/api/sound',
      type : 'patch',
      data : data + '&_id=' + id
    }) 
    console.log(result)
    if(result.ret){
        $('#submitSoundUpdate')[0].reset()
        console.log('重置成功')  
    }else{
        alert('失败')
    }
  })
}
function _handelDeleteClick(res){
  $('body').on('click','.btn-remove-sound',async function(){
      let id = $(this).attr('data-id')
      let result = await httpModel.delete({
        url : '/api/sound',
        data :{
          _id : id
        }
      })
      if(result.ret){
        res.go('/sound?'+ new Date().getTime())
      }
      console.log(result)
  })
}
function _search(res){ 
  $('body').on('change','input#SearchAll', async function(evt){
 
    let {target} = evt
    let keyWords = $(target).val()
    console.log(keyWords)
    let result = await httpModel.update({
        url : '/api/sound/search',
        data:{
          keyWords,
        }
    })
    console.log(result)
    if(result.ret){
      // let info = result.data.info
      res.render(soundView({
         list : result.data.info
      }))

    }
  })
}