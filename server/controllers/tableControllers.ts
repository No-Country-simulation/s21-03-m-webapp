import { Request, Response } from "express"
import { TableSchema } from "../schemas/schemas"
import Table from "../models/Table"
import Order from "../models/Order"

export class TableController {
    
    static get= async (req: Request, res: Response) => {

        try {
            res.status(200).json({
                table:req.table
            })
        } catch (error) {
            res.status(404).json({
                msg: "Hubo un error"
            })
        }
    }
    static getAll = async (req: Request, res: Response) => {

        try {
            const tables=await Table.find({salonId:req.salon.id})
            if(tables.length===0){
                res.status(200).json({
                    tables:[]
                })
                return
            }
            res.status(200).json({
                tables
            })
        } catch (error) {
            res.status(404).json({
                msg: "Hubo un error"
            })
        }
    }


    static create = async (req: Request, res: Response) => {

        const result = TableSchema.safeParse(req.body)

        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues.map(err => err.message)
            })
            return
        }

        try {

            let table = await Table.findOne({salonId:req.salon.id,number: req.body.number })

            if (table) {
                res.status(400).json({
                    msj: "Ya existe una mesa con ese identificador"
                })
                return
            }

            table = await Table.create(req.body)
            table.salonId = req.salon.id
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

    static update = async (req: Request, res: Response) => {
        try {
          

            const table = await Table.findByIdAndUpdate(req.table.id, req.body, { new: true });
    
            if (!table) {
                res.status(404).json({ msg: "Mesa no encontrada" });
                return 
            }
    
           res.status(200).json({
                msg: "Mesa actualizada",
                table,
            });
    
        } catch (error) {
            console.error("Error al actualizar la mesa:", error);
            res.status(500).json({
                msg: "Hubo un error en el servidor",       
            });
            return 
        }
    };
    

    static delete = async (req: Request, res: Response) => {

        try {
            await req.table.deleteOne()
            res.status(200).json({
                msg: "Mesa eliminada"
            })

        } catch (error) {
            res.status(404).json({
                msg: "Hubo un error"
            })
        }

    }

}