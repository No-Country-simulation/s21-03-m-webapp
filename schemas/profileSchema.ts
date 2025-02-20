import { z } from 'zod';

export const profileSchema = z.object({
	name: z.string(),
	address: z.string(),
	phone: z.string(),
	email: z.union([z.literal(''), z.string().email()]),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
