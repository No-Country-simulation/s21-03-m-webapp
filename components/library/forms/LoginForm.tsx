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
		<div className="px-10 py-6 bg-card text-card-foreground rounded-md shadow-md forms-max-width">
			<Form {...form}>
				<h1 className="text-center text-4xl font-sans font-semibold">Login</h1>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="email"
						render={() => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...form.register('email')}
										disabled={isPending}
										className={`form-input-text ${form.formState.errors.email && 'form-input-text-validation-error'}`}
									/>
								</FormControl>
								<FormMessage className="form-message-validation-error" />
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
									<Input
										{...form.register('password')}
										disabled={isPending}
										type="password"
										className={`form-input-text ${form.formState.errors.password && 'form-input-text-validation-error'}`}
									/>
								</FormControl>
								<FormMessage className="form-message-validation-error" />
							</FormItem>
						)}
					></FormField>
					<Button className="w-fit m-auto" type="submit">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
