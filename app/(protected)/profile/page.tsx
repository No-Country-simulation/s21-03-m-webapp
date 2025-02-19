'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/context/AuthenticationContext';
import { Camera, Save } from 'lucide-react';
import Image from 'next/image';

const ProfilePage = () => {
	const { user, updateUser } = useAuth();

	// Datos User
	const [userEmail] = useState(user?.email || '');
	const [role] = useState(user?.role || '');
	// Datos Profile
	const [name, setName] = useState(user?.profile?.name || '');
	const [address, setAddress] = useState(user?.profile?.address || '');
	const [phone, setPhone] = useState(user?.profile?.phone || '');
	const [email, setEmail] = useState(user?.profile?.email || '');

	// Guardar cambios
	const handleSave = () => {
		updateUser({ ...user, name });
		alert('Perfil actualizado con éxito!');
	};

	return (
		<div className="h-[85vh] flex flex-col items-center justify-center">
			<Card className="w-full max-w-md p-4 shadow-lg">
				<CardHeader className="text-center">
					<CardTitle className="font-bold text-2xl">Mi Perfil</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-center gap-6">
					{/* Avatar */}
					<article className="relative w-24 h-24 rounded-full border-2 border-gray-300">
						{/* <Image
							src={avatar || user?.avatar || '/default-avatar.png'}
							alt="Avatar"
							className="w-full h-full object-cover"
						/> */}
						<label className="absolute bottom-0 right-0 bg-destructive text-white p-1 rounded-full cursor-pointer">
							<Camera className="w-5 h-5" />
							<input type="file" className="hidden" accept="image/*" />
						</label>
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
					<article className="w-full flex flex-col gap-4 mt-2">
						<h2 className="font-bold">Mi Restaurante</h2>
						{/* Name */}
						<div className="w-full">
							<label className="block text-sm font-medium">Nombre del establecimiento</label>
							<Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Mi Restaurante" />
						</div>
						{/* Address */}
						<div className="w-full">
							<label className="block text-sm font-medium">Dirección</label>
							<Input
								type="text"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								placeholder="Av. Siempre Viva 123"
							/>
						</div>
						{/* Phone */}
						<div className="w-full">
							<label className="block text-sm font-medium">Teléfono:</label>
							<Input
								type="text"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="+41 00 000 00 00"
							/>
						</div>
						{/* Email */}
						<div className="w-full">
							<label className="block text-sm font-medium">Email:</label>
							<Input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="mi_restaurante@host.com"
							/>
						</div>
					</article>
				</CardContent>

				<CardFooter className="flex justify-center mt-4">
					<Button onClick={handleSave} className="gap-2" variant={'destructive'}>
						<Save className="w-5 h-5" />
						Guardar cambios
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default ProfilePage;
