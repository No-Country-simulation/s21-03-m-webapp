import Image from 'next/image';
import Link from 'next/link';
import { WEBSITE_ROUTES } from '../../constants/routes';

const HomePage = () => {
	return (
		<div className="flex flex-col items-center">
			<div className="h-[75vh] md:h-[70vh] lg:h-[68vh] min-h-[550px] flex flex-col items-center justify-center text-center gap-6">
				{/* Encabezado */}
				<h1 className="text-4xl font-bold md:text-5xl">
					Optimiza la gestión de tu restaurante con <span className="text-primary">Mesa 360</span>
				</h1>
				<p className="text-lg md:text-xl max-w-2xl text-muted-foreground">
					El sistema POS definitivo para restaurantes en Argentina. Controla mesas, pedidos y empleados en tiempo real.
				</p>
				{/* Hero/Imagen o Ilustración */}
				<div className="w-full flex justify-center mt-8">
					<div className="relative w-full h-64 md:h-70 lg:h-[22rem]">
						<Image
							src="https://images.pexels.com/photos/6612691/pexels-photo-6612691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
							alt="Hero Image"
							width={0}
							height={0}
							priority // Carga la imagen de inmediato
							loading={'eager'} // Las demás, con carga diferida
							quality={75} // Reduce el peso de las imágenes sin perder mucha calidad
							className="w-full h-full object-cover rounded-md shadow-lg"
						/>
					</div>
				</div>
			</div>

			{/* Sección de Beneficios */}
			<div className="flex flex-col items-center gap-[2rem] sm:gap-[5rem]">
				<div className="w-full max-w-6xl mt-16 flex flex-col items-center gap-10">
					<h2 className="text-3xl font-semibold text-center">¿Por qué elegir Mesa 360?</h2>
					<div className="flex flex-col md:flex-row gap-8 justify-center">
						{/* Tarjeta 1 */}
						<div className="max-w-sm p-6 bg-card text-card-foreground rounded-md shadow-md">
							<h3 className="text-xl font-semibold">Mapa Interactivo de Mesas</h3>
							<p className="text-sm mt-2 text-muted-foreground">
								Crea y gestiona un mapa en tiempo real para optimizar el espacio de tu restaurante.
							</p>
						</div>
						{/* Tarjeta 2 */}
						<div className="max-w-sm p-6 bg-card text-card-foreground rounded-md shadow-md">
							<h3 className="text-xl font-semibold">Pedidos Sin Errores</h3>
							<p className="text-sm mt-2 text-muted-foreground">
								Envía comandas en tiempo real a cocina y minimiza errores en los pedidos.
							</p>
						</div>
						{/* Tarjeta 3 */}
						<div className="max-w-sm p-6 bg-card text-card-foreground rounded-md shadow-md">
							<h3 className="text-xl font-semibold">Gestión de Empleados</h3>
							<p className="text-sm mt-2 text-muted-foreground">
								Define roles y permisos para meseros, cajeros y administradores.
							</p>
						</div>
					</div>
				</div>

				{/* CTA Principal */}
				<div className="w-full max-w-4xl mt-16 text-center">
					<h2 className="text-3xl font-semibold mb-4">¡Únete a Mesa 360 Hoy Mismo!</h2>
					<p className="text-muted-foreground mb-8">
						Regístrate ahora y empieza a mejorar la administración de tu restaurante en minutos.
					</p>
					<div>
						<Link
							href={WEBSITE_ROUTES.REGISTER}
							className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
						>
							Crear Cuenta Gratis
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
