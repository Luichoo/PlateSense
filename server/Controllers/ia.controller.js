const User = require("../Models/user.model");

const uploadImage = async (req, res) => {
	console.log("uploadImage");
	const body = req.body;
	const url = req.body.url;
	try {
		const user = await User.findOne({ clave: body.clave });
		if (!user) {
			return res.status(403).json({ message: "User does not exist" });
		}
		/*




        */
		const placa = "P85BHW";
		const findPlate = user.placas.find((plate) => plate === placa);
		if (!findPlate) {
			return res
				.status(200)
				.json({
					message: "$60 pesos",
					placa: placa,
                    detectado : false
				});
		}
		return res
			.status(200)
			.json({
				message:  "$25 pesos",
				placa: placa,
                detectado : true
			});
	} catch (err) {
		console.log(err);
		return res.status(500).json(false);
	}
};

exports.uploadImage = uploadImage;
