import { PencilIcon, Plus } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';

const StyleSquare = 'rounded-full aspect-square size-8';

export const buttonEdit = (
	<Button className={`bg-blue-500 hover:bg-blue-600 ${StyleSquare}`}>
		<PencilIcon className="text-2xl" />
	</Button>
);
export const buttonAdd = (
	<Button className={`bg-green-500 hover:bg-green-600 ${StyleSquare}`}>
		<Plus className="" />
	</Button>
);

export const buttonEditNav = (
	<Button className="rounded-full aspect-square size-8" variant={'secondary'}>
		<PencilIcon className="text-2xl" />
	</Button>
);
export const buttonAddNav = (
	<Button className="rounded-full aspect-square size-8" variant={'secondary'}>
		<Plus className="" />
	</Button>
);