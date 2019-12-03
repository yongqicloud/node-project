const store = require('store')
export default {
    get ({ url, type='get', data={} }) {
        let token = store.get('token')
        return $.ajax({
            url,
            type,
            data ,
            dataType : 'json',
            headers:{
                'x-access-token' : token
            },
            error : (error)=>{
                console.log(error)
            },
            success:(result,textStatus,jqXHR) => {
                let token = jqXHR.getResponseHeader('x-access-token')
                if(token){
                    store.set('token',token)
                }
                return result
            }
        })
    },
    post({ url, type='post', data={} }){
        return $.ajax({
            url,
            type,
            data,
            success:(result)=>{
                return result
            }
        })
    },
    update ({url,type='post',data={} }){
        return $.ajax({
            url,
            type,
            data,
            success:(result)=>{
                return result
            }
        })
    },
    file ({url,type='post',data={} }){
        return $.ajax({
            url,
            type,
            data,
            cache: false,
            processData: false,
            contentType: false,
            success:(result)=>{
                return result
            }
        })
    },
    
    delete({url,type='delete',data={}}){
        return $.ajax({
            url,
            type,
            data,
            success:(result)=>{
                return result
            }
        })
    }
}