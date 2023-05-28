const User = require('../Models/user.model');

const addPlate = async(req, res, next) => {
    console.log('addPlate');
    const { body } = req;
    try {
        const user = await User.findOne({ clave: body.clave });
        if (!user) {
            return res.status(403).json({ message: 'User does not exist' });
        }
        console.log('user: ' + user);
        //buscar dentro de la lista del esquema si la placa existe
        const isPlate = user.placas.find(plate => plate === body.placa);
        if (isPlate) {
            return res.status(403).json({ message: 'Plate already exists' });
        }
        //agregar la placa a la lista del esquema
        if (user.placas.length >= 3) {
            return res.status(403).json({ message: 'Solo puedes meter hasta 3 placas' });
        }
        user.placas.push(body.placa);
        //guardar el usuario
        await user.save();
        res.status(200).json({ plates: user.placas });
    } catch (err) {
        res.status(500).send(err.message);
    }

}
const getPlates = async(req,res,next) =>{
    console.log('getPlates')
    const {body} = req
    console.log(body.clave)
    try{
        const user = await User.findOne({ clave: body.clave });
        if (!user) {
            console.log('User does not exist')
            return res.status(403).json({ message: 'User does not exist' });
        }
        if(user.placas){
            console.log('user: ' + user)
            return res.status(200).json({plates: user.placas})
        }
        return res.status(200).json(false)
    }
    catch(err){
        console.log(err)
        
        return res.status(500).json(false)
    }
}

const deletePlate = async(req, res, next) => {
    console.log('deletePlate');
    const { body } = req;
    try {
        const user = await User.findOne({ clave: body.clave });
        if (!user) {
            return res.status(403).json({ message: 'User does not exist' });
        }
        console.log('user: ' + user);
        //buscar dentro de la lista del esquema si la placa existe
        const isPlate = user.placas.find(plate => plate === body.placa);
        if (!isPlate) {
            return res.status(403).json({ message: 'Plate does not exist' });
        }
        //elimina la placa que recibe del body.placa de la lista del esquema
        user.placas = user.placas.filter(plate => plate !== body.placa);


        //guardar el usuario
        await user.save();
        console.log('user: ' + user);
        res.status(200).json({ plates: user.placas });
    } 
    catch (err) {
        res.status(500).send(err.message);
    }
}

exports.addPlate = addPlate;
exports.deletePlate = deletePlate;
exports.getPlates = getPlates;