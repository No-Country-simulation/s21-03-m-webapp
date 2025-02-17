'use client';

import { useBearStore, useDogStore } from '@/store';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';

const HomePage = () => {
	const bears = useBearStore((state) => state.bears);
	const dogs = useDogStore((state) => state.dogs);

	return <h2>Hola</h2>;
};

export default HomePage;
