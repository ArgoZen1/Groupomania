const cors = require('cors');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

const db = require('./models');

const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" })
const { checkUser, requireAuth } = require('./middleware/auth.middleware');

const app = express()

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    console.log(res.locals.user.id)
    res.status(200).json(res.locals.user.id)
})

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post',checkUser, postRoutes);
app.use('/api/comment', commentRoutes);


db.sequelize.sync({ alter: true })


module.exports = app;
