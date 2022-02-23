const bcrypt = require("bcrypt");
const models = require('../models/index');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const result = dotenv.config();
const  { users } = require('../models/index');
const maxAge = 3 * 24 * 60 * 60 *1000;
const { signInErrors, signUpErrors } = require('../utils/errors.utils')

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_KEY_TOKEN, {
        expiresIn: maxAge
    })
}

module.exports.signUp = async (req, res) => {
    const {name, firstname, email, password} = req.body
    const hash = bcrypt.hash(password, 10)
  
    try {
      const user = await models.users.create({name, firstname, email, password });
      res.status(201).json({ userId: user.id});
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })
        console.log(err)
      }
  }

  module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
  
    try {
      const user = await models.users.findOne({where: {email, password}});
      const token = createToken(user.id);
      res.cookie('jwt', token, { httpOnly: true, maxAge});
      res.status(200).json({ user: user.id})
      
    } catch (err){
      const errors = signInErrors(err);
      res.status(200).send({errors});
      
      
    }
  }



exports.logout = async (req, res) => {
   res.cookie('jwt', '', {maxAge: 1 });
   res.redirect('/');
}









//  ok c bon tu peux arreterer