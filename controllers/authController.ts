import { Request, Response, NextFunction } from "express"
import { createError } from "../Error-handling/errors"
import users from "../db/models/users"
import { uid } from 'uid'
import chats from "../db/models/contacts"


const register = async (req: Request, res: Response, next: NextFunction) => {

   const { username, password, email } = req.body
   if (!username || !password || !email) {
      return next(createError('username,password or email is missing', 400))
   }

   const checkEmail = await users.find({ email: req.body.email })

   if (checkEmail.length !== 0) {
      return next(createError('email/user already exists', 400))
   }
 
   const user=await users.create({
      userName: username,
      email: email,
      password: password
   })

   const chat=await chats.create({
uid:user._id,
chats:[],
messages:[]
   })
  
   res.status(201).json({ msg: 'user created', userInfo: { uid: user._id, userName: user.userName, email: user.email,contacts:chat.chats,messages:chat.messages } })
}



const login = async (req: Request, res: Response, next: NextFunction) => {
   const { email, password } = req.body
   if (!email || !password) {
      return next(createError('email or password is missing', 400))
   }

   let checkUser = await users.find({ email: email })
   if (checkUser.length === 0) {
      return next(createError(`Email doesn't exist: incorrect email or account not registered`, 401))
   }
   else {
      checkUser = await users.find({ email: email, password: password })
      if (checkUser.length === 0) {
         return next(createError('incorrect password', 401))
      }

   }

   const findChats=await chats.find({
      uid:checkUser[0]._id
})

   res.status(200).json({ msg: 'Authenticated', userInfo: { uid: checkUser[0]._id, username: checkUser[0].userName, email: checkUser[0].email,chats:findChats[0].chats,messages:findChats[0].messages } })
}



export { register, login }