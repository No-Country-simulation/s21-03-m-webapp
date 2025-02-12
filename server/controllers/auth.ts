import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        
        return res.status(200).json({
            msg: 'Registro'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}