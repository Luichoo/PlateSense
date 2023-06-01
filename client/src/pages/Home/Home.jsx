import React, { useState, useCallback, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";

import Webcam from "react-webcam";
//import { useHistory } from "react-router-dom";
import axios from "axios";

import "./Home.css";

import Plates from "../../components/plates.jsx";

import no_img from "./no_img.webp";


function Home() {
	//const history = useHistory();
	const [isActive, setIsActive] = useState(false);
	const [img, setImg] = useState(no_img);
	const [uplimg, setUplimg] = useState(false);
	const webcamRef = useRef(null);
	const [checked, setChecked] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [disabled2, setDisabled2] = useState(false);
	const [islogged, setIslogged] = useState(false);
	const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar si la carga está en curso
	const [placa, setplaca] = useState("");
	const [msj, setMsj] = useState("");

	const videoConstraints = {
		width: 900,
		height: 900,
		facingMode: "user",
	};

	function handlerWCB() {
		setDisabled(!disabled);
	}

	function handlertoggler() {
		setDisabled2(!disabled2);
	}
	function getFile() {
		const imgfile = document.getElementById("img_upload");
		const urlimg = URL.createObjectURL(imgfile.files[0]);
		setImg(urlimg);
	}
	function setfile() {
		const imgfile = document.getElementById("img_upload");
		imgfile.value = null;
	}
	function disablebuttonwc() {
		const toggle = document.getElementById("switch-label");
		if (toggle.checked === true) {
			setChecked(false);
			setDisabled2(true);
			setIsActive(false);
			//setDisabled(false);
		}
	}
	useEffect(() => {
		const fetchLoggedStatus = async () => {
			try {
				const response = await axios.get(
					process.env.REACT_APP_API_URL + "auth/access",
					{
						headers: {
							Authorization: localStorage.getItem("token"),
						},
					}
				);

				if (response.data === true) {
					setIslogged(true);
				} else {
					localStorage.clear();
					setIslogged(false);
				}
			} catch (error) {
				localStorage.clear();
				setIslogged(false);
			} finally {
				setIsLoading(false); // Se establece isLoading en falso una vez que se ha completado la carga
			}
		};

		fetchLoggedStatus();
	}, []);

	const sendurl = async () => {
		const url = process.env.REACT_APP_API_URL + "ia/upload";
		const msjPago = document.getElementById("pago");
		const msjPlaca = document.getElementById("placa");
		const body = {
			url: img,
			clave: localStorage.getItem("clave"),
		};
		try {
			await axios.post(url, body, { crossdomain: true }).then((response) => {
				if (response.data.detectado === true) {
					msjPlaca.className = "text-success pb-2";
					msjPago.className = "text-success pb-3";
				} else {
					msjPlaca.className = "text-danger pb-2";
					msjPago.className = "text-danger pb-3";
				}

				setplaca("Placa detectada: " + response.data.placa);
				setMsj("Pago a realizar: " + response.data.message);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();

		setImg(imageSrc);
	}, [webcamRef]);

	// Si isLoading es verdadero, puedes mostrar un indicador de carga
	if (isLoading) {
		return (
			<div
				className="container d-flex justify-content-center align-content-center "
				style={{ height: "50rem" }}>
				<div className=" spin_div">
					<div
						className="spinner-border"
						role="status"
						style={{ width: "4rem", height: "4rem" }}>
						<span className="sr-only text-center">Loading...</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Container fluid style={{ height: islogged ? "90rem" : "40rem" }}>
			{islogged === false ? (
				<div className="container d-flex flex-column justify-content-center align-content-center h-100">
					<h1 className="h1 display-2 p-3 text-center">PlateSense©</h1>
					<div className="row align-items-stretch">
						<div className="col rounded-end p-4">
							<h2 className="text-center py-5 display-6">
								Inicia sesión para continuar
							</h2>
						</div>
					</div>
				</div>
			) : (
				<div className="d-flex flex-column align-items-center h-100 mt-5">
					<h2 className="mb-3">Bienvenido {localStorage.getItem("clave")}</h2>
					<p className="text-center lead">Pon una placa para comenzar</p>
					<div className="switch-button mb-5">
						<input
							onClick={() => {
								setIsActive(!isActive);
								setChecked(!checked);
								handlerWCB();
							}}
							type="checkbox"
							name="switch-button"
							id="switch-label"
							onChange={() => {}}
							checked={checked}
							className="switch-button__checkbox"
							disabled={disabled2}
						/>
						<label
							htmlFor="switch-label"
							className="switch-button__label"></label>
					</div>

					<div className="container" style={{ maxWidth: "20rem" }}>
						<input
							className="form-control"
							type="file"
							id="img_upload"
							accept="image/*"
							onChange={() => {
								getFile();
								disablebuttonwc();
								setUplimg(true);
							}}
						/>
					</div>

					{uplimg === false ? (
						<>
							<div className=" mt-4 bg-wc1 wc-image">
								{isActive ? (
									<Webcam
										audio={false}
										ref={webcamRef}
										screenshotFormat="image/jpeg"
										videoConstraints={videoConstraints}
										height={338}
										width={600}
										className="wc-image"
									/>
								):(
									<div className="container d-flex align-content-center justify-content-center bg-wc1 mt-4 wc-image">
									<img
										src={img}
										alt="screenshot"
										className="wc-image "
										id="img-plate"
										height={290}
										style={{ aspectRatio: "1 / 1" }}
									/>
								</div>
								)}
							</div>

							<div className="btn-container mt-4 mb-5">
								<button
									onClick={() => {
										capture();
										handlertoggler();
										disablebuttonwc();
										setUplimg(true);
									}}
									className="btn btn-dark btn-lg"
									id="submit"
									disabled={!disabled}>
									Captura
								</button>
							</div>
						</>
					) : (
						<>
							<div className="container d-flex align-content-center justify-content-center bg-wc1 mt-4 wc-image">
								<img
									src={img}
									alt="screenshot"
									className="wc-image "
									id="img-plate"

									style={{ maxHeight: "100%", aspectRatio: "1 / 1" }}
								/>
							</div>
							<div className="container d-flex justify-content-around btn-container">
								<div
									className="btn-container mt-4 mb-5 me-1"
									style={{ marginTop: "1px" }}>
									<button
										onClick={() => {
											setImg(no_img);
											setfile();
											setUplimg(false);
											handlertoggler();
											setDisabled2(false);
											setDisabled(false);
											//}//
										}}
										className="btn btn-dark btn-lg"
										id="submit">
										Repetir foto
									</button>
								</div>
								<div
									className="btn-container mt-4 mb-5"
									style={{ marginTop: "1px" }}>
									<button
										onClick={() => {
											// setImg(null);
											// setfile();
											// if (!checked){
											//   setChecked(!checked)
											sendurl();
											// }
											//funcion para mandar la foto a la api de google
											// handlertoggler();
											//}//
										}}
										className="btn btn-dark btn-lg"
										id="submit">
										Enviar placa
									</button>
								</div>
							</div>
						</>
					)}
					<div
						className="container d-flex flex-column  bg-white rounded-5 mb-5 shadow-lg"
						style={{ visibility: placa===""? "hidden":"visible",maxWidth:"25rem"}}>
						<div className="align-self-center pt-3">
							<h4 className="pb-2" id="placa">
								{placa}
							</h4>
							<h4 className="pb-3" id="pago">
								{msj}
							</h4>
						</div>
					</div>
					<Plates />
				</div>
			)}
		</Container>
	);
}

export default Home;
