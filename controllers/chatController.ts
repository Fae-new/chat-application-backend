import { NextFunction, Request, Response } from "express"
import { nextTick } from "process"
import { createError } from "../Error-handling/errors"
import chats from "../db/models/chats"

export const startChat=async(req:Request,res:Response,next:NextFunction)=>{
    const{senduid,recuid}=req.body
if(!senduid || !recuid){
    return next(createError('no userid',400))
}
await chats.findOneAndUpdate({uid:senduid},{$push:{chats:{friend_uid:recuid,messages:[]}}})
await chats.findOneAndUpdate({uid:recuid},{$push:{chats:{friend_uid:senduid,messages:[]}}})

        res.status(201).json({msg:'chat created'})
}


// export const sendMessage=async(req:Request,res:Response,next:NextFunction)=>{

//     const{senduid,recuid}=req.body
//     chats.findOneAndUpdate({uid:senduid},{$push:{chats:{uid:recuid,messages:[]}}})


// }


