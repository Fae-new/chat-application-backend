import mongoose from "mongoose";


const userSchema=new mongoose.Schema({

userName:{
    type:String,
    required:[true,'username is required'],
    maxlength:[8,'usename is too long'],
    minlength:[4,'username is too short']
},
email:{
    type:String,
    required:[true,'email is required'],
},
password:{
    type:String,
    required:[true,'password is required'],
    minlength:[6,'password is too short']
}
})

export default mongoose.model('User',userSchema)