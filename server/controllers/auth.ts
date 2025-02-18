import { Request, Response } from "express";
import User from "../models/User";
import Member from "../models/Member";
import { comparePassword } from "../utils/hashedPassword";
import { generateJWT } from "../utils/jwt";
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
                    user: { id: user._id, name, email: user.email, role: user.role },
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
        if(req.type==="owner"){{
            const user = await User.findById(req.userId)
            res.status(200).json({
                user
            })
        }}
     
        if(req.type==="member"){
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

    if (!email || !password) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos.'
        });
    }
    let user = await User.findOne({ email });
    let member = await Member.findOne({ email })

    if (!user && !member) {
        return res.status(401).json({
            msg: 'Usuario o Contraseña Incorrecta.'
        });
    }

    try {
        if (user) {
            const isValidPassword = await comparePassword(password, user.password)
            if (!isValidPassword) {
                res.status(400).json({
                    msg: 'Usuario o Contraseña Incorrecta.'
                });
                return
            }

            const token = generateJWT({ id: user._id,type:"owner" })
            res.status(200).json({
                msg: "Logueado con éxito",
                token
            })
        }

       else if(member){
       
            const isValidPassword = await comparePassword(password, member.password)
            if (!isValidPassword) {
                res.status(400).json({
                    msg: 'Usuario o Contraseña Incorrecta.'
                });
                return
            }

            const token= generateJWT({memberId:member._id,ownerId:member.ownerId,type:"member"})
            res.status(200).json({
                msg:"Logueado con éxito",
                token
            })
        
       }
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}