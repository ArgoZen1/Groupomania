const models = require('../models/index');
const multer = require('../middleware/multer.config');
const fs = require('fs');

// pour récupérer la table de tous les utilisateurs 
exports.getAllUsers = (req, res) => {
    models.users.findAll()
    .then((user) => res.status(200).json(user))
    .catch(err => res.status(400).json({ err }));
    
}
// pour ciblé un utilisateur, et where pour ciblé l'id dans la base de données
exports.userInfo = (req, res) => {
    models.users.findOne({ where: { id: req.params.id }})
    .then((user) => res.status(200).json(user))
    .catch(err => res.status(404).json({ err }));
}

exports.updateUser = (req, res) => {

    if (req.file) {
        models.users.findOne({ id: req.params.id })
            // Pour supprimer l'image dans le dossier images
            .then(profilImg => {

                const fileName = profilImg.picture.split('/images')[1];
                fs.unlink(`images/${fileName}`, (error) => {
                    if (error) throw error;
                })
            })
    }

    const pictureUpdate = req.file ? {

        ...(req.body.user),
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

   models.users.update({ ...pictureUpdate , bio: req.body.bio, email: req.body.email }, { where: {id: req.params.id}})
   .then(() => res.status(200).send({ message: "modification ok" }))
   .catch((err) => res.status(500).json(err))
}

exports.deleteUser = (req, res) => {
    models.users.findOne({ id: req.params.id })
    .then(() => { 
     models.users.destroy({ where: {id: req.params.id} })
    .then(res.status(200).json({ message: "utilisateur supprimé" }))
})
    .catch((err) => res.status(404).json({ err, message: "une erreur est survenue lors de la supression de l'utilisateur"}))
}