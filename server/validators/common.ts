import { z } from 'zod';

export const queryValidator = z.object({
	page: z.coerce.number().optional(),
	limit: z.coerce.number().optional(),
	search: z.union([z.string().optional(), z.number().optional()]),
});
