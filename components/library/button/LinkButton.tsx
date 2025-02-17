import Link from 'next/link';
import { Button, ButtonProps } from '../../ui/button';

interface LinkButtonProps extends Omit<ButtonProps, 'asChild'> {
	route: string;
	children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({ route, children, variant, ...props }) => {
	return (
		<Button asChild variant={variant} {...props}>
			<Link href={route}>{children}</Link>
		</Button>
	);
};

export default LinkButton;
