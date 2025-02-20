import { Request, Response } from "express"
import { TableSchema } from "../schemas/schemas"
import Table from "../models/Table"

export class TableController {

    static create = async (req: Request, res: Response) => {

        const result = TableSchema.safeParse(req.body)
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues.map(err => err.message)
            })
            return
        }

        try {

            let table = await Table.findOne({number:req.body.number})
            if(table){
                res.status(400).json({
                    msj:"Ya existe una mesa con ese identificador"
                })
                return
            }

            table=await Table.create(req.body)
            table.salonId=req.salon.id
            await table.save()

            res.status(201).json({
                msg: "Mesa creada",
                table
            })
        } catch (error) {
            res.status(404).json({
                msg: "Hubo un error"
            })
        }

    }
}