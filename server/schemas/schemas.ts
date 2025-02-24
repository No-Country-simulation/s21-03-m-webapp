import z from "zod";


export const RegisterSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().trim().min(6, { message: "Mínimo de 6 caracteres" })
}).strict()

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().trim().min(1, { message: "Debes ingresar el password" })
}).strict()

export const SalonSchema = z.string()
  .trim()
  .min(1, { message: "Debes ingresar el nombre del salón" })


export const ProfileSchema = z.object({
    name: z.string().min(1, { message: "Debes ingresar el nombre" }),
    address: z.string().min(1, { message: "Debes ingresar la dirección" }),
    phone: z.string().min(1, { message: "Debes ingresar el teléfono" }),
    email: z.string().email({ message: "Email inválido" })
})

export const CategorySchema = z.object({
    name: z.string().trim().min(1, { message: "Debes ingresar un nombre" }),
    description: z.string().min(1, { message: "Debes ingresar una descripcion" }),
})

export const TableSchema = z.object({
    number: z.string().trim()
    .min(1, { message: "Debes ingresar un identificador" })
    .max(4,{ message: "Máximo 4 caracteres" }),
    xRatio: z.number({message:"Debes ingresar un número"}),
    yRatio: z.number({message:"Debes ingresar un número"}),
    x: z.number({message:"Debes ingresar un número"}),
    y: z.number({message:"Debes ingresar un número"})
});
