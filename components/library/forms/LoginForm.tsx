'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LoginFormData, loginFormDefaultValues, loginSchema } from '@/schemas/authenticationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useLoginUser } from '../../../actions/hooks/useLoginUser';
import { useTransition } from 'react';
import { Button } from '../../ui/button';

const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const { mutate: login } = useLoginUser();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: loginFormDefaultValues,
		mode: 'onBlur',
	});

	function onSubmit(values: LoginFormData) {
		startTransition(() => {
			login(values, {
				onError: (error) => {
					form.setError('root', {
						type: 'manual',
						message: error.message,
					});
				},
			});
		});
	}

	return (
		<div className="max-w-[550px]">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="username"
						render={() => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...form.register('username')} disabled={isPending} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={() => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...form.register('password')} disabled={isPending} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
