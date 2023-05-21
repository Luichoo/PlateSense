import React from "react";
//import { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

// import './scripts.js';

function Login() {

	const handleSubmit = async (e) => {
		
		e.preventDefault();
		const clave = e.target.clave.value;
		const password = e.target.password.value;
		try {
			console.log("hola");

			const url = process.env.REACT_APP_API_URL+"login";
			console.log(url);
			const body = {
				clave: clave,
				password: password,
			};

			await axios.post(url, body, {crossDomain:true}).then(function (response) {
				if (response.status === 200) {
					window.location.href = "/";

					response.data.token = localStorage.setItem(
						"token",
						response.data.token
					);
					//window.location.href = "/";
					localStorage.setItem("clave", clave);
				} else {
					console.log("Usuario o contraseña incorrectos");
					//document.getElementById('message').innerHTML = 'Usuario o contraseña incorrectos';
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="body">
			<div className="container">
				<div className="container mt-5 bg-primary rounded shadow w-75 mb-5">
					<div className="row align-items-stretch">
						<div className="col bg_img d-none d-lg-block col-md-5 col-lg-5 col-xl-6"></div>
						<div className="col bg-white rounded-end p-4">
							<div className="text-end">
								<h1 className="h1 display-2 p-3">PlateSense©</h1>
							</div>
							<h2 className="text-center py-5 display-6">Login</h2>
							<form onSubmit={handleSubmit}>
								<div className="mb-4">
									<div className="mb-4 form-floating">
										<input
											type="text"
											className="form-control"
											name="clave"
											placeholder="clave ulsa"
											id="clave"
											autoComplete="off"
										/>
										<label htmlFor="clave" className="form-label">
											Clave
										</label>
									</div>
									<div className="mb-4 form-floating">
										<input
											type="password"
											className="form-control"
											name="password"
											placeholder="Password"
											id="password"
											autoComplete="on"
										/>
										<label htmlFor="password" className="form-label">
											Password
										</label>
									</div>
									<span id="message"></span>
									<div className="d-grid justify-content-center align-content-center">
										<button
											type="submit"
											className="btn btn-dark mt-4"
											id="submit">
											Iniciar Sesión
										</button>
									</div>
									<div className="my-3">
										<span>
											You don't have an account?{" "}
											<Link
												to="/register"
												className="text-decoration-none text-info fw-semibold">
												Create one
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

export default Login;
