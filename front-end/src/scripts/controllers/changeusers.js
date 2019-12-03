import changeusersView from '../views/changeusers.art'
import httpModel from '../models/httpModel'
export const info = async (req, res, next) => {
  let username_info = await httpModel.get({
    type:"get",
    url : '/api/users/isSignin'
  })
  let result = await httpModel.post({
    url: '/api/changeusers', 
    data : {
      username :  username_info.data.username                                                                                                                       
    }
  })
  if (result.ret) {
    res.render(changeusersView({
      info: result.data.info
    }))
    $('body').on('click', '.btn-submit-update', _update.bind(this,res))
  } else {
    res.go('/home')
  }
}
async function _update(res) {
  let data = new FormData($('#update-users-form')[0])
  let result = await httpModel.file({
    url: '/api/changeusers',
    type: "patch",
    data,
  })
  console.log(result)
  if(result.ret){
    // res.go('/changeusers?' + Date.now())
    location.reload()
  }
  console.log(result)
}