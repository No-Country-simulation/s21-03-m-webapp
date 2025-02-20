import { Request, Response } from "express";
import Member from "../models/Member";
import { comparePassword, hashPassword } from "../utils/hashedPassword";
import { generateJWT } from "../utils/jwt";
import Owner from "../models/Owner";
import Profile from "../models/Profile";
import { LoginSchema, RegisterSchema } from "../schemas/schemas";


export class Auth {

    static register = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const result = RegisterSchema.safeParse(req.body)

        if (!result.success) {
            res.status(400).json({
                error: result.error.errors.map((err) => err.message)
            })
            return
        }
        let owner = await Owner.findOne({ email });

        if (owner) {
            res.status(400).json({
                msg: 'Ya existe una cuenta con el email ingresado.'
            });
            return
        }

        try {
            owner = new Owner(req.body);

            const profile = await new Profile({ ownerId: owner._id }).save();

            owner.password = await hashPassword(password)
            owner.profile = profile.id
            await owner.save();

            const token = generateJWT({ ownerId: owner._id, type: "owner" })

            res.status(201).json({
                msg: 'Usuario creado con éxito',
                user: owner,
                profile,
                token
            });


        } catch (error) {
            res.status(500).json({
                msg: 'Ha ocurrido un error interno.'
            });
            return
        }
    }


    static currentUser = async (req: Request, res: Response) => {


        try {

            if (req.type === "owner") {
                {
                    const user = await Owner.findById(req.ownerId).populate("profile")
                    res.status(200).json({
                        user
                    })
                }
            }

            if (req.type === "member") {
                const user = await Member.findById(req.memberId)
                res.status(200).json({
                    user
                })

            }

        } catch (error) {
            res.status(500).json({
                msg: 'Ha ocurrido un error interno.'
            });
            return
        }
    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const result = LoginSchema.safeParse(req.body)

        if (!result.success) {
            res.status(400).json({
                error: result.error.errors.map((err) => err.message)
            })
            return
        }
        let owner = await Owner.findOne({ email }).populate("profile")
        let member = await Member.findOne({ email }).populate("profile")


        if (!owner && !member) {
            res.status(401).json({
                msg: "Usuario o Contraseña Incorrecta."
            })
            return
        }


        try {

            if (owner) {
                const isValidPassword = await comparePassword(password, owner.password)
                if (!isValidPassword) {
                    res.status(400).json({
                        msg: 'Usuario o Contraseña Incorrecta.'
                    });
                    return
                }

                const token = generateJWT({ ownerId: owner._id, type: "owner" })
                res.status(200).json({
                    msg: "Logueado con éxito",
                    user: owner,
                    token
                })
            }

            else if (member) {

                const isValidPassword = await comparePassword(password, member.password)
                if (!isValidPassword) {
                    res.status(400).json({
                        msg: 'Usuario o Contraseña Incorrecta.'
                    });
                    return
                }

                const token = generateJWT({ memberId: member._id, ownerId: member.ownerId, type: "member" })
                res.status(200).json({
                    msg: "Logueado con éxito",
                    user: member,
                    token
                })
            }

        } catch (error) {
            res.status(500).json({
                msg: 'Ha ocurrido un error interno.'
            })
            return
        }
    }
}

