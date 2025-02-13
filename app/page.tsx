'use client';

import { useBearStore, useDogStore } from '@/store';

const HomePage = () => {
	const bears = useBearStore((state) => state.bears);
	const dogs = useDogStore((state) => state.dogs);

	return (
		<div>
			Mesa 360 con {bears} Bears y {dogs} Dogs
		</div>
	);
};

export default HomePage;
