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
    const form = formidable({ multiples: false });
  
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({ msg: "Hubo un error al subir la imagen" });
      }
  
      // Convertir fields a objeto plano
      req.body = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value?.[0]]));
      
      // Si hay una imagen, guardamos la ruta del archivo
      if (files.image && Array.isArray(files.image) && files.image.length > 0) {
        req.file = files.image[0].filepath;
      }
  
      next();
    });
  };