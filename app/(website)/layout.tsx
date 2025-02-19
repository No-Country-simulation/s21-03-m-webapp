'use client';

import { VerticalContainer, Container } from '../../components/library/structure';
import { WebsiteNavbar } from '../../components/library/navigation';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<WebsiteNavbar></WebsiteNavbar>
			<VerticalContainer escape={'all'}>
				<Container className="bg-background text-foreground">{children}</Container>
			</VerticalContainer>
		</>
	);
}
