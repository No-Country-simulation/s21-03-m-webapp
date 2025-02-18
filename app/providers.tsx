'use client';

import { AuthProvider } from '../context/AuthenticationContext';
import { ThemeProvider } from './theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<AuthProvider>
					<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
				</AuthProvider>
			</ThemeProvider>
		</>
	);
};

export default Providers;
