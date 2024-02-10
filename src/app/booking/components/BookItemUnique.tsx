'use client';

import {BookingContext} from '@/app/Context/provider';
import {Card, CardContent} from '@/components/ui/card';
import {ptBR} from 'date-fns/locale';
import {useRouter} from 'next/navigation';
import {format} from 'date-fns';
import {useContext, useEffect} from 'react';

interface IBookings {
	userId: string;
	serviceId: string;
	date: Date;
}

interface IBookingsProps {
	bookings: IBookings[];
}
export default function BoookingItemUnique({bookings}: IBookingsProps) {
	const router = useRouter();
	const {user, setUsers, logged} = useContext(BookingContext);

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (!user) {
			setUsers(undefined);
			router.push('/');
			return;
		}

		const userData = JSON.parse(user);

		setUsers(userData);
	}, [logged]);

	const handleFormatNumber = (number: number) => {
		const formatter = new Intl.NumberFormat('en-BR', {
			style: 'currency',
			currency: 'BRL'
		});
		return formatter.format(number);
	};
	const bookingFiltered = bookings.filter(
		(booking) => booking.userId === user?.id
	);

	if (bookingFiltered.length === 0) {
		return (
			<div className='w-full flex flex-col gap-3 mt-6'>
				<span className='text-sm text-gray-300'>Ainda não há agendamentos</span>
			</div>
		);
	}
	return (
		<div className='w-full flex flex-col gap-3 mt-6'>
			{bookingFiltered.map((booking: any) => (
				<Card key={booking.id}>
					<CardContent className='w-full flex  items-center  bg-[#1A1B1F] p-4 border border-solid border-gray-500 rounded-xl'>
						<div className='w-full flex justify-between  gap-3 items-center '>
							<div className='flex flex-col  gap-2'>
								<span className='text-md font-bold text-gray-300'>
									{booking.service.name}
								</span>
								<span className='text-sm  text-gray-300'>
									{handleFormatNumber(booking.service.price)}
								</span>
							</div>

							<div className='flex flex-col items-center justify-center  border-l border-solid border-gray-500 px-4'>
								<p className='text-sm capitalize  text-gray-300'>
									{format(booking.date, 'MMMM', {
										locale: ptBR
									})}
								</p>
								<p className='text-2xl text-gray-300 font-bold'>
									{format(booking.date, 'dd')}
								</p>
								<p className='text-sm  text-gray-300'>
									{format(booking.date, 'hh:mm')}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
