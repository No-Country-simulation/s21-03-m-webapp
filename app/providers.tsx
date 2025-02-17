'use client';

import { ThemeProvider } from './theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</ThemeProvider>
		</>
	);
};

export default Providers;
