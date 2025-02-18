import { Request, Response } from "express";
import Owner from "../models/Owner";
import Profile from "../models/Profile";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

interface UserData {
    id: string;
    email: string;
    role: string;
    profile?: any;
}

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user = await Owner.findOne({ email });

    if (!email || !password) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos.'
        });
    }

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

interface AuthRequest extends Request {
    userId?: string;
}
export const currentUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const user = await Owner.findById(userId).exec()
        if (user) {
            let userData: UserData = { id: user._id.toString(), email: user.email, role: user.role }

            if (user.role === 'Owner') {
                const profileOwner = await Profile.findOne({ ownerId: user._id })
                userData.profile = { name: profileOwner?.name, address: profileOwner?.address, logo: profileOwner?.logo, phone: profileOwner?.phone, email: profileOwner?.email }
            }
            jwt.sign({ userId }, process.env.JWT_SECRET,
                { expiresIn: '2d' },
                (err: any, token: string) => {
                    if (err) throw err;
                    res.status(200).json({
                        user: userData,
                        token
                    });
                });
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos.'
        });
    }

    let user = await Owner.findOne({ email });

    /* if (!user) {
        user = await Member.findOne({ email });
    } */

    if (!user) {
        return res.status(403).json({
            msg: 'Usuario o Contraseña Incorrecta.'
        });
    }

    let userData: UserData = { id: user._id.toString(), email: user.email, role: user.role }

    if (user.role === 'Owner') {
        const profileOwner = await Profile.findOne({ ownerId: user._id })
        userData.profile = { name: profileOwner?.name, address: profileOwner?.address, logo: profileOwner?.logo, phone: profileOwner?.phone, email: profileOwner?.email }
    }

    try {
        if (bcrypt.compareSync(password, user.password)) {
            const payload = { userId: user._id };

            jwt.sign(payload, process.env.JWT_SECRET,
                { expiresIn: '2d' },
                (err: any, token: string) => {
                    if (err) throw err;
                    res.status(200).json({
                        user: userData,
                        token
                    });
                });
        } else {
            return res.status(403).json({
                msg: 'Usuario o Contraseña Incorrecta.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}