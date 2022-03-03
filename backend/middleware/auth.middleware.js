const jwt = require('jsonwebtoken');
const models = require('../models');
const user = require('../models/user.model')


// pour check si l'utilisateur est connecté
exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY_TOKEN, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                // res.cookie('jwt', '', { maxAge: 1});
                next()
                console.log(token)

            } else {
                console.log('decoded token ' + decodedToken);
                let user = await models.users.findByPk(decodedToken.id);
                res.locals.user = user;
                console.log("erreur 2");
                next();
            }
        })
    } else {
        res.locals.user = null;
        console.log("erreur 3");
        next();
    }
}
exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY_TOKEN, async (err, decodedToken) => {
            if (err) {
                console.log(err, { message: "l'erreur est ici" }); // pas de next s'il y a une erreur
            } else {

                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log('no token');
    }
}