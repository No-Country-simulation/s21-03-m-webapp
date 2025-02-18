'use client';

import { AuthenticationStoreProvider } from '../store/providers/authentication-store-provider';
import { ThemeProvider } from './theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<AuthenticationStoreProvider>
					<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
				</AuthenticationStoreProvider>
			</ThemeProvider>
		</>
	);
};

export default Providers;
