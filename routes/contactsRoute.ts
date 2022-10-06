import express from 'express'
import { startChat } from '../controllers/chatController'


const router=express.Router()


router.route('/').post(startChat)







export default router