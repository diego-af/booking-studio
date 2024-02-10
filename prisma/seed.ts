const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function seedDatabase() {
	try {
		const services = [
			{
				name: 'Sobrancelha com Henna',
				description: 'Acabamento perfeito para um visual renovado.',
				price: 35.0,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/travells-992af.appspot.com/o/bookings%2Feybrow-with-henna.jpg?alt=media&token=493cc454-64cb-4914-95b3-b45321a07f32'
			},
			{
				name: 'Braw Lamination',
				description: 'Acabamento perfeito para um visual renovado.',
				price: 90.0,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/travells-992af.appspot.com/o/bookings%2Fbraw.jpg?alt=media&token=768cf6ea-6174-408e-8439-f437e1df34af'
			},
			{
				name: 'Sobrancelha Design Simples',
				description: 'Expressão acentuada com modelagem precisa.',
				price: 30.0,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/travells-992af.appspot.com/o/bookings%2Feybrow.jpg?alt=media&token=8ec8fc81-1b39-4162-9e66-2c7d95458097'
			},
			{
				name: 'Sobrancelha: Micropigmentação',
				description: 'Expressão acentuada com modelagem precisa.',
				price: 350.0,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/travells-992af.appspot.com/o/bookings%2Fmicro-eybrow.jpg?alt=media&token=f9374a16-f14c-46b5-b14b-255e5d625930'
			},
			{
				name: 'Lash Lifting',
				description: 'Cílios modelados de forma natural.',
				price: 75.0,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/travells-992af.appspot.com/o/bookings%2Flash-lifting.jpg?alt=media&token=f2b60cfe-866c-4a59-b3ba-fc0fde85fc40'
			},
			{
				name: 'Massagem',
				description: 'Relaxe com uma massagem revigorante.',
				price: 50.0,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/travells-992af.appspot.com/o/bookings%2Fmassagem.jpg?alt=media&token=98420dc9-09ad-4028-a085-30a6c7665bec'
			},
			{
				name: 'Unhas com gel',
				description: 'Remodelando suas mãos',
				price: 75.0,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/travells-992af.appspot.com/o/bookings%2Fnail-designer.jpg?alt=media&token=40c4b3d6-c731-43ed-be12-c286a51e183c'
			},
			{
				name: 'Unhas: Pé e mão',
				description: 'Remodelando suas mãos e pés',
				price: 50.0,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/travells-992af.appspot.com/o/bookings%2Fnail-general.jpg?alt=media&token=bf4d3c1c-6140-48e0-b7f7-fd1cf0b9118c'
			},
			{
				name: 'Unhas: Somente mão',
				description: 'Remodelando suas mãos',
				price: 50.0,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/travells-992af.appspot.com/o/bookings%2Fnails-hands.jpg?alt=media&token=0d6d21d9-9716-47ee-bf46-15cd6cc504dc'
			},
			{
				name: 'Unhas: Somente pé',
				description: 'Remodelando seus pés',
				price: 50.0,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/travells-992af.appspot.com/o/bookings%2Fnails-footer.jpg?alt=media&token=7c6a19de-d108-4dac-afaa-fc1367b064d7'
			}
		];

		// Criar 10 barbearias com nomes e endereços fictícios

		for (const service of services) {
			await prisma.service.create({
				data: {
					name: service.name,
					description: service.description,
					price: service.price,
					imageUrl: service.imageUrl
				}
			});
		}

		// Fechar a conexão com o banco de dados
		await prisma.$disconnect();
	} catch (error) {
		console.error('Erro ao criar as barbearias:', error);
	}
}

seedDatabase();
