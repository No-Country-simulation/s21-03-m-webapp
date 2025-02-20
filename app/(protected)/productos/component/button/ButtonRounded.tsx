import { PencilIcon, Plus } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';

export const ButtonsRounded = () => {
	return (
		<Button className="bg-blue-500 hover:bg-blue-600 rounded-full aspect-square size-8">
			<PencilIcon className="text-2xl" />
		</Button>
	);
};
