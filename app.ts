require('express-async-errors')
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/mongoose'
import userRouter from './routes/usersRoute'
import contactsRouter from './routes/contactsRoute'
import { notFound } from './middlewares/notFound'
import { errorHandlerMiddleware } from './Error-handling/errorHandler'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

dotenv.config()
const app = express()
const server = http.createServer(app)


app.use(express.json())
app.use(cors())
app.use('/users', userRouter)
app.use('/contacts', contactsRouter)
app.use(notFound)
app.use(errorHandlerMiddleware);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173/',
        methods: ['GET', 'POST']
    }
})



const start = async () => {
    if (process.env.MONGO_URI) {
        try {
            await connectDB(process.env.MONGO_URI)
            server.listen(3000, () => {
                console.log('server started');

            })

        } catch (error) {
            console.log(error);

        }
    }

    else {
        console.log('mongo url not found');

    }

}


io.on('connection', (socket) => {
    console.log('user connected' + socket.id);

    socket.emit

    socket.on('send_message', (data) => {
        socket.to(data.chatId).emit('recieve_message', data)
    })
    socket.on('join_room',(data)=>{
        socket.join(data)  
    })


socket.on('add_contact',(data)=>{
    socket.to(data.id).emit('collect_contact',data.contactInfo)
})

// socket.on('set_status',(data)=>{
// socket.emit('online',data)

// })

})



start()

