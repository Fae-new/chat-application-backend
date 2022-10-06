require('express-async-errors')
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/mongoose'
import userRouter from './routes/usersRoute'
import contactsRouter from './routes/contactsRoute'
import { notFound } from './middlewares/notFound'
import {errorHandlerMiddleware} from './Error-handling/errorHandler'


dotenv.config()
const app = express()
app.use(express.json())




app.use('/users',userRouter)
app.use('/contacts',contactsRouter)
app.use(notFound)
app.use(errorHandlerMiddleware);




const start = async () => {
    if (process.env.MONGO_URI) {
        try {
            await connectDB(process.env.MONGO_URI)
            app.listen(3000, () => {
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

start()

