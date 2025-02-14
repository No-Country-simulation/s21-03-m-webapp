import { Request, Response } from "express";
import User from "../models/User";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (!name || !email || !password) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos.'
        });
    }

    if (user) {
        return res.status(400).json({
            msg: 'Existe una cuenta con el email ingresado.'
        });
    }

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    try {
        await user.save();
        const payload = { userId: user._id };

        jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: '2d' },
            (err: any, token: string) => {
                if (err) throw err;

                res.status(200).json({
                    msg: 'Usuario Creado Correctamente',
                    user: { id: user._id, name },
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
        const user = await User.findById(userId).exec()
        if (user) {
            jwt.sign({ userId }, process.env.JWT_SECRET,
                { expiresIn: '2d' },
                (err: any, token: string) => {
                    if (err) throw err;
                    res.status(200).json({
                        user: { id: user._id, name: user.name },
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
    let user = await User.findOne({ email });

    if (!email || !password) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos.'
        });
    }

    if (!user) {
        return res.status(401).json({
            msg: 'Usuario o Contraseña Incorrecta.'
        });
    }

    try {
        if (bcrypt.compareSync(password, user.password)) {
            const payload = { userId: user._id };

            jwt.sign(payload, process.env.JWT_SECRET,
                { expiresIn: '2d' },
                (err: any, token: string) => {
                    if (err) throw err;
                    res.status(200).json({
                        user: { id: user._id, name: user.name },
                        token
                    });
                });
        } else {
            return res.status(400).json({
                msg: 'Usuario o Contraseña Incorrecta.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}