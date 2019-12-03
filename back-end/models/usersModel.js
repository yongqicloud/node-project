const {Users} = require('../utils/db')



const save = (data) => {
    const users = new Users(data)
    return users.save()
}
const findOne = (conditions) => {
    return Users.findOne(conditions)
}
const update = async (username,options)=>{
    return await Users.findOneAndUpdate({username},options) 
}
module.exports = {
    save,
    findOne,
    update,
}