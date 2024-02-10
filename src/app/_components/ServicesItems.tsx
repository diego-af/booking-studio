'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useContext, useEffect} from 'react';
import {BookingContext} from '../Context/provider';

export default function ServicesItems({services}: any) {
	const router = useRouter();
	const {logged, setUsers} = useContext(BookingContext);

	const formatPrice = (price: number) => {
		const formatter = new Intl.NumberFormat('en-BR', {
			style: 'currency',
			currency: 'BRL'
		});
		return formatter.format(price);
	};

	const handleBooking = (id: string) => {
		if (!logged) {
			router.push('/login');
			return;
		}
		router.push(`/booking/${id}`);
	};

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (!user) {
			router.push('/');
			setUsers(undefined);
			return;
		}

		const userData = JSON.parse(user);

		setUsers(userData);
	}, []);
	return (
		<Card className='w-full flex flex-col   p-2 bg-foreground mt-2 border border-gray-800'>
			<CardContent className='p-0 flex gap-4'>
				<div className='relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px] rounded-sm '>
					<Image
						src={services.imageUrl}
						fill
						alt={services.name}
						style={{objectFit: 'cover', width: '100%', height: '100%'}}
					/>
				</div>
				<div className='w-full flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<p className='text-sm text-gray-300 font-bold'>{services.name}</p>
						<p className='text-sm text-gray-400 '>{services.description}</p>
					</div>

					<div className='w-full flex justify-between items-center'>
						<span className='text-sm text-purple-500'>
							{formatPrice(services.price)}
						</span>

						<Button
							className='text-sm text-gray-300 border-none bg-gray-800 hover:bg-slate-700'
							onClick={() => handleBooking(services.id)}
						>
							Reservar
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
