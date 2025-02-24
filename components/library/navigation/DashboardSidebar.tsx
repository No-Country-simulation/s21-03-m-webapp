'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
	useSidebar,
} from '@/components/ui/sidebar';
import { Container } from '../../library/structure';
import Link from 'next/link';
import { Logo } from '../logo';
import { dashboard_links, WEBSITE_ROUTES } from '../../../constants/routes';
import { DoorOpen, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthenticationContext';
import { useRouter } from 'next/navigation';

const MesaSidebar = () => {
	const { setOpenMobile } = useSidebar();
	const { logoutUser } = useAuth();
	const router = useRouter();

	return (
		<aside className="md:hidden">
			<nav className="w-full h-[5rem] bg-white fixed top-0 drop-shadow-sm z-30">
				<Container className="h-full flex flex-row items-center justify-between">
					<Logo toDashboard></Logo>
					<div className="relative flex flex-col items-center justify-center">
						<Menu></Menu>
						<SidebarTrigger className="opacity-0 absolute top-0 left-0 w-full h-full" />
					</div>
				</Container>
			</nav>
			<Sidebar collapsible="offcanvas">
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Mesa 360</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu className="gap-6 mt-6">
								{dashboard_links.map((item) => {
									const { id, url, name, icon: Icon } = item;
									return (
										<SidebarMenuItem key={id}>
											<SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
												<Link href={url} className="flex flex-row gap-2">
													<Icon></Icon>
													<span className="text-xl font-normal text-primary">{name}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
								<SidebarMenuItem>
									<SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
										<div className="flex flex-row gap-2">
											<DoorOpen></DoorOpen>
											<span
												className="text-xl font-normal text-primary"
												onClick={() => {
													logoutUser();
													router.push(WEBSITE_ROUTES.HOME);
												}}
											>
												Salir
											</span>
										</div>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</aside>
	);
};

export default MesaSidebar;
