import {z} from 'zod';

export const schema = z.object({
	username: z.string().min(3, 'O nome deve conter mais de 3 caracteres'),
	email: z.string().email('Email inválido'),
	password: z.string().min(6, 'A senha deve conter mais de 6 caracteres')
});
