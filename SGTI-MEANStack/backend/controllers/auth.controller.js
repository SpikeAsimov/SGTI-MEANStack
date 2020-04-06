const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth');

//Google-Auth-Library
const { OAuth2Client } = require('google-auth-library');
//Credenciales
const CLIENT_ID = '521536697432-9q3arjpcgm0fucbd5m6vtcsl6el34r45.apps.googleusercontent.com';
const SECRET_KEY = 'KCprHvF3Bkl-IsOpD0uYNlX3';

//Array de objetos
const usersCtrl = {}
//============================================================
// REGISTER
//============================================================
usersCtrl.createUser = async (req, res, next) => {
    const user = new User(req.body);
    user.password = await user.encryptPassword(user.password);
    await user.save();
    const expiresIn = 14400 /*Token expira en 4hs*/
    const token = await jwt.sign({ id: user._id }, 'mySecretToken', {  /*metodo sign: crea un token*/
        expiresIn: expiresIn
    });
    const dataUser = {
        apellido: user.apellido,
        nombre: user.nombre,
        email: user.email,
        token: token,
        expiresIn: expiresIn
    }
    res.json({ auth: true, dataUser, token });
};

//=================================================================
// LOGIN MEDIANTE GOOGLE
//=================================================================
usersCtrl.loginUserGoogle = async (req, res) => {

    const client = new OAuth2Client(CLIENT_ID, SECRET_KEY);

    const token = req.body.token;

        const login = await client.verifyIdToken({
            idToken: token,
            idClient: CLIENT_ID,
        });

        const payload = login.getPayload();
        const userid = payload['sub']
        // If request specified a G Suite domain:
        //const domain = payload['hd'];

    User.findOne({ email: payload.email }, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: true,
                message: 'Error al buscar usuario'
            });
        }

        if (usuario) {

            if (usuario.google === false) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Debe de usar su autenticación normal'
                });
            } else {

                usuario.password = ':)';

                const token = jwt.sign({ usuario: usuario }, 'mySecretToken', { 
                    expiresIn: 14400 // 4 horas
                }); 

                res.status(200).json({
                    ok: true,
                    usuario: usuario,
                    token: token,
                    id: usuario._id
                });

            }

            // Si el usuario no existe por correo
        } else {
            const googleUser = new User();

            googleUser.nombre = payload.name;
            googleUser.email = payload.email;
            googleUser.password = ':)';
            googleUser.img = payload.picture;
            googleUser.google = true;

            googleUser.save((err, userDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: true,
                        message: 'Error al crear usuario - Google',
                        errors: err
                    });
                }

                const token = jwt.sign({ googleUser: userDB }, 'mySecretToken', {
                    expiresIn: 14400 //4 horas
                });

                return res.status(200).json({
                    ok: true,
                    googleUser: userDB,
                    token: token,
                    id: userDB._id
                });
            });
        }

    });
};
//=================================================================
// LOGIN NORMAL
//=================================================================
usersCtrl.loginUser = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(409).send({ message: 'Email incorrecto' })
    };
    const validPassword = user.comparePassword(req.body.password, user.password)
    if (validPassword) {
        const expiresIn = 14400 /*Token expira en 4hs*/
        const token = await jwt.sign({ id: user._id }, 'mySecretToken', {
            expiresIn: expiresIn
        });
        const dataUser = {
            email: user.email,
            token: token,
            expiresIn: expiresIn
        }
        res.status(200).json({ auth: true, dataUser, token });
    } else {
        return res.status(401).send({ auth: false, token: null });
    };
}
//Logout
usersCtrl.logoutUser = (req, res) => {
    res.status(200).send({
        auth: false,
        token: null
    });
}

module.exports = usersCtrl;

