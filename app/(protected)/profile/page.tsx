'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthenticationContext';
import ProfileForm from '../../../components/library/forms/ProfileForm';

const ProfilePage = () => {
	const { user } = useAuth();
	return (
		<div className="pt-[4rem] flex flex-col items-center justify-center">
			<Card className="w-full max-w-md p-4 shadow-lg">
				<CardHeader className="text-center">
					<CardTitle className="font-bold text-2xl">Mi Perfil</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-center gap-6">
					<ProfileForm currentUser={user}></ProfileForm>
				</CardContent>
			</Card>
		</div>
	);
};

export default ProfilePage;
