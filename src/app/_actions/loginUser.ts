'use server';
import {db} from '../_lib/prisma';

type FormData = {
	email: string;
	password: string;
};

export const loginUser = async ({password, email}: FormData) => {
	const userExists = await db.user.findUnique({
		where: {
			email,
			password
		},
		select: {
			id: true,
			username: true,
			email: true
		}
	});

	if (!userExists) {
		return;
	}

	return userExists;
};
