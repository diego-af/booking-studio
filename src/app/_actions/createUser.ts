'use server';
import {db} from '../_lib/prisma';

type FormData = {
	username: string;
	email: string;
	password: string;
};

export const createUSer = async ({username, password, email}: FormData) => {
	const userExists = await db.user.findUnique({
		where: {
			email
		}
	});

	if (userExists) {
		return;
	}
	const user = await db.user.create({
		data: {
			username: username,
			email: email,
			password: password
		}
	});

	return user;
};
