'use client';
export const dynamic = 'force-static';

import { VerticalContainer, Container } from '../../components/library/structure';
import { ProtectedRoute } from '../../components/library/routing';
import { DashboardNavbar } from '../../components/library/navigation';
import { Toaster } from '../../components/ui/toaster';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DashboardNavbar></DashboardNavbar>
			<ProtectedRoute>
				<VerticalContainer escape={'all'}>
					<Toaster />
					<Container className="bg-background text-foreground">{children}</Container>
				</VerticalContainer>
			</ProtectedRoute>
		</>
	);
}
