import { Request, Response } from "express";
import Profile from "../models/Profile";

interface AuthRequest extends Request {
    userId?: string;
}

export const edit = async (req: AuthRequest, res: Response) => {
    const { name, address, logo, phone, email } = req.body;
    const userId = req.userId;

    const profile = await Profile.findOne({ ownerId: userId })

    if (!profile) {
        return res.status(404).send({ msg: 'No existe el perfil.' });
    }

    try {
        profile.name = name
        profile.address = address
        profile.logo = logo // TODO: como se manejara las imagenes?
        profile.phone = phone
        profile.email = email

        await profile.save();

        return res.status(200).json({
            msg: 'Perfil Editado Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}