const User = require("../Models/user.model");

const uploadImage = async (req, res) => {
	console.log("uploadImage");
	const body = req.body;
	const urlimg = req.body.url;
	try {
		const user = await User.findOne({ clave: body.clave });
		if (!user) {
			return res.status(403).json({ message: "User does not exist" });
		}
		//aqui cambiar la url por la que se obtenga de la camara
		await fetch("url aqui", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url: urlimg,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				console.log("--------");
				console.log(json.placa);
				//ponemos la respuesta en mayusculas
				const placa = json.placa.toUpperCase();
				const findPlate = user.placas.find((plate) => plate === placa);

				if (!findPlate) {
					return res.status(200).json({
						message: "$60 pesos",
						placa: placa,
						detectado: false,
					});
				}

				return res.status(200).json({
					message: "$25 pesos",
					placa: placa,
					detectado: true,
				});
			});
	} catch (err) {
		console.log(err);
		return res.status(500).json(false);
	}
};

exports.uploadImage = uploadImage;
