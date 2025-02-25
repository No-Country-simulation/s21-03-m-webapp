import { Request, Response } from "express";
import Profile from "../models/Profile";
import cloudinary from "../config/cloudinary";
import path from "path"


export const edit = async (req: Request, res: Response) => {
    const { name, address, phone, email } = req.body;
    const file = req.file

    if (req.type !== "owner") {
        res.status(401).json({
            msg: "No tienes permisos para realizar esta acción."
        })
        return
    }

    const ownerId = req.ownerId;
    const profile = await Profile.findOne({ ownerId })

    if (!profile) {
       res.status(404).send({ msg: 'No existe el perfil.' });
       return 
    }

    try {

        if (file) {
            const extension = path.extname(file).toLowerCase()
            const uniqueFilename = `pet_${Date.now()}${extension}`

            await cloudinary.uploader.upload(file, {
                public_id: uniqueFilename,
                resource_type: "image"
            }, async function (error, result) {
                if (error) {
                    const error = new Error("Hubo un error al subir la imágen")
                    res.status(500).json({ msg: error.message })
                    return
                }
                if (result) {
                    profile.logo = result.secure_url
                }
            })
        }

        profile.name = name
        profile.address = address
        profile.phone = phone
        profile.email = email

        await profile.save()

         res.status(200).json({
            msg: 'Perfil Editado Correctamente.',
            profile
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}