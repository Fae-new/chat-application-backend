import { Request,Response } from "express"


export  const notFound = (req:Request, res:Response) => res.status(404).send(`<h1 style="text-align:'center'">Route does not exist</h1>`)


