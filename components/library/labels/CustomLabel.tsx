import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof labelVariants> {
	children: React.ReactNode;
	className?: string;
}

const labelVariants = cva('m-auto', {
	variants: {
		variant: {
			red: 'bg-red-500 text-white',
			blue: 'bg-blue-500 text-white',
			green: 'bg-green-500 text-white',
		},
	},
	defaultVariants: {
		variant: 'red',
	},
});

const CustomLabel = ({ children, variant, className, ...props }: Props) => {
	return (
		<span className={cn(labelVariants({ variant }), className)} {...props}>
			{children}
		</span>
	);
};

export default CustomLabel;
