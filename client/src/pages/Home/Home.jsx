import React, { useState, useCallback, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Webcam from "react-webcam";
//import { useHistory } from "react-router-dom";
import axios from "axios";
import "./scripts.js";
import "./Home.css";

function Home() {
	//const history = useHistory();
	const [isActive, setIsActive] = useState(false);
	const [img, setImg] = useState(null);
	const webcamRef = useRef(null);
	const [checked, setChecked] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [disabled2, setDisabled2] = useState(false);
	const [islogged, setIslogged] = useState(false);
	const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar si la carga está en curso
	const videoConstraints = {
		width: 1280,
		height: 720,
		facingMode: "user",
	};

	function handlerWCB() {
		setDisabled(!disabled);
	}

	function handlertoggler() {
		setDisabled2(!disabled2);
		console.log(disabled2);
	}
	function getFile() {
		console.log("getfile");
		const imgfile = document.getElementById("img_upload");
		const urlimg = URL.createObjectURL(imgfile.files[0]);
		setImg(urlimg);
	}
	function setfile() {
		console.log("setfile");
		const imgfile = document.getElementById("img_upload");
		imgfile.value = null;
	}
	function disablebuttonwc() {
		console.log("disablebuttonwc");
		const imgfile = document.getElementById("img_upload");
		const toggle = document.getElementById("switch-label");
    console.log(toggle.checked);
		if (toggle.checked!==false && imgfile.value !== null) {
			setChecked(!checked)
			setDisabled2(!disabled2);
		}
	}
	useEffect(() => {
		const fetchLoggedStatus = async () => {
			try {
				const response = await axios.get(
					process.env.REACT_APP_API_URL + "access",
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

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImg(imageSrc);
	}, [webcamRef]);

	// Si isLoading es verdadero, puedes mostrar un indicador de carga
	if (isLoading) {
		return (
			<div
				className="container-fluid d-flex flex-column justify-content-center align-content-center"
				style={{ height: "50rem" }}>
				<h1 className="h1 display-2 p-3 text-center">Cargando...</h1>
			</div>
		);
	}

	return (
		<Container fluid style={{ height: "50rem" }}>
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
				<div className="d-flex flex-column justify-content-center align-items-center h-100 mt-5">
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
							}}
						/>
					</div>
					{img === null ? (
						<>
							<div className="cam-container mt-4 bg-wc wc-image">
								{isActive && (
									<Webcam
										audio={false}
										ref={webcamRef}
										screenshotFormat="image/jpeg"
										videoConstraints={videoConstraints}
										height={338}
										width={600}
										className="wc-image"
									/>
								)}
							</div>

							<div className="btn-container mt-4 mb-5">
								<button
									onClick={() => {
										capture();
										handlertoggler();
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
							<div className="container d-flex align-content-center justify-content-center bg-wc mt-4 wc-image">
								<img
									src={img}
									alt="screenshot"
									className="wc-image "
									height={338}
									width={600}
									style={{ maxHeight: "100%" }}
								/>
							</div>
							<div className="container d-flex justify-content-around btn-container">
								<div
									className="btn-container mt-4 mb-5"
									style={{ marginTop: "1px" }}>
									<button
										onClick={() => {
											setImg(null);
											setfile();
											//if (!checked){
											handlertoggler();
											//}//
										}}
										className="btn btn-dark btn-lg"
										id="submit">
										Repetir
									</button>
								</div>
								<div
									className="btn-container mt-4 mb-5"
									style={{ marginTop: "1px" }}>
									<button
										onClick={() => {
											setImg(null);
											setfile();
											//if (!checked){
											handlertoggler();
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
				</div>
			)}
		</Container>
	);
}

export default Home;
