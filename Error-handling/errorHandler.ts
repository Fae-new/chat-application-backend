import {ErrorRequestHandler} from 'express'
import { CustomApiError, CustomError} from './errors'
import { Error } from 'mongoose';



export const errorHandlerMiddleware:ErrorRequestHandler=(err,req,res,next)=>{

    console.log(err);
    
if( err instanceof CustomApiError){
    return res.status(err.statusCode).send(err.message)
}

else if(err instanceof Error){

   return res.status(400).send(err.message)

}

else{return res.status(500).json({msg:'An unknown error occured'})}
}