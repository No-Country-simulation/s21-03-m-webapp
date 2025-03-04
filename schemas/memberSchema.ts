import { z } from "zod";

export const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Debes ingresar un nombre.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres.",
    }),
    rol: z.string({
        message: "Debes ingresar un rol."
    })
})

export type MemberFormData=z.infer<typeof FormSchema>


