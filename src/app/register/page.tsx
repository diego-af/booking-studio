import Header from '../_components/Header';
import {RegisterComponent} from './component/Register';

export default function Register() {
	return (
		<main className='bg-black flex min-h-screen  flex-col p-4 '>
			<Header />

			<div className='w-full flex flex-col flex-1 justify-center gap-3 '>
				<RegisterComponent />
			</div>
		</main>
	);
}
