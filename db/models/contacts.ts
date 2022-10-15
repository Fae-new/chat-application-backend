import mongoose from 'mongoose'


const messageSchema=new mongoose.Schema({
    text:{type:String,required:[true,'text is required']},
    senderId:{type:String,required:[true,'senderuid is required']},
    chatId:{type:String,required:[true,'chatuid required']},
    date:{type:String,required:[true,'date is required']}
})


const chatSchema=new mongoose.Schema({
chatId:{type:String,required:[true,'chat id required']},
friendId:{type:String,required:[true,'friend id required']},
friendName:{type:String,required:[true,'friend name required']},
})

const contactSchema=new mongoose.Schema({
uid:{type:String,required:[true,'uid missing']},
chats:{type:[chatSchema],required:[true,'no chats']},
messages:{type:[messageSchema],required:[true,'no messages']}
})

export default mongoose.model('contact',contactSchema)









