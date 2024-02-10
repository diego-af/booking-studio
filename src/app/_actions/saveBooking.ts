'use server';

import {revalidatePath} from 'next/cache';
import {db} from '../_lib/prisma';

interface IBookings {
	userId: string;
	serviceId: string;
	date: Date;
}
export const saveBooking = async (booking: IBookings) => {
	try {
		const newBooking = await db.booking.create({
			data: {
				userId: booking.userId,
				serviceId: booking.serviceId,
				date: booking.date
			}
		});
		revalidatePath('/');
		revalidatePath('/booking');
		return newBooking;
	} catch (error) {
		console.log(error);
	}
};
