'use client';

import { SidebarProvider } from '../components/ui/sidebar';
import { AuthProvider } from '../context/AuthenticationContext';
import { ThemeProvider } from './theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<SidebarProvider>{children}</SidebarProvider>
					</AuthProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</>
	);
};

export default Providers;
