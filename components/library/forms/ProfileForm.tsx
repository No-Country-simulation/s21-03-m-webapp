'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react';
import { Button } from '../../ui/button';
import { ProfileFormData, profileSchema } from '../../../schemas/profileSchema';
import { Camera, Save } from 'lucide-react';
import { User } from '../../../types/authentication';
import { useUpdateProfile } from '../../../actions/hooks/profile/useUpdateProfile';
import Image from 'next/image';

const ProfileForm = ({ currentUser }: { currentUser: User | null }) => {
	const [isPending, startTransition] = useTransition();
	const { mutate: update } = useUpdateProfile();
	const [selectedImage, setSelectedImage] = useState<File | null>(null);

	// Datos User
	const [userEmail] = useState(currentUser?.email || '');
	const [role] = useState(currentUser?.role || '');

	const form = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: currentUser?.profile?.name || '',
			address: currentUser?.profile?.address || '',
			phone: currentUser?.profile?.phone || '',
			email: currentUser?.profile?.email || '',
		},
		mode: 'onBlur',
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedImage(event.target.files?.[0] || null);
	};

	function onSubmit(values: ProfileFormData) {
		startTransition(() => {
			const formData = new FormData();
			if (selectedImage) {
				formData.append('image', selectedImage);
			}
			formData.append('name', values.name);
			formData.append('address', values.address);
			formData.append('phone', values.phone);
			formData.append('email', values.email);
			update(formData, {
				onError: (error) => {
					form.setError('root', {
						type: 'manual',
						message: error.message.split('').join('\n'),
					});
				},
			});
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full flex flex-col justify-center items-center gap-4 mt-6"
			>
				{/* Avatar */}
				<article className="relative w-24 h-24 rounded-full border-2 border-gray-300">
					<FormField
						name="image"
						control={form.control}
						render={({}) => {
							const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : currentUser?.profile.logo;
							return (
								<FormItem className="w-full h-full bg-gray-300 overflow-hidden rounded-full">
									<FormControl>
										<div>
											{/* Contenedor de la imagen */}
											<div className="w-auto h-24">
												{imageUrl && (
													<Image
														src={imageUrl}
														alt="Preview"
														width={0}
														height={0}
														className="w-full h-full object-cover"
														priority // Carga la imagen de inmediato
														loading={'eager'} // Las demás, con carga diferida
														quality={75} // Reduce el peso de las imágenes sin perder mucha calidad
													/>
												)}
											</div>
											<div className="absolute bottom-0 right-0 bg-chart-1 text-white  p-1 rounded-full cursor-pointer">
												<Camera className="w-5 h-5" />
												<Input
													type="file"
													className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
													onChange={handleFileChange}
													disabled={isPending}
												/>
											</div>
										</div>
									</FormControl>
									<FormMessage className="form-message-validation-error" />
								</FormItem>
							);
						}}
					/>
				</article>

				<article className="w-full flex flex-col gap-4">
					{/* ===== USER ==== */}
					{/* User Email */}
					<div className="w-full">
						<label className="block text-sm font-medium">Email del usuario</label>
						<Input type="email" value={userEmail} disabled className="bg-gray-100 cursor-not-allowed" />
					</div>
					{/* User Role (No editable) */}
					<div className="w-full">
						<label className="block text-sm font-medium">Rol del usuario</label>
						<Input type="text" value={role} disabled className="bg-gray-100 cursor-not-allowed" />
					</div>
				</article>

				{/* ===== Profile ==== */}
				<article className="w-full flex flex-col gap-3 mt-2">
					<h2 className="font-bold">Mi Restaurante</h2>
					{/* Name */}
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
										placeholder="Mi Restaurante"
										className={`form-input-text ${form.formState.errors.name && 'form-input-text-validation-error'}`}
										autoComplete="off"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage className="form-message-validation-error" />
							</FormItem>
						)}
					/>
					{/* Address */}
					<FormField
						control={form.control}
						name="address"
						render={() => (
							<FormItem>
								<FormLabel>Dirección</FormLabel>
								<FormControl>
									<Input
										{...form.register('address')}
										type="text"
										placeholder="Av. Maipu 123"
										className={`form-input-text ${form.formState.errors.address && 'form-input-text-validation-error'}`}
										autoComplete="off"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage className="form-message-validation-error" />
							</FormItem>
						)}
					/>
					{/* Phone */}
					<FormField
						control={form.control}
						name="phone"
						render={() => (
							<FormItem>
								<FormLabel>Teléfono</FormLabel>
								<FormControl>
									<Input
										{...form.register('phone')}
										type="text"
										placeholder="+41 00 000 00 00"
										className={`form-input-text ${form.formState.errors.phone && 'form-input-text-validation-error'}`}
										autoComplete="off"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage className="form-message-validation-error" />
							</FormItem>
						)}
					/>
					{/* Email */}
					<FormField
						control={form.control}
						name="email"
						render={() => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...form.register('email')}
										type="text"
										placeholder="mi_restaurante@email.com"
										className={`form-input-text ${form.formState.errors.email && 'form-input-text-validation-error'}`}
										autoComplete="off"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage className="form-message-validation-error" />
							</FormItem>
						)}
					/>
				</article>
				{form.formState.errors.root && (
					<FormMessage className="form-response-error whitespace-pre-line">
						{form.formState.errors.root.message}
					</FormMessage>
				)}
				<Button type="submit" className="gap-2 mt-6 chart-button-1">
					<Save className="w-5 h-5" />
					Guardar cambios
				</Button>
			</form>
		</Form>
	);
};

export default ProfileForm;
