const models = require('../models/index');
const { uploadErrors } = require("../utils/errors.utils");





exports.readPost = (req, res) => {
    models.posts.findAll({order: [
        ['createdAt', 'DESC'],
    ]})
    .then(articles => {
        console.log(articles);
        res.status(200).json({data: articles});
    })
    .catch(error => res.status(400).json({ error }));
}

exports.createPost = (req, res) => {
    if (!req.body.message) {
        res.status(400).send({
          message: "Le contenu ne peut pas être vide!"
        });
        return;
      }
      const post = {
          userId: req.body.userId,
          picture: req.file,
          vidéo: req.body.video,
          message: req.body.message
      }
      console.log(req.body)
      models.posts.create(post)
      .then(data => {
         res.send(data)
      })
      .catch(err => {
          res.status(400).send({
              message:
              err.message || "Une erreur s'est produite lors de la création du post"
          });
      });
};

exports.updatePost = (req, res) => {
    models.posts.update({ message: req.body.message, title: req.body.title, picture: req.body.picture, video: req.body.video }, { where: {id: req.params.id}})
   .then(() => res.status(200).send({ message: "modification ok" }))
   .catch((err) => res.status(500).json(err))
}

exports.deletePost = (req, res) => {
    models.posts.findOne({ id: req.params.id })
    .then(() => { 
     models.posts.destroy({ where: {id: req.params.id} })
    .then(res.status(200).json({ message: "le post a été supprimé" }))
})
    .catch((err) => res.status(404).json({ err, message: "une erreur est survenue lors de la supression du post"}))
}