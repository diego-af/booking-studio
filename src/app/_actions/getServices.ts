'use server';

import {db} from '../_lib/prisma';

export const getServices = async () => {
	const services = await db.service.findMany({});

	return services;
};
