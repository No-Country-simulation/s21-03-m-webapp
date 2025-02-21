import { NextFunction, Request, Response } from "express";
import formidable from "formidable";


declare global {
    namespace Express {
        interface Request {
            file?: string
            body?: any
        }
    }
}

export const upload = async (req: Request, res: Response, next: NextFunction) => {



    const form = formidable({ multiples: false })
 
    try {
        form.parse(req, (err, fields, files) => {
            console.log(files)
            if (err) {
                res.status(400).json({
                    msg: "Hubo un error al subir la imagen"
                })
                return
            }
            req.body = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value?.[0]]));
          

            if (files.image) {
                req.file = files.image[0].filepath
                next()
            }
            next()
        })
    } catch (error) {
        res.status(404).json({
            msg: "Hubo un error al subir la imagen"
        })
    }

}