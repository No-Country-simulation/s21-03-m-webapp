import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';
import { useUpdateSalon } from '@/actions/hooks/salones/useUpdateSalon';
import { Salon } from '@/types/mesas';

const SalonesName = ({ salon }: { salon: Salon }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(salon.name);
	const [tempName, setTempName] = useState(salon.name);
	const inputRef = useRef<HTMLInputElement>(null);
	const { mutate: updateSalon } = useUpdateSalon();

	const handleSave = () => {
		if (tempName.trim() !== '') {
			setName(tempName);
			updateSalon(
				{ id: salon._id, name: tempName },
				{
					onError: () => {
						setName(name);
					},
				},
			);
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setTempName(name);
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') handleSave();
		if (e.key === 'Escape') handleCancel();
	};

	return (
		<article className="pb-4 flex items-center gap-2">
			{isEditing ? (
				<div className="flex items-center gap-3">
					<Input
						ref={inputRef}
						type="text"
						value={tempName}
						onChange={(e) => setTempName(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<span onClick={handleSave} className="cursor-pointer text-green-600 hover:text-green-800 transition">
						<Check size={24} />
					</span>
					<span onClick={handleCancel} className="cursor-pointer text-destructive hover:text-red-600 transition">
						<X size={24} />
					</span>
					<span className="ml-6 cursor-pointer underline text-xs transition text-nowrap hover:text-destructive">
						Borrar Salon
					</span>
				</div>
			) : (
				<span
					onClick={() => setIsEditing(true)}
					className="cursor-pointer transition hover:underline text-2xl font-bold flex items-center gap-2"
				>
					{name}
				</span>
			)}
		</article>
	);
};

export default SalonesName;
