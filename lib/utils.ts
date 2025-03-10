import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);

	const formatDate = new Intl.DateTimeFormat('es-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(date);
	return formatDate;
};

export const days = Array.from({ length: 31 }, (_, i) => ({
	id: i + 1,
	label: `${i + 1}`,
}));

// Generar opciones para meses (enero a diciembre)
export const months = [
	{ id: 1, label: 'Enero' },
	{ id: 2, label: 'Febrero' },
	{ id: 3, label: 'Marzo' },
	{ id: 4, label: 'Abril' },
	{ id: 5, label: 'Mayo' },
	{ id: 6, label: 'Junio' },
	{ id: 7, label: 'Julio' },
	{ id: 8, label: 'Agosto' },
	{ id: 9, label: 'Septiembre' },
	{ id: 10, label: 'Octubre' },
	{ id: 11, label: 'Noviembre' },
	{ id: 12, label: 'Diciembre' },
];

// Generar opciones para años (últimos 10 años)
const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 10 }, (_, i) => ({
	id: currentYear - i,
	label: `${currentYear - i}`,
}));
