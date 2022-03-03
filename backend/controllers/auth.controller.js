const bcrypt = require("bcrypt");
const models = require('../models/index');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const result = dotenv.config();
const { users } = require('../models/index');
const maxAge = 3 * 24 * 60 * 60 * 1000;
const { signInErrors, signUpErrors } = require('../utils/errors.utils')
const apiLimiter = require('../middleware/rateLimit')

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY_TOKEN, {
    expiresIn: maxAge
  })
}

module.exports.signUp = async (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      models.users.create({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        admin: false,
        password: hash,
      })
        .then((user) => res.status(200).json({
          admin: user.admin,
          userId: user.id,

        }))
        .catch((err) => {
          const errors = signUpErrors(err);
          res.status(200).send({ errors })
        })


    })

    .catch((err) => {
      const errors = signInErrors(err);
      res.status(400).send({ errors });
      console.log(err)
    })

}

module.exports.signIn = async (req, res) => {

  models.users.findOne({ where: { email: req.body.email } })

    // si l'email de l'utilisateur n'est pas présent, il n'existe pas
    .then((user) => {
      if (!user) {
        return res.status(200).json({ error: "Utilisateur inexistant" })
      }
      // contrôler la validité du password envoyer par le front
      bcrypt.compare(req.body.password, user.password)
        .then((controlPassword) => {

          // si le mot de passe est faux

          if (!controlPassword) {
            apiLimiter
            return res.status(400).json({message: "le mot de passe est incorrect" })
          }

          // le mot de passe est correct
          // envoie dans la response du serveur du userId et du token d'authentification
          const token = createToken(user.id);
          res.cookie('jwt', token, { httpOnly: true, maxAge });
          res.status(200).json({ user: user.id })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json(error));
}

exports.logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}









