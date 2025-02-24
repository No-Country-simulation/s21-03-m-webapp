'use client';

import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useTransition } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { RegisterFormData, registerFormDefaultValues, registerSchema } from '@/schemas/authenticationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUser } from '@/actions/hooks/authentication/useRegisterUser';
import Link from 'next/link';
import { WEBSITE_ROUTES } from '@/constants/routes';
import { AuthenticationRequest } from '@/types/authentication';

const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const { mutate: register } = useRegisterUser();

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: registerFormDefaultValues,
		mode: 'onBlur',
	});

	function onSubmit(values: AuthenticationRequest) {
		startTransition(() => {
			register(
				{ email: values.email, password: values.password },
				{
					onError: (error) => {
						form.setError('root', {
							type: 'manual',
							message: error.message,
						});
					},
				},
			);
		});
	}
	return (
		<div className="px-10 py-6 bg-card text-card-foreground rounded-md shadow-md forms-max-width">
			<Form {...form}>
				<h1 className="text-center text-4xl font-sans font-semibold">Register</h1>
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
								<FormMessage />
							</FormItem>
						)}
					></FormField>
					{/* Confirmar contraseña */}
					<FormField
						name="confirmPassword"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="label-form-input-text">Confirmar contraseña</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder={'******'}
										type="password"
										className={`form-input-text ${
											form.formState.errors.confirmPassword && 'form-input-text-validation-error'
										}`}
										autoComplete="off"
										disabled={isPending}
									></Input>
								</FormControl>
								<FormMessage className="form-message-validation-error" />
							</FormItem>
						)}
					/>
					{form.formState.errors.root && (
						<FormMessage className="form-response-error">{form.formState.errors.root.message}</FormMessage>
					)}
					{/* Submit Button */}
					<Button type="submit" className="button-fill mt-5" disabled={isPending}>
						Enviar
					</Button>
					<span className="border-b border-black opacity-20 w-full mt-3"></span>
					<div className="flex flex-row gap-1 mt-1 text-sm font-light">
						<p>Ya tienes cuenta?</p>
						<Link href={WEBSITE_ROUTES.LOGIN} className="text-primary">
							Entra!
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default RegisterForm;
