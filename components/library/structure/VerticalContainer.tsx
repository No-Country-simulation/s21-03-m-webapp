import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface VerticalContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
	children: React.ReactNode;
	className?: string;
}

const containerVariants = cva('m-auto', {
	variants: {
		escape: {
			all: 'pt-[6rem] pb-[8rem]',
			navbar: 'pt-[6rem]',
			footer: 'pb-[8rem]',
		},
	},
	defaultVariants: {
		escape: 'navbar',
	},
});

const VerticalContainer: React.FC<VerticalContainerProps> = ({ children, escape, className, ...props }) => {
	return (
		<div className={cn(containerVariants({ escape }), className)} {...props}>
			{children}
		</div>
	);
};

export default VerticalContainer;
