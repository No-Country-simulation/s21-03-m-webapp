'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LoginFormData, loginFormDefaultValues, loginSchema } from '@/schemas/authenticationSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

const LoginForm = () => {
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: loginFormDefaultValues,
		mode: 'onBlur',
	});
	function onSubmit(values: LoginFormData) {
		console.log(values);
	}
	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="username"
						render={() => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...form.register('username')} />
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
									<Input {...form.register('password')} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
