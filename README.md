Projet Groupomania Openclassrooms 
Créer un réseau social d'entreprise 

Stack :
frontend:

1. React.js
2. Axios
3. cookies

Backend: 
Node.js
Express
Dotenv
Mysql => Sequelize 

Pour clôner le projet : 

1. Git clôner le projet

3. vous pouvez verifier les dépendances dans le package.json

2. Il faudra créer une DB Groupomania avec les informations :
les tables seront créees avec sequelize.sync()

  USER: "ArgoZen",
  PASSWORD: "A1719735bcd@",
  DB: "groupomania" 

3. positionnez-vous dans le dossier backend (cd backend) => nodemon server (sur le port 5000)

4. positionnez-vous dans le dossier client (cd client) => npm run start (sur le port 3000)

5. vous pouvez maintenant vous inscrire et vous connecter avec votre compte.

N'oubliez pas de vous fier aux fichiers .env-example pour les variables d'environnement. 

