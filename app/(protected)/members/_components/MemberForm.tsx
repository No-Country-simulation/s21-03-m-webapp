'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormSchema, MemberFormData } from '@/schemas/memberSchema';
import { Dispatch, SetStateAction, useEffect, useTransition } from 'react';
import { useCreateMembers } from '@/actions/hooks/members/useCreateMember';
import { Member } from '@/types/member';
import { useEditMembers } from '@/actions/hooks/members/useEditMember';

type MemberFormProps = {
	setOpen: Dispatch<SetStateAction<boolean>>;
	member?: Member;
};

export function MemberForm({ setOpen, member }: MemberFormProps) {
	const [isPending, startTransition] = useTransition();
	const { mutate: createMember } = useCreateMembers();
	const { mutate: editMember } = useEditMembers();
	const form = useForm<MemberFormData>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			rol: '',
		},
	});

	useEffect(() => {
		if (member) {
			form.reset({
				name: member.name || '',
				email: member.email || '',
				password: '',
				rol: member.rol || '',
			});
		}
	}, [form, member]);

	function onSubmit(values: MemberFormData) {
		if (member) {
			const editData = {
				body: values,
				id: member._id,
			};

			startTransition(() => {
				editMember(editData, {
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
		} else {
			startTransition(() => {
				createMember(values, {
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
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-5">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre</FormLabel>
							<FormControl>
								<Input disabled={isPending} placeholder="Nombre" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input disabled={isPending} placeholder="Email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contraseña</FormLabel>
							<FormControl>
								<Input disabled={isPending} placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="rol"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rol</FormLabel>
							<Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Selecciona un Rol" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Cashier">Cajero</SelectItem>
									<SelectItem value="Waiter">Mesero</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="bg-chart-1 hover:bg-orange-300" type="submit">
					{member ? 'Guardar Cambios' : 'Agregar Miembro'}
				</Button>
			</form>
		</Form>
	);
}
