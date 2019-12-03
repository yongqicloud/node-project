const {Sound} = require('../utils/db')
const save = (data)=>{
    const sound = new Sound(data)
    return sound.save()
}
const find = async ({start,count})=>{
    let list = await Sound.find({}).limit(~~count).skip(~~start)
    console.log(list)
    return  {list}
}
const update = async (_id,options)=>{
    return await Sound.findByIdAndUpdate({_id},options)
}
const findOne = async (_id)=>{
    return await Sound.findById(_id)
}
const removeOne = async(_id)=>{
    return  await Sound.findByIdAndRemove({_id})
}
const search = async (keyWords)=>{
    let reg = new RegExp(keyWords,'gi')
    return await Sound.find({}).or([{soundstr:reg},{username:reg}])
}
module.exports = {
    save,
    find,
    update,
    findOne,
    removeOne,
    search
}