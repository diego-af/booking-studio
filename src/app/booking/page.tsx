import Header from '@/app/_components/Header';
import {db} from '@/app/_lib/prisma';
import BoookingItemUnique from './components/BookItemUnique';

export default async function Booking() {
	const bookings = await db.booking.findMany({
		include: {
			service: true
		}
	});

	return (
		<main className='bg-black flex  min-h-screen flex-col p-4 '>
			<Header />

			<div className='w-full flex flex-col gap-3 mt-4 3 mb-2'>
				<span className='text-md text-gray-400  mt-4'>Agendamentos</span>
			</div>

			<div className='w-full flex flex-col gap-'>
				<BoookingItemUnique bookings={bookings} />
			</div>
		</main>
	);
}
