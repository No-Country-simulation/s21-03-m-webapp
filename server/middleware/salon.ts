import { Request, Response, NextFunction } from 'express';
import Salon, { ISalon } from '../models/Salon';
import Table, { ITable } from '../models/Table';


declare global {
    namespace Express {
        interface Request {
            salon: ISalon
            table: ITable
        }
    }
}

export const salonExists = async (req: Request, res: Response, next: NextFunction) => {

    const { salonId } = req.params

    try {
        const salon = await Salon.findOne({ _id: salonId, ownerId: req.ownerId })

        if (!salon) {
            res.status(400).json({
                msg: "No existe el salón"
            })
            return
        }
        req.salon = salon

        next()
    } catch (error) {
        res.status(404).json({
            msg: "Hubo un error"
        })
    }

}

export const tableExists = async (req: Request, res: Response, next: NextFunction) => {

    const { tableId } = req.params

    try {
        const table = await Table.findOne({ _id: tableId })

        if (!table) {
            res.status(400).json({
                msg: "No existe esa mesa"
            })
            return
        }
        req.table= table

        next()
    } catch (error) {
        res.status(404).json({
            msg: "Hubo un error"
        })
    }

}