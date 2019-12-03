const {Catalogroot} = require('../utils/db')
const save = (data)=>{
    const catalogroot = new Catalogroot(data)
    return catalogroot.save()
}
const find = async ()=>{
    return await Catalogroot.find() 
}
const update = async (_id,options)=>{
    return await Catalogroot.findByIdAndUpdate({_id},options)
}
const findOne = async (id)=>{
    return await Catalogroot.findById(id)
}
module.exports = {
    save,
    find,
    update,
    findOne
}