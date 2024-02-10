'use client';

import {addDays, setHours, setMinutes} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {Calendar} from '@/components/ui/calendar';
import {useContext, useEffect, useMemo, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Loader2Icon, Timer} from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';
import {format} from 'date-fns';
import {BookingContext} from '@/app/Context/provider';
import {toast} from 'sonner';
import {saveBooking} from '@/app/_actions/saveBooking';
import {useRouter} from 'next/navigation';
import {generateDayTimeList} from '@/app/_helpers/hours';

export default function BookItem({service, hoursTime}: any) {
	const {user, setUsers} = useContext(BookingContext);
	const [dateSelected, setDateSelected] = useState<Date | undefined>(undefined);
	const [hour, setHour] = useState<string | undefined>();
	const [saveLoading, setSaveLoading] = useState(false);
	const router = useRouter();

	const handleDateClick = (date: Date | undefined) => {
		setDateSelected(date);
	};

	const handleSaveBooking = async () => {
		if (!dateSelected || !hour) {
			toast.warning('Aviso', {
				description: 'Selecione uma data e horário',
				style: {
					background: '#b6bbaa',
					color: '#5f5d5d'
				}
			});
			setSaveLoading(false);
			return;
		}

		const dateHour = Number(hour.split(':')[0]);
		const dateMinutes = Number(hour.split(':')[1]);

		const newDate = setMinutes(setHours(dateSelected, dateHour), dateMinutes);

		try {
			const newBooking = await saveBooking({
				userId: user?.id as string,
				serviceId: service.id,
				date: newDate
			});

			if (newBooking) {
				toast.success('Sucesso', {
					description: 'Horário salvo com sucesso',
					style: {
						background: '#2c9435',
						color: '#fafafa'
					}
				});
			}
			setDateSelected(undefined);
			setHour(undefined);
			setSaveLoading(false);
			router.push('/booking');
		} catch (error) {
			console.log(error);
		} finally {
			setSaveLoading(false);
		}
	};

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (!user) {
			router.push('/');
			return;
		}

		const userData = JSON.parse(user);

		setUsers(userData);
	}, []);

	const timeList = useMemo(() => {
		if (!dateSelected) {
			return [];
		}

		return generateDayTimeList(dateSelected).filter((hour) => {
			const timeHour = Number(hour.split(':')[0]);
			const timeMinutes = Number(hour.split(':')[1]);

			const booking = hoursTime.find((date: Date) => {
				const bookingHour = date.getHours();
				const bookingMinutes = date.getMinutes();
				const bookingDay = dateSelected.getDate();

				return (
					bookingHour === timeHour &&
					bookingMinutes === timeMinutes &&
					bookingDay === date.getDate()
				);
			});

			console.log('booking', booking);

			if (!booking) {
				return true;
			}

			return false;
		});
	}, [dateSelected, hoursTime]);

	return (
		<div className='w-full flex flex-col gap-4'>
			<div className='mt-8'>
				<Calendar
					mode='single'
					className='w-full bg-[#141518] rounded-lg p-2'
					selected={dateSelected}
					onSelect={handleDateClick}
					locale={ptBR}
					fromDate={addDays(new Date(), 1)}
					styles={{
						head_cell: {
							width: '100%',
							textTransform: 'capitalize',
							color: '#fff'
						},
						cell: {
							width: '100%',
							color: '#fff'
						},
						button: {
							width: '100%'
						},
						nav_button_previous: {
							width: '32px',
							height: '32px',
							color: '#fff'
						},
						nav_button_next: {
							width: '32px',
							height: '32px',
							color: '#fff'
						},
						caption: {
							textTransform: 'capitalize',
							color: '#fff'
						}
					}}
				/>
			</div>

			{dateSelected && (
				<div className='w-full flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
					{timeList.map((hours) => (
						<Button
							key={hours}
							className={`w-fit flex gap-2 p-3 ${
								hour === hours ? 'bg-purple-600 font-bold' : ''
							} hover:bg-purple-600  rounded-full border border-gray-600`}
							onClick={() => setHour(hours)}
						>
							<Timer color='#fafafa ' />
							<span className='text-gray-300 text-sm font-bold'>{hours}</span>
						</Button>
					))}
				</div>
			)}

			<Card>
				<CardContent className='flex flex-col gap-4 bg-[#26272B] p-4 rounded-xl'>
					<div className='flex justify-between '>
						<h3 className='text-sm font-bold text-gray-300'>{service.name}</h3>
						<span className='text-gray-300 text-sm'>
							{Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL'
							}).format(service.price)}
						</span>
					</div>
					{dateSelected && (
						<div className='flex justify-between '>
							<h3 className='text-sm font-medium text-gray-500'>Data</h3>
							<span className='text-gray-400 text-sm'>
								{format(dateSelected, "dd 'de' MMMM", {
									locale: ptBR
								})}
							</span>
						</div>
					)}
					{hour && (
						<div className='flex justify-between '>
							<h3 className='text-sm font-medium text-gray-500'>Horário</h3>
							<span className='text-gray-400 text-sm'>{hour}</span>
						</div>
					)}
				</CardContent>
			</Card>

			<Button
				className='bg-purple-600 text-md text-white hover:bg-purple-500 transition-all'
				disabled={!dateSelected || !hour}
				onClick={handleSaveBooking}
			>
				{saveLoading && (
					<Loader2Icon className='mr-2 h-4 w-4 animate-spin bg-white' />
				)}
				Confirmar Agendamento
			</Button>
		</div>
	);
}
