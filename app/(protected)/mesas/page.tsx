'use client';

import { SalonesTabs } from './_components';

const MesasPage = () => {
	return (
		<section className="flex flex-col items-center justify-center max-w-1800 m-auto gap-6">
			<article className="flex flex-col gap-2 items-center text-center">
				<h1 className="text-3xl font-bold mb-2">📍 Mapa de Mesas</h1>
				<p className="text-gray-600 max-w-md">
					Organiza y ajusta la distribución de las mesas de tu restaurante de forma fácil e intuitiva.
				</p>
			</article>
			<SalonesTabs></SalonesTabs>
		</section>
	);
};

export default MesasPage;
