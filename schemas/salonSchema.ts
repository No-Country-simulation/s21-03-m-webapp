import { z } from 'zod';

export const salonSchema = z.object({
	name: z.string().min(1, 'Debes ingresar un nombre.'),
});

export type SalonFormData = z.infer<typeof salonSchema>;
