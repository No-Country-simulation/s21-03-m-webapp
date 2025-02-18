import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken"


declare global {
    namespace Express {
        interface Request {
            userId?: Types.ObjectId
            memberId?: Types.ObjectId
            type?:string

        }
    }
}

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token as string;

        if (!token) {
            res.status(401).send("No Autorizado");
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) {
            res.status(401).send("No Autorizado");
            return
        }
        if (typeof decoded === "object" && decoded.type) {

            if (decoded.type === "owner") {
                req.userId = decoded.id
                req.type=decoded.type
            }
            if (decoded.type === "member") {
                req.memberId = decoded.memberId
                req.userId=decoded.ownerId
                req.type=decoded.type
            }   
        }
        next();
    } catch (error) {
        res.status(401).send("No Autorizado");
        return
    }
};