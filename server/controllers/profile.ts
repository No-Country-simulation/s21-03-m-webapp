import { Request, Response } from "express";
import Profile from "../models/Profile";
import { ProfileSchema } from "../schemas/schemas";


export const edit = async (req: Request, res: Response) => {
    const { name, address, phone, email } = req.body;

    if (req.type !== "owner") {
        res.status(401).json({
            msg: "No tienes permisos para realizar esta acción."
        })
        return
    }

    const result=ProfileSchema.safeParse(req.body)
    if(!result.success){
        res.status(400).json({
            msg:result.error.issues.map(err=>err.message)
        })
        return
    }

    const ownerId = req.ownerId;
    const profile = await Profile.findOne({ ownerId })

    if (!profile) {
        return res.status(404).send({ msg: 'No existe el perfil.' });
    }

    try {
        profile.name = name
        profile.address = address
        profile.phone = phone
        profile.email = email

        await profile.save()

        return res.status(200).json({
            msg: 'Perfil Editado Correctamente.',
            profile
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}