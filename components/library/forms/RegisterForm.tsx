'use client';

import { Form, useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { useTransition } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { RegisterFormData, registerFormDefaultValues, registerSchema } from '../../../schemas/authenticationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUser } from '../../../actions/hooks/useRegisterUser';

const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const { mutate: register } = useRegisterUser();

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: registerFormDefaultValues,
		mode: 'onBlur',
	});

	function onSubmit(values: RegisterFormData) {
		startTransition(() => {
			register(values, {
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
		<div>
			<Form {...form}>
				<h1 className="text-center text-4xl font-sans font-semibold">Login</h1>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="name"
						render={() => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...form.register('name')} disabled={isPending} />
								</FormControl>
								<FormMessage className="" />
							</FormItem>
						)}
					></FormField>
					<FormField
						control={form.control}
						name="email"
						render={() => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...form.register('email')} disabled={isPending} />
								</FormControl>
								<FormMessage className="" />
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
									<Input {...form.register('password')} disabled={isPending} type="password" />
								</FormControl>
								<FormMessage />
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

export default RegisterForm;
