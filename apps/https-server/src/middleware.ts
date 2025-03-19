import { NextFunction, Request, Response }  from "express";
import  Jwt, { JwtPayload }  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req:Request, res: Response, next: NextFunction ) {
    const token = req.headers["authorization"] ?? "";

    const verfiy = Jwt.verify(token, JWT_SECRET); 

    if (verfiy ) {
        req.userId = (verfiy as JwtPayload).userId ;
        next(); 
    }else{
        res.status(401).json({message:"Unauthorized"})
    }
}