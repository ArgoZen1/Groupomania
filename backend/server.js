

// import du package HTTP de node.JS pour avoir les outils pour créer le serveur
const http = require("http");
// console.log(http);

// import de l'application app.js
const app = require("./app");

// importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

// db.sequelize.sync();
// console.log("All models were synchronized successfully")

app.set('port', 3000);

const server = http.createServer(app);

// Le serveur écoute les requêtes sur le port
server.listen(5000, () => {
    console.log('nous sommes sur le port 5000')
});
// la méthode createServer prend en argument la fonction qui sera
// appelée à chaque requête reçu par le serveur
// Les fonctions seront dans app.js


