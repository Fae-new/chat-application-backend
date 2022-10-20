import { NextFunction, Request, Response } from "express"
import { Types } from "mongoose"
import { createError } from "../Error-handling/errors"
import contactsData from "../db/models/contacts"
import users from "../db/models/users"
import { isDate } from "util"


export const startChat = async (req: Request, res: Response, next: NextFunction) => {
    const { senderid, recieverid } = req.body
    if (!senderid || !recieverid) {
        return next(createError('no friend info', 400))
    }
    const checkIfFriend = await contactsData.find({ chats: { chatId: senderid + recieverid } })
    if (checkIfFriend.length !== 0) {
        return res.status(200).json({ msg: 'You are already friends with this person' })
    }

    const sender = await users.find({ _id: senderid })
    const reciever = await users.find({ _id: recieverid })

    await contactsData.findOneAndUpdate({ uid: senderid }, { $push: { chats: { chatId: senderid + recieverid, friendId: recieverid, friendName: reciever[0].userName } } })
    await contactsData.findOneAndUpdate({ uid: recieverid }, { $push: { chats: { chatId: senderid + recieverid, friendId: senderid, friendName: sender[0].userName } } })

    res.status(201).json({
        msg: 'Added as friend', chat: {
            friendInfo: { friendName: reciever[0].userName, chatId: senderid + recieverid, friendId: recieverid },
            userInfo: { friendName: sender[0].userName, chatId: senderid + recieverid, friendId: senderid }
        }
    })

}

export const search = async (req: Request, res: Response, next: NextFunction) => {

    const { username } = req.body
    if (!username) { return next(createError('No search value', 400)) }
    const Users = await users.find({ userNameLowercase: username })

    let usersFound: {
        userName: string;
        uid: Types.ObjectId;
    }[] = []

    Users.forEach(element => {
        usersFound.push({ userName: element.userName, uid: element._id })
    })

    res.status(202).json(usersFound)
}

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    const { senderid, chatid, text, date, recieverid } = req.body
    if (!senderid || !chatid || !text || !date || !recieverid) {
        return next(createError('incomplete data', 400))
    }

    await contactsData.findOneAndUpdate({ uid: senderid }, { $push: { messages: { chatId: chatid, senderId: senderid, date: date, text: text } } })
    await contactsData.findOneAndUpdate({ uid: recieverid }, { $push: { messages: { chatId: chatid, senderId: senderid, date: date, text: text } } })
    res.status(200).json({ msg: 'message sent' })
}






