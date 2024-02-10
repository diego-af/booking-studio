'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import Link from 'next/link';
import {schema} from '../schema/schema';
import {createUSer} from '@/app/_actions/createUser';
import {Loader2} from 'lucide-react';
import {useState} from 'react';
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

type FormData = {
	username: string;
	email: string;
	password: string;
};

const RegisterComponent = () => {
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<FormData>({
		resolver: zodResolver(schema)
	});

	const onSubmit = async (data: any) => {
		console.log(data);

		setLoading(true);

		try {
			const user = await createUSer({
				username: data.username,
				email: data.email,
				password: data.password
			});

			console.log(user);

			if (!user) {
				toast.info('Não foi possivel criar a conta', {
					description: 'Usuário ja existe',
					style: {
						background: '#DC2626',
						color: '#fafafa'
					}
				});
				setLoading(false);

				return;
			}
			setLoading(false);
			router.push('/login');
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardContent className='p-2'>
				<h2 className='font-bold text-gray-300 text-md text-center mb-2 uppercase'>
					Stúdio Sales Login
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full bg-[#26272B] flex justify-center flex-col gap-3 p-3'
				>
					<div className='w-full flex flex-col gap-2 '>
						<label className='text-gray-300'>Nome</label>
						<Input
							placeholder='Digite seu nome'
							className='border rounded-[4px] text-gray-300 outline-md border-purple-300  focus:border-purple-600 placeholder:text-gray-200'
							{...register('username')}
						/>
						{errors && errors.username && (
							<span className='text-red-500 text-sm '>
								{errors.username.message}
							</span>
						)}
					</div>
					<div className='w-full flex flex-col gap-2 '>
						<label className='text-gray-300'>Email</label>
						<Input
							placeholder='Email'
							className=' text-gray-300   border rounded-[4px] outline-md border-purple-300  focus:border-purple-600'
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
							<Loader2 className='mr-2 h-4 w-4 animate-spin bg-white' />
						)}
						Entrar
					</Button>
				</form>
			</CardContent>

			<div className='w-full justify-center items-center flex gap-1'>
				<p className='text-center text-gray-300 text-sm'>Já tem conta? </p>
				<Link
					href={'/login'}
					className='text-center text-purple-300 text-sm text-underline'
				>
					Fazer Login
				</Link>
			</div>
		</Card>
	);
};

export {RegisterComponent};
