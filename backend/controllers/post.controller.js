const models = require('../models/index');
const { uploadErrors } = require("../utils/errors.utils");
const fs = require('fs');
const multer = require('../middleware/multer.config');


exports.readPost = (req, res) => {
    models.posts.findAll({
        order: [
            ['createdAt', 'DESC']],
        include: {
            model: models.comments,

        },

    })
        .then(articles => {

            res.status(200).json({ data: articles });
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
    let image;
    if (req.file) {

        image = `${req.protocol}://${req.get('host')}/images/${req.file.filename
            }`;
    } else {

        image = null;
    }

    const post = {
        userId: req.body.userId,
        picture: image,
        video: req.body.video,
        message: req.body.message,
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

    models.posts.update({ message: req.body.message, title: req.body.title, picture: req.body.picture, video: req.body.video }, { where: { id: req.params.id } })

        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err))
}

exports.deletePost = (req, res) => {

    models.posts.findOne({

        where: {
            id: req.params.id
        }
    })
        .then(post => {
            console.log(post.picture)

            if (post.picture != null) {
                console.log("Je suis dans le if)")
                const fileName = post.picture.split('/images')[1];
                fs.unlink(`images/${fileName}`, () => {
                    post.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(() => res.status(200).json({
                            message: 'le post avec la photo a bien été supprimé !'
                        }))
                        .catch(err => res.status(400).json({ err }))
                })
            } else {
                post.destroy({

                    where: {
                        id: req.params.id
                    }

                })
                    .then((post) => res.status(200).send(
                        post
                    ))
                    .catch(err => res.status(400).json({ err }))
            }
        })
        .catch(err => res.status(500).json({
            err,
            message: 'impossible de supprimer le post !'
        }))

}