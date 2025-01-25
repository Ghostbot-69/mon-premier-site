const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route pour la connexion par cookie
app.post('/login', (req, res) => {
  const cookie = req.body.cookie;
  // Logique pour vérifier le cookie et établir la connexion
  if (cookie) {
    // Si le cookie est valide, rediriger vers la configuration du bot
    res.redirect('/setup-bot');
  } else {
    res.send('Cookie invalide ou manquant.');
  }
});

// Route pour la connexion par identifiants Facebook
app.post('/login-facebook', (req, res) => {
  const { email, password } = req.body;

  // Logique pour vérifier les identifiants (par exemple, via l'API Facebook)
  if (email === 'test@example.com' && password === 'password123') {
    res.redirect('/setup-bot');
  } else {
    res.send('Erreur de connexion. Vérifiez vos informations.');
  }
});

// Route pour la configuration du bot
app.post('/setup-bot', async (req, res) => {
  const { bot_name, prefix, uid, group_id } = req.body;

  // Sauvegarder les informations dans la base de données (par exemple)
  // Puis, appel API pour changer le nom du bot dans le groupe

  const token = 'VOTRE_TOKEN_ACCESS_FACEBOOK'; // Assurez-vous d'avoir un token valide
  const url = `https://graph.facebook.com/${group_id}/members`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: uid, // ID du bot que vous voulez ajouter
      group_id: group_id,
      name: bot_name, // Nouveau nom du bot
      access_token: token,
    }),
  });

  const data = await response.json();
  if (data.error) {
    res.send('Erreur lors de la mise à jour du bot dans le groupe.');
  } else {
    res.send(`Bot configuré avec succès ! Nom changé en : ${bot_name}`);
  }
});

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
