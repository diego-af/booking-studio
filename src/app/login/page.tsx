import Header from '../_components/Header';
import {LoginComponent} from './component/Login';

export default function Login() {
	return (
		<main className='bg-black flex min-h-screen  flex-col p-4 '>
			<Header />

			<div className='w-full flex flex-col flex-1 justify-center gap-3 '>
				<LoginComponent />
			</div>
		</main>
	);
}
