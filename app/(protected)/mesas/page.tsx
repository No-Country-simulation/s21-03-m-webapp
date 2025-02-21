'use client';

import { useSalones } from '@/actions/hooks/salones/useSalones';

import { SalonesTabs } from './_components';

const MesasPage = () => {
	const { data: salones, isPending, isError } = useSalones();

	if (isError) {
		return <h2>Ocurrio un error, intente mas tarde...</h2>;
	}

	if (salones && !isPending)
		return (
			<section className="flex flex-col items-center justify-center max-w-1800 gap-6">
				<article className="flex flex-col gap-2 items-center text-center">
					<h1 className="text-3xl font-bold mb-2">📍 Mapa de Mesas</h1>
					<p className="text-gray-600 max-w-md">
						Organiza y ajusta la distribución de las mesas de tu restaurante de forma fácil e intuitiva.
					</p>
				</article>
				<SalonesTabs salones={salones}></SalonesTabs>
			</section>
		);
};

export default MesasPage;
