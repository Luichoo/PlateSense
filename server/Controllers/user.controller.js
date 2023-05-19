const Users = require('../Models/user.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signToken = (_id) => jwt.sign({ _id }, process.env.SECRET_TOKEN);

const mongostring = process.env.MONGOurl;

mongoose.set('strictQuery', true);
const db = () =>{
    mongoose.connect(mongostring, (err) => {
        if (err) {
            console.log('Error connecting to MongoDB');
        } else {
            console.log('Connected to MongoDB');
        }
    });
}

const validateJwt = (req, res, next) => {
    // Obtén el token de la cabecera de autorización
    const token = req.header('Authorization');
    console.log('token: ' + token);
    if (!token) {
      return res.status(401).json(false);
    }
  
    try {
      // Verificar y decodificar el token
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      console.log(JSON.stringify(decoded, null, 2));
      // Agregar el objeto decodificado al objeto de solicitud para usarlo en las rutas siguientes
      req.user = decoded;
        console.log('req.user: ' + req.user);
      // Continuar con el siguiente middleware o ruta
      next();
    } catch (error) {
      return res.status(401).json(false);
    }
  };
  
const postUser = async(req, res, next) => {
    db();
    const { body } = req;
    try {
        const isUser = await Users.findOne({ clave: body.clave });
        if (isUser) {
            return res.status(403).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(body.password, salt);

        const user = await Users.create({
            clave : body.clave,
            password: hash,
            salt: salt,
        });
        const signed = await signToken(user._id);
        res.status(201).send({token:signed,clave:user.clave});
    } catch (err) {
        res.status(500).send(err.message);
    }
};
const getUserAccess = async(req, res, next) => {
    console.log('getUserAccess');
    res.status(200).json(true);    
}

const postUserLogin = async(req, res, next) => {
    console.log('postUserLogin');
    db();
    const { body } = req;
    try {
        const user = await Users.findOne({ clave: body.clave });
        if (!user) {
            return res.status(403).json({ message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            return res.status(403).json({ message: 'Wrong password' });
        }
        const signed = await signToken(user._id);
        console.log('body.clave: ' + body.clave);
        res.status(200).json({token:signed, clave:body.clave});
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.postUserLogin = postUserLogin;
exports.postUser = postUser;
exports.getUserAccess = getUserAccess;
exports.validateJwt = validateJwt;