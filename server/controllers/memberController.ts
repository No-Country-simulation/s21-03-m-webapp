import { Request, Response } from "express";
import Member from "../models/Member";
import { hashPassword } from "../utils/hashedPassword";


export class MemberController {

    static deleteById = async (req: Request, res: Response) => {

        const { id } = req.params
        try {

            const member = await Member.findOne({ id })
            if (!member) {
                res.status(400).json({
                    msg: 'No existe ningún miembro con ese id.'
                });
                return
            }
            await member.deleteOne()

            res.status(200).json({
                msg: "Miembro Eliminado"
            });

        } catch (error) {
            res.status(404).json({
                msg: 'Hubo un error'
            });
        }
    }
    static updateById = async (req: Request, res: Response) => {

        const { id } = req.params
        try {

            const member = await Member.findOneAndUpdate({ id }, req.body, { new: true, runValidators: true })
            if (!member) {
                res.status(400).json({
                    msg: 'No existe ningún miembro con ese id.'
                });
                return
            }

            res.status(200).json({
                msg: "Miembro Actualizado",
                member
            });

        } catch (error) {
            res.status(404).json({
                msg: 'Hubo un error'
            });
        }
    }
    static getById = async (req: Request, res: Response) => {

        const { id } = req.params
        try {

            const member = await Member.findOne({ id })
            if (!member) {
                res.status(400).json({
                    msg: 'No existe ningún miembro con ese id.'
                });
                return
            }

            res.status(200).json(member);

        } catch (error) {
            res.status(404).json({
                msg: 'Hubo un error'
            });
        }
    }
    static getAll = async (req: Request, res: Response) => {

        const ownerId = req.ownerId
        try {

            const members = await Member.find({ ownerId })
            if (!members) {
                res.status(400).json({
                    msg: 'No se encontraron miembros en el staff.'
                });
                return
            }

            res.status(200).json(members);

        } catch (error) {
            res.status(404).json({
                msg: 'Hubo un error'
            });
        }
    }

    static create = async (req: Request, res: Response) => {

        const ownerId = req.ownerId
        const { name, email, password, rol } = req.body
        try {

            if (!name || !email || !password || !rol || !ownerId) {
                res.status(400).json({
                    msg: 'Todos los campos son requeridos.'
                });
                return
            }

            const member = await Member.findOne({ email })
            if (member) {
                res.status(400).json({
                    msg: 'Ya existe un miembro con ese email.'
                });
                return
            }

            const newMember = new Member()
            newMember.password = await hashPassword(password)
            newMember.name = name
            newMember.rol = rol
            newMember.email = email
            newMember.ownerId = ownerId

            await newMember.save()
            res.status(201).json({
                msg: 'Miembro agregado al staff'
            });

        } catch (error) {
            res.status(404).json({
                msg: 'Hubo un error'
            });
        }
    }
}