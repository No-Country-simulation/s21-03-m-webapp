'use client';

import { useState } from 'react';
import TableMap from './TableMap';
import { Salon } from '@/types/mesas';
import { Plus } from 'lucide-react';

interface SalonTabsProps {
	salones: Salon[];
}

const SalonTabs = ({ salones }: SalonTabsProps) => {
	const [activeTab, setActiveTab] = useState(salones[0]?._id.toString() || '');

	return (
		<div className="w-full">
			{/* Contenedor de Tabs (Pestañas) */}
			<div className="flex">
				<button
					className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-t-xl  border border-b-0'bg-white text-gray-600 hover:text-chart-1 }`}
				>
					<Plus></Plus>
				</button>
				{salones.map((salon) => (
					<button
						key={salon._id}
						className={`px-6 py-2 text-sm font-medium transition-all duration-200 rounded-t-xl  border border-b-0 ${
							activeTab === salon._id.toString() ? 'text-white bg-chart-1' : 'bg-white text-gray-600 hover:text-chart-1'
						}`}
						onClick={() => setActiveTab(salon._id.toString())}
					>
						{salon.name}
					</button>
				))}
			</div>

			{/* Contenedor de Contenido (Mapa de Mesas) */}
			{salones.map((salon) => (activeTab === salon._id.toString() ? <TableMap key={salon._id} salon={salon} /> : null))}
		</div>
	);
};

export default SalonTabs;
