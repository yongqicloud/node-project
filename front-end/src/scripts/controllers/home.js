import httpModel from '../models/httpModel'
import homeView from '../views/home.art'
import soundView from '../views/sound.art'
export const home = (req,res,next)=>{
   let homeHTML =  homeView()
   res.render(homeHTML)
   $('input#SearchAll').on('change',function(evt){
      _search(evt,res)
   })
}
async function _search(evt,res){ 
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
      let info = result.data.info
      res.go('/sound',{info})
      // res.render(soundView({
      //    list : result.data.info
      // }))

   }
}