import { Request, Response, NextFunction } from 'express';
import Salon, { ISalon } from '../models/Salon';


declare global {
    namespace Express {
        interface Request {
            salon: ISalon
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