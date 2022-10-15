import express from 'express'
import { startChat,search, sendMessage } from '../controllers/chatController'


const router=express.Router()


router.route('/').post(startChat)
router.route('/finduser').post(search)
router.route('/sendmessage').post(sendMessage)








export default router