import { Request,Response } from "express"
import Salon from "../models/Salon"



export class SalonController {

    static create = async (req: Request, res: Response) => {

        const ownerId = req.ownerId
        const { name } = req.body
        try {
            const salon = new Salon()
            salon.name = name
            salon.ownerId = ownerId

            res.status(201).json({
                msg: "Salón creado",
                salon
            })
        } catch (error) {
            res.status(404).json({
                msg: "Hubo un error"
            })
        }

    }
}