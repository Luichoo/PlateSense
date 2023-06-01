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
						Portal de detección de placas de vehículos, que permite a los usuarios
						identificar su placa en una base de datos para la entrada a un estacionamiento
						donde en el dado caso de que la placa no se encuentre en la base de datos, se
						hará un cobro de $60 pesos por hora de estancia en el estacionamiento y en dado 
						caso de que si esté en la base de datos, se hará un cobro de $25 pesos por hora.
					</p>
				</div>
			</div>
		</div>
	);
}
//webos al pete

export default Quien;
