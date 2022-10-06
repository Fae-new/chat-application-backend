
export class CustomApiError extends Error{
message: string;
statusCode:number

constructor(message:string,statusCode:number){
    super(message)
    this.message=message,
    this.statusCode=statusCode
 
}
}

export const createError=(msg:string,code:number)=>{
    return new CustomApiError(msg,code)
}

export type CustomError=typeof CustomApiError