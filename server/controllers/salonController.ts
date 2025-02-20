import { Request, Response } from "express"
import Salon from "../models/Salon"
import { SalonSchema } from "../schemas/schemas"



export class SalonController {

    static create = async (req: Request, res: Response) => {

        const ownerId = req.ownerId
        const { name } = req.body

        const result = SalonSchema.safeParse(name)

        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues.map(err => err.message)
            })
            return
        }
        try {
            const salon = new Salon()
            salon.name = name
            salon.ownerId = ownerId
            await salon.save()
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

    static getAll = async (req: Request, res: Response) => {


        try {
            const salones = await Salon.find({ ownerId: req.ownerId }).select("_id name")
            if (salones.length === 0) {
                res.status(400).json({
                    msg: "No hay salones creados"
                })
                return
            }

            res.status(200).json(salones)
        } catch (error) {
            res.status(404).json({
                msg: "Hubo un error"
            })
        }

    }

    static getOne = async (req: Request, res: Response) => {
    
        try {      
            res.status(200).json(req.salon)

        } catch (error) {
            res.status(404).json({
                msg: "Hubo un error"
            })
        }

    }
    static delete = async (req: Request, res: Response) => {
     
        try {
            
            await req.salon.deleteOne()
            res.status(200).json({
                msg: "Salón eliminado"
            })


        } catch (error) {
            res.status(404).json({
                msg: "Hubo un error"
            })
        }
    }

    static update = async (req: Request, res: Response) => {

        const { name } = req.body
        const result = SalonSchema.safeParse(name)
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues.map(err => err.message)
            })
            return
        }

        try {
           
            await req.salon.updateOne({name})
            await req.salon.save()
            res.status(200).json({
                msg: "Salón Actualizado"
            })


        } catch (error) {
            res.status(404).json({
                msg: "Hubo un error"
            })
        }
    }
}