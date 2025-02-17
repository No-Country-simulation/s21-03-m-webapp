import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
	children: React.ReactNode;
	className?: string;
}

const containerVariants = cva('m-auto', {
	variants: {
		variant: {
			large: 'w-[95%]',
			normal: 'w-[90%]',
			small: 'w-[80%]',
			full: 'w-full',
		},
	},
	defaultVariants: {
		variant: 'normal',
	},
});

const Container: React.FC<ContainerProps> = ({ children, variant, className, ...props }) => {
	return (
		<div className={cn(containerVariants({ variant }), className)} {...props}>
			{children}
		</div>
	);
};

export default Container;
