// script.js

document.getElementById('createBotBtn').addEventListener('click', () => {
  window.location.href = '/create-bot.html'; // Redirige vers la page de création
});

// Bonus : Ajout d'une animation pour rendre les boutons interactifs
const btn = document.getElementById('createBotBtn');
btn.addEventListener('mouseenter', () => {
  btn.style.background = '#ffa500';
});
btn.addEventListener('mouseleave', () => {
  btn.style.background = '#ff4500';
});
