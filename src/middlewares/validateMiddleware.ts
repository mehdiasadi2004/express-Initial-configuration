import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import ClientError from "../errors/ClientError";

const validationMiddleware = (validationSchema:any)=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        const body = req.body;
        const error = {};
        const ClientErrorInstance = new ClientError();
        const validationClass =plainToInstance(validationSchema,body);
        validate(validationClass).then((errors)=>{
            if(errors.length>0){
                ClientErrorInstance.data=[];
                ClientErrorInstance.message = errors.map((error:any)=>{
                    return {[error.property]:Object.values(error.constraints)};})
                return res.status(400).send(ClientErrorInstance);
            }
            next();
        })  
    }
}
export default validationMiddleware;