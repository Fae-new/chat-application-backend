import mongoose from 'mongoose'


const messageSchema=new mongoose.Schema({
    text:{type:String},

    time:{type:String}
})

//sentUid:{type:String},
const chatSchema=new mongoose.Schema({
friend_uid:{type:String},
messages:{type:[messageSchema]}

})

const contactSchema=new mongoose.Schema({
uid:{
    type:String,
    required:[true,'uid missing']

},
chats:{type:[chatSchema],required:[true,'no chats']}
})

export default mongoose.model('contact',contactSchema)









