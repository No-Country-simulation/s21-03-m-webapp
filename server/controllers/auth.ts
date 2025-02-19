import { Request, Response } from "express";

import Member from "../models/Member";
import { comparePassword } from "../utils/hashedPassword";
import { generateJWT } from "../utils/jwt";
import Owner from "../models/Owner";
import Profile from "../models/Profile";
import { LoginSchema, RegisterSchema } from "../schemas/schemas";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = RegisterSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            error: result.error.errors.map((err) => err.message)
        })
    }
    let user = await Owner.findOne({ email });

    if (user) {
        return res.status(400).json({
            msg: 'Existe una cuenta con el email ingresado.'
        });
    }

    user = new Owner(req.body);

    await new Profile({ ownerId: user._id }).save();
    const profile = { name: '', address: '', logo: '', phone: '', email: '' }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    try {
        await user.save();
        const payload = { userId: user._id };

        jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: '2d' },
            (err: any, token: string) => {
                if (err) throw err;

                res.status(201).json({
                    msg: 'Usuario Creado Correctamente',
                    user: { id: user._id, email: user.email, role: user.role, profile },
                    token
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}


export const currentUser = async (req: Request, res: Response) => {


    try {

        if (req.type === "owner") {
            {
                const user = await Owner.findById(req.ownerId)
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
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = LoginSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            error: result.error.errors.map((err) => err.message)
        })
    }
    let owner = await Owner.findOne({ email });
    let member = await Member.findOne({ email })


    if (!owner && !member) {
        return res.status(401).json({
            msg: "Usuario o Contraseña Incorrecta."
        })
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
                user:owner,
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
                user:member,
                token
            })
        }

    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}