import React, { useState } from "react";
import "./register.css";
import axios from "axios";
//import { useState } from 'react';
// import './scripts.js';
import { Link, useNavigate } from "react-router-dom";

function Register() {
	const Navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [clavef, setClave] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [existe, setExiste] = useState(false);

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		setPasswordMatch(event.target.value === confirmPassword);
	};
	const handleClaveChange = (event) => {
		setExiste(false);
		setClave(event.target.value);
	};

	const handleConfirmPasswordChange = (event) => {
		setConfirmPassword(event.target.value);
		setPasswordMatch(event.target.value === password);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const clave = e.target.clave.value;
		const password = e.target.password.value;
		try {
			console.log("hola");

			const url = process.env.REACT_APP_API_URL + "auth/register";
			console.log(url);
			const body = {
				clave: clave,
				password: password,
			};

			await axios
				.post(url, body, { crossDomain: true })
				.then(function (response) {
					console.log(response);
					if (response.status === 201) {
						Navigate("/");

						response.data.token = localStorage.setItem(
							"token",
							response.data.token
						);
						//window.location.href = "/";
						localStorage.setItem("clave", clave);
						localStorage.setItem("placas", response.data.placas);
					} else {
						setExiste(true);
						//document.getElementById('message').innerHTML = 'Usuario o contraseña incorrectos';
					}
				});
		} catch (err) {
			console.log(err);
			setExiste(true);
		}
	};
	return (
		<div className="body">
			<div className="container">
				<div className="container mt-5 bg-primary rounded shadow w-75 mb-5">
					<div className="row align-items-stretch">
						<div className="col bg_img d-none d-lg-block col-md-5 col-lg-5 col-xl-6"></div>
						<div className="col bg-white rounded-end p-3">
							<div className="text-end">
								<h1 className="h1 display-2 p-3">PlateSense©</h1>
							</div>
							<h2 className="text-center py-5 display-6">Register</h2>
							<form onSubmit={handleSubmit}>
								<div className="mb-4">
									<div className="mb-4 form-floating">
										<input
											type="text"
											className="form-control"
											name="clave"
											placeholder="clave"
											id="clave"
											autoComplete="off"
											onChange={handleClaveChange}
										/>
										<label htmlFor="clave" className="form-label">
											clave
										</label>
									</div>
									{existe ? (
										<div className="container pb-3">
											<span id="message" className="text-danger text-center">
												El nombre de usuario ya existe
											</span>
										</div>
									) : (
										""
									)}
									<div className="mb-4 form-floating ">
										<input
											type="password"
											className="form-control"
											name="password"
											placeholder="Password"
											id="password"
											autoComplete="off"
											onChange={handlePasswordChange}
										/>
										<label htmlFor="password" className="form-label">
											Contraseña
										</label>
									</div>
									<div className="mb-4 form-floating">
										<input
											type="password"
											className="form-control"
											name="confirm-password"
											placeholder="Repeat Password"
											id="password2"
											autoComplete="off"
											onChange={handleConfirmPasswordChange}
										/>
										<label htmlFor="password2" className="form-label">
											Repite Contraseña
										</label>
									</div>
									{password.length < 5 && password !== "" ? (
										<span id="message" className="text-danger">
											La contraseña debe de ser de al menos 5 caracteres
										</span>
									) : !passwordMatch ? (
										<span id="message" className="text-danger">
											Las contraseñas no coinciden
										</span>
									) : (
										password !== "" &&
										confirmPassword !== "" &&
										password === confirmPassword && (
											<span id="message" className="text-success">
												Las contraseñas coinciden
											</span>
										)
									)}
									<div className="d-grid justify-content-center align-content-center">
										<button
											type="submit"
											className="btn btn-dark mt-4"
											disabled={
												password.length < 5 || !passwordMatch || clavef === ""
											}
											id="submit">
											Iniciar Sesión
										</button>
									</div>
									<div className="my-3">
										<span>
											Already with an account?{" "}
											<Link
												to="/login"
												className="text-decoration-none text-info fw-semibold">
												Login
											</Link>
										</span>
									</div>
									<div className="my-3 text-center">
										<span>
											<Link
												to="/"
												className="text-decoration-none text-info fw-semibold">
												Go back
											</Link>
										</span>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
