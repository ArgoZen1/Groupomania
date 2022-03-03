const models = require('../models/index');

exports.readComment = (req, res) => {
    models.comments.findAll({
        include: {

            model: models.posts
        },
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json(error))

}
exports.createComment = (req, res) => {
    if (!req.body.message) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
        return;
    }

    const comment = {
        postId: req.body.postId,
        userId: req.body.userId,
        message: req.body.message
    }
    console.log(req.body)
    models.comments.create(comment)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Une erreur s'est produite lors de la création du commentaire"
            });
        });
}

exports.updateComment = (req, res) => {
    models.comments.update({ message: req.body.message }, { where: { id: req.body.id } })
        .then((data) => res.status(200).send({ data, message: "modification ok" }))
        .catch((err) => res.status(500).json(err))
}

exports.deleteComment = (req, res) => {
    models.comments.findOne({ id: req.params.id })
        .then(() => {
            models.comments.destroy({ where: { id: req.params.id } })
                .then(res.status(200).json({ message: "le commentaire a été supprimé" }))
        })
        .catch((err) => res.status(404).json({ err, message: "une erreur est survenue lors de la supression du commentaire" }))
}