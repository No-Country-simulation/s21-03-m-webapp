'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LoginFormData, loginFormDefaultValues, loginSchema } from '@/schemas/authenticationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useLoginUser } from '../../../actions/hooks/useLoginUser';
import { useTransition } from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { WEBSITE_ROUTES } from '../../../constants/routes';
import { AuthenticationRequest } from '../../../types/authentication';

const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const { mutate: login } = useLoginUser();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: loginFormDefaultValues,
		mode: 'onBlur',
	});

	function onSubmit(values: AuthenticationRequest) {
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
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
					<FormField
						control={form.control}
						name="email"
						render={() => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...form.register('email')}
										type="text"
										placeholder="Email"
										className={`form-input-text ${form.formState.errors.email && 'form-input-text-validation-error'}`}
										autoComplete="off"
										disabled={isPending}
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
										type="password"
										placeholder={'******'}
										className={`form-input-text ${form.formState.errors.password && 'form-input-text-validation-error'}`}
										autoComplete="off"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage className="form-message-validation-error" />
							</FormItem>
						)}
					></FormField>
					{form.formState.errors.root && (
						<FormMessage className="form-response-error">{form.formState.errors.root.message}</FormMessage>
					)}
					{/* Submit Button */}
					<Button type="submit" className="button-fill mt-5" disabled={isPending}>
						Iniciar Sesión
					</Button>
					<span className="border-b border-black opacity-20 w-full mt-3"></span>
					<div className="flex flex-row gap-1 mt-1 text-sm font-light">
						<p>No tienes cuenta?</p>
						<Link href={WEBSITE_ROUTES.REGISTER} className="text-primary">
							Registrate!
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
