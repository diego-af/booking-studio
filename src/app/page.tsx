import {getServices} from './_actions/getServices';
import Header from './_components/Header';
import ServicesItems from './_components/ServicesItems';
import {db} from './_lib/prisma';

export default async function Home() {
	const services = await getServices();

	return (
		<main className='bg-black flex min-h-screen flex-col p-4 '>
			<Header />
			<div className='w-full flex flex-col gap-3 '>
				<h4 className='text-xl text-gray-500 mt-4'>Serviços</h4>
				{services.map((service) => {
					return <ServicesItems key={service.id} services={service} />;
				})}
			</div>
		</main>
	);
}
