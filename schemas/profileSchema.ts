import { z } from 'zod';

export const profileSchema = z.object({
	name: z.string(),
	address: z.string(),
	phone: z.string(),
	email: z.string().email({ message: 'El email no es válido.' }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
