'use client';

import Header from '@/app/_components/Header';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {schema} from '../schema/schema';
import {loginUser} from '@/app/_actions/loginUser';
import {toast} from 'sonner';
import {BookingContext, IUser} from '@/app/Context/provider';
import {Loader2Icon} from 'lucide-react';

type FormData = {
	email: string;
	password: string;
};
const LoginComponent = () => {
	const [loading, setLoading] = useState(false);
	const {setUsers} = useContext(BookingContext);

	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<FormData>({
		resolver: zodResolver(schema)
	});

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		try {
			const user = await loginUser({
				email: data.email,
				password: data.password
			});

			if (!user) {
				toast.info('Não foi possivel fazer login', {
					description: 'Email ou senha inválidos',
					style: {
						background: '#DC2626',
						color: '#fafafa'
					}
				});

				setLoading(false);
				return;
			}
			if (user) {
				setUsers(user);
			}
			localStorage.setItem('user', JSON.stringify(user));
			setLoading(false);
			router.push('/');
		} catch (error) {
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (user) {
			router.push('/');
			setUsers(JSON.parse(user));
			return;
		}
		setUsers({} as IUser);
	}, []);

	return (
		<Card>
			<CardContent className='p-2 flex justify-center items-center flex-col'>
				<h2 className='font-bold text-gray-300 text-md text-center mb-2 uppercase'>
					Stúdio Sales Login
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full max-w-lg bg-[#26272B] flex justify-center flex-col gap-4 p-3'
				>
					<div className='w-full flex flex-col gap-2 '>
						<label className='text-gray-300'>Email</label>
						<Input
							placeholder='Email'
							className=' text-gray-300  border rounded-[4px] outline-md border-purple-300  focus:border-purple-600'
							{...register('email')}
						/>
						{errors && errors.email && (
							<span className='text-red-500 text-sm '>
								{errors.email.message}
							</span>
						)}
					</div>
					<div className='w-full flex flex-col gap-2 '>
						<label className='text-gray-300'>Senha</label>
						<Input
							placeholder='Senha'
							className=' text-gray-300   border rounded-[4px] outline-md border-purple-300  focus:border-purple-600'
							{...register('password')}
						/>
						{errors && errors.password && (
							<span className='text-red-500 text-sm '>
								{errors.password.message}
							</span>
						)}
					</div>

					<Button
						type='submit'
						className='w-full bg-purple-400 text-white hover:bg-purple-500 mt-2'
						disabled={loading}
					>
						{loading && (
							<Loader2Icon className='mr-2 h-4 w-4 animate-spin bg-white' />
						)}
						Entrar
					</Button>
				</form>
			</CardContent>

			<div className='w-full justify-center items-center flex gap-1'>
				<p className='text-center text-gray-300 text-sm'>Não tem conta? </p>
				<Link
					href={'/register'}
					className='text-center text-purple-300 text-sm text-underline'
				>
					Crie uma conta
				</Link>
			</div>
		</Card>
	);
};

export {LoginComponent};
