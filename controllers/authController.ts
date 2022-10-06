import { Request, Response, NextFunction } from "express"
import { createError } from "../Error-handling/errors"
import users from "../db/models/users"
import { uid } from 'uid'
import chats from "../db/models/chats"


const register = async (req: Request, res: Response, next: NextFunction) => {

   const { username, password, email } = req.body
   if (!username || !password || !email) {
      return next(createError('username,password or email is missing', 400))
   }

   const checkUser = await users.find({ email: req.body.email })

   if (checkUser.length !== 0) {
      return next(createError('email/user already exists', 400))
   }
 
   const user=await users.create({
      userName: username,
      email: email,
      password: password
   })

   const chat=await chats.create({
uid:user._id,
chats:[]


   })
  
   res.status(201).json({ msg: 'user created', userInfo: { uid: user._id, username: user.userName, email: user.email } })
}



const login = async (req: Request, res: Response, next: NextFunction) => {
   const { username, password } = req.body
   if (!username || !password) {
      return next(createError('username or password is missing', 400))
   }

   let checkUser = await users.find({ userName: username })
   if (checkUser.length === 0) {
      return next(createError('username doesnt exist, incorrect username or account not registered', 401))
   }
   else {
      checkUser = await users.find({ userName: username, password: password })
      if (checkUser.length === 0) {
         return next(createError('incorrect password', 401))
      }

   }

   res.status(200).json({ msg: 'Authenticated', userInfo: { uid: checkUser[0]._id, username: checkUser[0].userName, email: checkUser[0].email } })
}



export { register, login }