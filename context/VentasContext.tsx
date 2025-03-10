import { OrderCompleteResponse } from '@/types/orders';
import { createContext, useMemo, useState, useEffect } from 'react';

export type Options = {
	id: number;
	label: string;
};

interface InitialValues {
	day: number;
	month: number;
	year: number;
}

interface ContextType {
	initialValues: InitialValues;
	sortedOrders: OrderCompleteResponse[];
	orders: OrderCompleteResponse[];
	setOrders: React.Dispatch<React.SetStateAction<OrderCompleteResponse[]>>;
	setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
	setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
	setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
	selectedDay: number;
	selectedMonth: number;
	selectedYear: number;
	filteredOrders: OrderCompleteResponse[];
}

export const VentasContext = createContext<ContextType | undefined>(undefined);

export const VentasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const date = new Date();
	const initialValues = {
		day: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
	};

	const [selectedDay, setSelectedDay] = useState<number>(initialValues.day);
	const [selectedMonth, setSelectedMonth] = useState<number>(initialValues.month);
	const [selectedYear, setSelectedYear] = useState<number>(initialValues.year);
	const [orders, setOrders] = useState<OrderCompleteResponse[]>([]);

	const filteredOrders = useMemo(() => {
		return orders
			.filter((order) => {
				const orderDate = new Date(order.createdAt);
				return (
					orderDate.getDate() === selectedDay &&
					orderDate.getMonth() + 1 === selectedMonth &&
					orderDate.getFullYear() === selectedYear
				);
			})
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Orden descendente
	}, [orders, selectedDay, selectedMonth, selectedYear]);
	const sortedOrders = useMemo(() => {
		return filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	}, [filteredOrders]);
	return (
		<VentasContext.Provider
			value={{
				initialValues,
				sortedOrders,
				orders,
				setOrders,
				selectedDay,
				selectedMonth,
				selectedYear,
				setSelectedDay,
				setSelectedMonth,
				setSelectedYear,
				filteredOrders,
			}}
		>
			{children}
		</VentasContext.Provider>
	);
};
