import  z  from "zod";


export const RegisterSchema=z.object({
    email:z.string().email({message:"Email inválido"}),
    password:z.string().min(6,{message:"Mínimo de 6 caracteres"})
}).strict()

export const LoginSchema=z.object({
    email:z.string().email({message:"Email inválido"}),
    password:z.string().min(1,{message:"Debes ingresar el password"})
}).strict()


