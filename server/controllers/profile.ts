import { Request, Response } from "express";
import Profile from "../models/Profile";


export const edit = async (req: Request, res: Response) => {
    const { name, address, phone, email } = req.body;

    const ownerId = req.ownerId;
    const profile = await Profile.findOne({  ownerId})

    if (!profile) {
        return res.status(404).send({ msg: 'No existe el perfil.' });
    }

    try {
        profile.name = name
        profile.address = address
        profile.phone = phone
        profile.email = email

        await profile.save();

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