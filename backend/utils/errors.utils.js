module.exports.signUpErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.name.includes("SequelizeUniqueConstraintError")) errors.email = "Cet email est déjà enregistré";

  return errors;
};


module.exports.signInErrors = () => {
    let errors =  "le mot de passe ou l'adresse e-mail est incorrect"
  
    
  
    return errors;
  }

 