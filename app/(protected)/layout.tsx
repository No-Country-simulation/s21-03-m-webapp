'use client';
export const dynamic = 'force-static';

import { VerticalContainer, Container } from '../../components/library/structure';
import { ProtectedRoute } from '../../components/library/routing';
import { DashboardNavbar, DashboardSidebar } from '../../components/library/navigation';
import { Toaster } from '../../components/ui/toaster';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DashboardSidebar></DashboardSidebar>
			<DashboardNavbar></DashboardNavbar>
			<ProtectedRoute>
				<Toaster />
				<VerticalContainer escape={'all'}>
					<Container className="bg-background text-foreground" variant={'large'}>
						{children}
					</Container>
				</VerticalContainer>
			</ProtectedRoute>
		</>
	);
}
