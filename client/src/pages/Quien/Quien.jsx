import React from "react";
import companyinfo from "./rdm.jpg";
//import camara from './camara.jpg';
//import placas from './placas.png';

function Quien() {
	return (
		<div className="container d-flex flex-column">
			<div className="d-flex justify-content-center align-items-center pb-4">
				<img src={companyinfo} alt="imagen del giro" />
			</div>
			<div className="row">
				<div className="col-12 pb-5">
					<h1 className="text-center">¿Quienes somos?</h1>
				</div>
			</div>
			<div className="row shadow-lg mb-5 p-3">
				<div className="col-md-6">
					<p className="text-justify">
						Somos un portal web especializado en el reconocimiento de placas de
						vehículos, ofreciendo una solución inteligente y eficiente para
						identificar y analizar información de matrículas en tiempo real.
						Nuestra plataforma combina tecnologías avanzadas de visión por
						computadora y aprendizaje automático para brindar resultados
						precisos y rápidos. Nuestro objetivo principal es facilitar diversas
						aplicaciones, desde la gestión de estacionamientos y control de
						acceso, hasta la seguridad vial y el seguimiento de vehículos.
						Proporcionamos una interfaz intuitiva y amigable que permite a los
						usuarios cargar imágenes o videos de placas de automóviles para su
						análisis. Además del reconocimiento de placas, ofrecemos
						características adicionales que agregan valor a nuestra plataforma.
					</p>
				</div>
				<div className="col-md-6">
					<p className="text-justify">
						Estas características incluyen la capacidad de almacenar y gestionar
						los datos de las placas reconocidas, generar informes detallados,
						configurar alertas personalizadas y acceder a un historial de
						registros para un análisis más profundo. Valoramos la privacidad y
						la seguridad de los usuarios, por lo que nos aseguramos de cumplir
						con los estándares más altos de protección de datos. Implementamos
						encriptación segura y medidas de anonimización para salvaguardar la
						información sensible. En resumen, somos una solución completa de
						reconocimiento de placas que brinda resultados precisos y
						oportunidades para una amplia gama de aplicaciones. Nos esforzamos
						por simplificar y optimizar los procesos relacionados con la
						identificación de vehículos, permitiendo a nuestros usuarios tomar
						decisiones más informadas y eficientes.
					</p>
				</div>
			</div>
		</div>
	);
}
//webos al pete

export default Quien;
