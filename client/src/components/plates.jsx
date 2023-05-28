import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Plates() {
	const [items, setItems] = useState([]);
	const [placa, setPlaca] = useState("");
	const handdlerPlaca = (e) => {
		setPlaca(e.target.value.toUpperCase());
	};
	useEffect(() => {
		const getItems = async () => {
			const url = process.env.REACT_APP_API_URL + "plates/getplates";
			const body = { clave: localStorage.getItem("clave") };
			await axios.post(url, body, { crossDomain: true }).then(function (res) {
				if (res.status === 200) {
					setItems(res.data.plates);
				} else {
					console.log("Error");
				}
			});
		};
		getItems();
	}, []);

	const addPlates = async (e) => {
		e.preventDefault();
		const url = process.env.REACT_APP_API_URL + "plates/addplate";
        console.log(placa);
		const body = {
			clave: localStorage.getItem("clave"),
			placa: placa,
		};

		await axios
			.post(url, body, { crossDomain: true })
			.then(function (response) {
				console.log(response);
				if (response.status === 200) {
					localStorage.setItem("placas", response.data.plates);
					setItems(response.data.plates);
				} else {
					console.log("Error");
				}
			});
	};
	const deletePlates = async (plate) => {
        console.log(plate);
		const url = process.env.REACT_APP_API_URL + "plates/deleteplate";
		const body = {
			clave: localStorage.getItem("clave"),
			placa: plate,
		};
        console.log(body);
		await axios
			.post(url, body, { crossDomain: true })
			.then(function (response) {
                console.log(response.data.plates);
				if (response.status === 200) {
					setItems(response.data.plates);
				} else {
					console.log("Error");
				}
			});
	};

	return (
		<div>
			<form onSubmit={addPlates}>
				<div
					className="container mt-4 mb-5 d-flex justify-content-center"
					style={{ marginTop: "1px" }}>
					<button
						className="btn btn-dark btn-lg"
						id="submit"
						disabled={items.length === 3 || placa.length < 8}>
						Añadir placa
					</button>
				</div>
				<div className="container pb-5">
					<input
						className="form-control"
						type="text"
						placeholder="Ingrese placa"
						name="placa"
						id="placa"
						autoComplete="off"
                        maxLength="8"
                        value={placa}
						onChange={handdlerPlaca}></input>
				</div>
			</form>
			<div className="container">
				<ul className="list-group " id="lista">
					{items.map((item, index) => (
						<li
							className="list-group-item d-flex justify-content-between align-items-center"
							key={index}>
							{item}{" "}
							<FontAwesomeIcon
								icon={faXmark}
								style={{ color: "red" }}
								onClick={()=>{deletePlates(item)}}
                                cursor={"pointer"}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Plates;
