import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { IoIosCafe } from 'react-icons/io';
import { CategoryData } from '../../types/products';
import { Button } from '../../../../../components/ui/button';
import { Pencil, PencilIcon, Plus } from 'lucide-react';
import { ButtonsRounded } from '../button/ButtonRounded';
import { Modal } from '../modal/Modal';
interface Props {
	categories?: CategoryData[] | typeof mockCategories;
}
export const mockCategories = [
	{
		id: 1,
		name: 'Alimentos',
		subcategories: [
			{ id: 11, name: 'Platos Principales' },
			{ id: 12, name: 'Entrantes' },
			{ id: 13, name: 'Guarniciones' },
		],
	},
	{
		id: 2,
		name: 'Bebidas',
		subcategories: [
			{ id: 21, name: 'Refrescos' },
			{ id: 22, name: 'Aguas' },
			{ id: 23, name: 'Jugos' },
		],
	},
	{
		id: 3,
		name: 'Postres',
		subcategories: [
			{ id: 31, name: 'Tartas' },
			{ id: 32, name: 'Helados' },
		],
	},
];
const buttonEdit = (
	<Button className="rounded-full aspect-square size-8" variant={'secondary'}>
		<PencilIcon className="text-2xl" />
	</Button>
);
const buttonAdd = (
	<Button className="rounded-full aspect-square size-8" variant={'secondary'}>
		<Plus className="" />
	</Button>
);
export const NavFilter = ({ categories = mockCategories }: Props) => {
	return (
		<div>
			<Menubar className="bg-primary text-white justify-evenly">
				{categories?.map((categorie) => (
					<MenubarMenu key={categorie.id}>
						<MenubarTrigger>{categorie.name}</MenubarTrigger>
						<MenubarContent key={categorie.id}>
							{categorie.subcategories.map((sub) => (
								<MenubarItem key={sub.id} className="hover:cursor-pointer">
									<IoIosCafe className="mr-2"></IoIosCafe>
									{sub.name}
								</MenubarItem>
							))}
						</MenubarContent>
					</MenubarMenu>
				))}
				{/* <MenubarSeparator></MenubarSeparator> */}

				<div className="gap-2 flex"></div>
			</Menubar>
		</div>
	);
};
