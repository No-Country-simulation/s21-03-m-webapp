import { Plus } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from '../../../../components/ui/dialog';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { useCreateSalones } from '../../../../actions/hooks/salones/useCreateSalones';
import { SalonRequest } from '../../../../types/salones';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SalonFormData, salonSchema } from '../../../../schemas/salonSchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form';

const SalonesCreateButton = () => {
	const [open, setOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const { mutate: create } = useCreateSalones();

	const form = useForm<SalonFormData>({
		resolver: zodResolver(salonSchema),
		defaultValues: { name: '' },
		mode: 'onBlur',
	});

	function onSubmit(values: SalonRequest) {
		startTransition(() => {
			create(values, {
				onError: (error) => {
					form.setError('root', {
						type: 'manual',
						message: error.message,
					});
				},
				onSuccess: () => {
					setOpen(false);
				},
			});
		});
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button
					className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-t-xl border border-b-0'bg-white text-gray-600 hover:text-chart-1 }`}
				>
					<Plus></Plus>
				</button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-[95%] m-auto">
						<DialogHeader>
							<DialogTitle>Crea un Salón</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<FormField
							control={form.control}
							name="name"
							render={() => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input
											{...form.register('name')}
											type="text"
											placeholder="Nombre"
											className={`form-input-text ${form.formState.errors.name && 'form-input-text-validation-error'}`}
											autoComplete="off"
											autoFocus={false}
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage className="form-message-validation-error" />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" className="chart-button-1 mt-6">
								Crear
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default SalonesCreateButton;
