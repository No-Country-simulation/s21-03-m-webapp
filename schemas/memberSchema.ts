import { z } from 'zod';

export const FormSchema = z.object({
	name: z.string().trim().min(2, {
		message: 'Debes ingresar un nombre.',
	}),
	email: z.string().trim().email({
		message: 'Email inválido.',
	}),
	password: z.string().trim().min(6, {
		message: 'La contraseña debe tener al menos 6 caracteres.',
	}),
	role: z.string({
		message: 'Debes ingresar un rol.',
	}),
});

export type MemberFormData = z.infer<typeof FormSchema>;
