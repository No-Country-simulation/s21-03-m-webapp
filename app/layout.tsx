import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Mesa 360',
	description: 'El POS para tu restaurante mas fachero!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
