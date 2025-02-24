import { useState, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useUpdateSalon } from '@/actions/hooks/salones/useUpdateSalon';
import { Salon } from '@/types/salones';
import { ConfirmDialog } from '@/components/library/dialog';

const SalonesName = ({ salon, onDelete }: { salon: Salon; onDelete: (id: string) => void }) => {
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
		<>
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
						<ConfirmDialog
							trigger={
								<span className="ml-2 cursor-pointer underline text-xs transition text-nowrap hover:text-destructive">
									Borrar Salón
								</span>
							}
							title={'Borrar Salón'}
							description={`Estás por eliminar el salón: ${name}. ¿Seguro que quieres continuar?`}
							onConfirm={() => {
								onDelete(salon._id);
							}}
						></ConfirmDialog>
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
		</>
	);
};

export default SalonesName;
