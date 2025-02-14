import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');

interface AuthRequest extends Request {
    userId?: string;
}

export const authCheck = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token as string;

        if (!token) {
            return res.status(401).send("Not Authorized");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).send("Not Authorized");
    }
};