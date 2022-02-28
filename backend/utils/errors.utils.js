module.exports.signUpErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.name.includes("SequelizeUniqueConstraintError")) errors.email = "Cet email est déjà enregistré";

  return errors;
};


module.exports.signInErrors = () => {
    let errors =  "le mot de passe ou l'adresse e-mail est incorrect"
  
    
  
    return errors;
  }

  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      errors.format = "Format incompatabile";
  
    if (err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse 500ko";
  
    return errors
  }