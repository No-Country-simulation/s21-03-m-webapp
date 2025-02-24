'use client';

import { useState, useEffect, useCallback } from 'react';
import { SalonesCreateButton, TableMap } from './';
import { useSalones } from '@/actions/hooks/salones/useSalones';
import { ApiLoader } from '@/components/library/loading';
import { Salon } from '@/types/mesas';

const SalonTabs = () => {
	const { data: salones = [], isPending, isError } = useSalones();
	const [activeTab, setActiveTab] = useState<string | null>(null);
	const [activeSalon, setActiveSalon] = useState<Salon | null>(null);

	const handleSelectSalon = useCallback((salon: Salon) => {
		setActiveTab(salon._id);
		setActiveSalon({ ...salon });
	}, []);

	// 🔹 Efecto para seleccionar el primer salón disponible
	useEffect(() => {
		if (salones.length > 0) {
			const foundSalon = salones.find((s) => s._id === activeTab);
			setActiveSalon(foundSalon ? { ...foundSalon } : { ...salones[0] });
			setActiveTab(foundSalon?._id ?? salones[0]._id);
		} else {
			setActiveTab(null);
			setActiveSalon(null);
		}
	}, [activeTab, salones]);

	if (isPending) return <ApiLoader isPending />;
	if (isError) return <h2>Ocurrió un error, intente más tarde...</h2>;

	if (salones.length === 0 || !activeSalon) {
		return (
			<div className="w-full">
				<div className="flex">
					<SalonesCreateButton />
					<p className="w-full px-6 py-8 border bg-white shadow-md rounded-tr-lg rounded-b-lg">
						No hay salones disponibles
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="flex">
				<SalonesCreateButton />
				{salones.map((salon) => (
					<button
						key={salon._id}
						className={`px-6 py-2 text-sm font-medium transition-all duration-200 rounded-t-xl border border-b-0 ${
							activeTab === salon._id ? 'text-white bg-chart-1' : 'bg-white text-gray-600 hover:text-chart-1'
						}`}
						onClick={() => handleSelectSalon(salon)}
					>
						{salon.name}
					</button>
				))}
			</div>
			<TableMap salon={activeSalon} key={activeSalon._id} />
		</div>
	);
};

export default SalonTabs;
