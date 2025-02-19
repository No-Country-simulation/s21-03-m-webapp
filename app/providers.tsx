'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '../context/AuthenticationContext';
import { ThemeProvider } from './theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>{children}</AuthProvider>
					<ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
				</QueryClientProvider>
			</ThemeProvider>
		</>
	);
};

export default Providers;
