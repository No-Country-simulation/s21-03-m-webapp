import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
	trigger: React.ReactNode;
	title: string;
	description: string;
	onConfirm: () => void;
	confirmText?: string;
	cancelText?: string;
}

const ConfirmDialog = ({
	trigger,
	title,
	description,
	onConfirm,
	confirmText = 'OK',
	cancelText = 'Cancelar',
}: ConfirmDialogProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex">
					<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
						{cancelText}
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							onConfirm();
							setIsDialogOpen(false);
						}}
					>
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmDialog;
