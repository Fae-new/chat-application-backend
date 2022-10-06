import express from 'express'
import { register,login } from '../controllers/authController'

const router=express.Router()


router.route('/').post(register).get(login)




export default router