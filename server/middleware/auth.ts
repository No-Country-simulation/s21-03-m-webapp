import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
const jwt = require('jsonwebtoken');


declare global {
    namespace Express {
        interface Request {
            userId?: Types.ObjectId
        }
    }
}

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token as string;

        if (!token) {
            res.status(401).send("Not Authorized");
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send("Not Authorized");
        return
    }
};