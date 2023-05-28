import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


function Plates() {
	const [items, setItems] = useState([]);
	const [placa, setPlaca] = useState("");
    const [mensaje, setMensaje] = useState("");
    
const handdlerMsj = (e,tipo) => {
    const msj = document.getElementById("msj");
    if(tipo === 1){
        msj.className = "text-success text-center"
    }else{
    msj.className = "text-danger text-center"
    }
    setMensaje(e);

};


	const handdlerPlaca = (e) => {
        setMensaje("");
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
				if (response.status === 201) {
					localStorage.setItem("placas", response.data.plates);
					setItems(response.data.plates);
                    handdlerMsj(response.data.message,1);
				} else if (response.status === 200) {
                    console.log(response.data.message);
                    handdlerMsj(response.data.message,2);
				}
               
			});

	};
	const deletePlates = async (plate) => {
		const url = process.env.REACT_APP_API_URL + "plates/deleteplate";
		const body = {
			clave: localStorage.getItem("clave"),
			placa: plate,
		};
		await axios
			.post(url, body, { crossDomain: true })
			.then(function (response) {
				if (response.status === 200) {
					setItems(response.data.plates);
				} else {
					console.log("Error");

				}
                handdlerMsj(response.data.message,2);
			});
	};

	return (
		<div className="bg-white ps-5 pe-5 pb-3 pt-3 mb-5 rounded-top-circle shadow-lg">
			<form onSubmit={addPlates}>
				<div
					className="container mt-4 mb-5 d-flex justify-content-center"
					style={{ marginTop: "1px" }}>
					<button
						className="btn btn-dark btn-lg"
						id="submit"
						disabled={items.length === 3 || placa.length < 6}>
						Añadir placa
					</button>
				</div>

				<div className="container pb-3">
					<input
						className="form-control"
						type="text"
						placeholder="Ingrese placa (max 3)"
						name="placa"
						id="placa"
						autoComplete="off"
                        maxLength="8"
                        value={placa}
						onChange={handdlerPlaca}></input>
				</div>
                <div className="Container d-flex flex-column justify-content-center  align-content-center" >
                    <p className="text-danger text-center " style={{fontWeight:"bold"}} id="msj">{mensaje}</p>
                </div>
			</form>
			<div className="container mb-5">
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
