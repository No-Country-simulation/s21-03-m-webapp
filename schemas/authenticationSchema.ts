import * as z from 'zod';

export const loginSchema = z.object({
	email: z.string().email({ message: 'El email no es válido.' }),
	password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
});

export const registerSchema = z
	.object({
		username: z.string().email({ message: 'El email no es válido.' }),
		password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Las contraseñas no coinciden',
		path: ['confirmPassword'],
	});

export const loginFormDefaultValues = {
	email: '',
	password: '',
};

export const registerFormDefaultValues = {
	username: '',
	password: '',
	confirmPassword: '',
};

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
