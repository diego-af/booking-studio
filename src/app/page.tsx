import {getServices} from './_actions/getServices';
import Header from './_components/Header';
import ServicesItems from './_components/ServicesItems';

export default async function Home() {
	const services = await getServices();

	return (
		<main className='bg-black flex min-h-screen flex-col p-4 '>
			<Header />
			<div className='w-full flex flex-col gap-3 '>
				<h4 className='text-xl text-gray-300 mt-4'>Serviços</h4>

				<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
					{services.map((service) => {
						return <ServicesItems key={service.id} services={service} />;
					})}
				</div>
			</div>
		</main>
	);
}
