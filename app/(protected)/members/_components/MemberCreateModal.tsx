import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { MemberForm } from './MemberForm';
import { useState } from 'react';
export function MemberCreateModal() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className={`text-6xl bg-chart-1 text-white p-12 rounded-full cursor-pointer hover:bg-white hover:text-red-400 transition-opacity duration-200 ${
						open ? 'opacity-0 pointer-events-none' : 'opacity-100'
					}`}
					variant="outline"
				>
					+
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Crear Miembro</DialogTitle>
					<DialogDescription>Agrega un nuevo miembro a tu staff</DialogDescription>
				</DialogHeader>
				<MemberForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}
