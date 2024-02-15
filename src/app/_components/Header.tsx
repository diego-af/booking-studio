'use client';

import {Avatar} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {
	SheetContent,
	SheetTrigger,
	Sheet,
	SheetClose
} from '@/components/ui/sheet';
import {AvatarFallback, AvatarImage} from '@radix-ui/react-avatar';
import {
	Calendar,
	HomeIcon,
	LogInIcon,
	Menu,
	MenuIcon,
	UserIcon
} from 'lucide-react';
import Link from 'next/link';
import {useContext, useEffect} from 'react';
import {BookingContext, IUser} from '../Context/provider';
import {useRouter} from 'next/navigation';

export default function Header() {
	const {logged, user, setUsers} = useContext(BookingContext);
	const router = useRouter();

	const handleFunction = () => {
		if (logged) {
			handleLogout();
			return;
		}

		handleLogin();
	};

	const handleLogout = () => {
		localStorage.removeItem('user');
		setUsers(undefined);
	};
	const handleLogin = () => {
		router.push('/login');
	};

	useEffect(() => {
		
	}, [logged]);
	return (
		<Card className=''>
			<CardContent className='w-full flex justify-between items-center p-0'>
				<span className='text-3xl font-bold text-gray-300'>Studio Sales </span>

				<Sheet>
					<SheetTrigger asChild>
						<Button size={'icon'}>
							<MenuIcon size={20} color='#fafafa' />
						</Button>
					</SheetTrigger>

					<SheetContent className='bg-[#141518] p-4'>
						<div className='w-full  flex flex-col '>
							<h4 className='text-xl text-gray-400 font-bold'>Menu</h4>
							<div className='w-full flex gap-2 items-center justify-between mt-4'>
								<div className='w-full flex gap-2 items-center'>
									<UserIcon color='#fafafa' size={20} />
									<span className='text-sm text-gray-400 text-capitalize '>
										{logged ? user?.username : ' Faça o Login para agendar'}
									</span>
								</div>

								<Button onClick={handleFunction}>
									<LogInIcon color='#fafafa' />
								</Button>
							</div>

							<div className='flex flex-col gap-3 mt-4'>
								<Card className='w-full border border-gray-700 '>
									<Button
										variant='secondary'
										className='justify-start text-white w-full'
										asChild
									>
										<Link href='/'>
											<HomeIcon size={18} className='mr-2' />
											Início
										</Link>
									</Button>
								</Card>
								{logged && (
									<Card className='w-full border border-gray-700 '>
										<Button
											variant='secondary'
											className='justify-start text-white w-full'
											asChild
										>
											<Link href='/booking'>
												<Calendar size={18} className='mr-2' />
												Agendamentos
											</Link>
										</Button>
									</Card>
								)}
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</CardContent>
		</Card>
	);
}
