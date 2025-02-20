import { BadgeDollarSign, Carrot, CircleUserRound, Home, UsersRound, UtensilsCrossed } from 'lucide-react';

// ================================
//  Web App Routes
// ================================
export const WEBSITE_ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
};

export const DASHBOARD_ROUTES = {
	DASHBOARD: '/dashboard',
	MESAS: '/mesas',
	PRODUCTOS: '/productos',
	VENTAS: '/ventas',
	MEMBERS: '/members',
	PROFILE: '/profile',
};

export const dashboard_links = [
	{
		id: 1,
		name: 'Inicio',
		icon: Home,
		url: DASHBOARD_ROUTES.DASHBOARD,
	},
	{
		id: 2,
		name: 'Mesas',
		icon: UtensilsCrossed,
		url: DASHBOARD_ROUTES.MESAS,
	},
	{
		id: 3,
		name: 'Productos',
		icon: Carrot,
		url: DASHBOARD_ROUTES.PRODUCTOS,
	},
	{
		id: 4,
		name: 'Ventas',
		icon: BadgeDollarSign,
		url: DASHBOARD_ROUTES.VENTAS,
	},
	{
		id: 5,
		name: 'Miembros',
		icon: UsersRound,
		url: DASHBOARD_ROUTES.MEMBERS,
	},
	{
		id: 6,
		name: 'Mi Cuenta',
		icon: CircleUserRound,
		url: DASHBOARD_ROUTES.PROFILE,
	},
];
