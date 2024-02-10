import Header from '@/app/_components/Header';
import {db} from '@/app/_lib/prisma';
import BookItem from './_components/BookItem';

interface BarbershopDetailsPageProps {
	params: {
		id?: string;
	};
}
export default async function Booking({params}: BarbershopDetailsPageProps) {
	if (!params.id) {
		return;
	}
	const service = await db.service.findUnique({where: {id: params.id}});
	const hoursTime = await db.booking.findMany();

	console.log(hoursTime);

	return (
		<main className='bg-black flex  min-h-screen flex-col p-4 '>
			<Header />

			<div className='w-full flex flex-col gap-3 '>
				<BookItem
					service={service}
					hoursTime={hoursTime.map((item) => item.date)}
				/>
			</div>
		</main>
	);
}
