'use client';
export const dynamic = 'force-static';

import { VerticalContainer, Container } from '../../components/library/structure';
import { ProtectedRoute } from '../../components/library/routing';
import { DashboardNavbar } from '../../components/library/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DashboardNavbar></DashboardNavbar>
			<ProtectedRoute>
				<VerticalContainer escape={'all'}>
					<Container className="bg-background text-foreground">{children}</Container>
				</VerticalContainer>
			</ProtectedRoute>
		</>
	);
}
