'use client';

import { useState } from 'react';
import { Salon } from '@/types/mesas';
import { SalonesCreateButton, TableMap } from './';

interface SalonTabsProps {
	salones: Salon[];
}

const SalonTabs = ({ salones }: SalonTabsProps) => {
	const [activeTab, setActiveTab] = useState(salones[0]?._id || '');

	return (
		<div className="w-full">
			<div className="flex">
				<SalonesCreateButton></SalonesCreateButton>
				{salones.map((salon) => (
					<button
						key={salon._id}
						className={`px-6 py-2 text-sm font-medium transition-all duration-200 rounded-t-xl  border border-b-0 ${
							activeTab === salon._id ? 'text-white bg-chart-1' : 'bg-white text-gray-600 hover:text-chart-1'
						}`}
						onClick={() => setActiveTab(salon._id)}
					>
						{salon.name}
					</button>
				))}
			</div>
			{salones.map((salon) => (activeTab === salon._id ? <TableMap key={salon._id} salon={salon} /> : null))}
		</div>
	);
};

export default SalonTabs;
