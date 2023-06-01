import React from "react";
import companyinfo from "./rdm.jpg";
import "./quien.css";
//import camara from './camara.jpg';
//import placas from './placas.png';

function Quien() {
	return (
		<div className="d-flex flex-column">
			<div className="wc-image1 m-0 d-flex justify-content-center align-items-center pb-4">
				<img className="wc-image" src={companyinfo} alt="imagen del giro" />
			</div>
			<div className="">
				<div className="pb-3 pt-5">
					<h1 className="text-center">¿Quienes somos?</h1>
				</div>
			</div>
			<div className="container d-flex shadow-lg mb-5 p-3 text">
				<div className="container d-flex justify-content-center align-content-center p-5">
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
			</div>
		</div>
	);
}
//webos al pete

export default Quien;
