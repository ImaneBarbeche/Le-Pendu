// Met à jour l'affichage du mot à deviner (lettres connues et "_" pour celles non trouvées)
function mettreAJourMot() {
  if (!jeu) return; // Sécurité si le jeu n'est pas encore initialisé
  const motAffiche = jeu.afficherMot(); // Appelle la méthode de l'objet Pendu
  document.getElementById("mot-affiche").textContent = motAffiche; // Affiche le résultat dans le DOM
}

// ✅ Affiche visuellement les lettres ratées dans une grille dédiée
function mettreAJourLettresRatees() {
  if (!jeu) return;

  const lettresRatees = jeu.getLettresRatees(); // Récupère les lettres incorrectes déjà tentées
  const grille = document.getElementById("grille-lettres");
  grille.innerHTML = ""; // Réinitialise la grille avant de la regénérer


  lettresRatees.forEach((lettre) => {
    const div = document.createElement("div"); // Crée une case pour chaque lettre ratée
    div.className = "lettre-ratee"; // Classe CSS pour le style (grisée, animée, etc.)
    div.textContent = lettre.toUpperCase(); // Affiche la lettre en majuscule
    grille.appendChild(div); // Ajoute à la grille dans le DOM
  });
}


// Met à jour le nombre de tentatives restantes affiché à l’écran
function afficherTentativesRestantes() {
  if (!jeu) return;
  const tentatives = jeu.afficherTentatives(); // Méthode du jeu qui retourne les tentatives restantes
  document.getElementById("tentatives-restantes").textContent =
    `Tentatives restantes : ${tentatives}`;
}


// Affiche ou masque chaque partie du pendu en fonction du nombre d’erreurs
function afficherPendu(erreurs) {
  const parties = document.querySelectorAll(".p-part"); // Sélectionne les parties du pendu

  for (let i = 0; i < parties.length; i++) {
    if (i < erreurs) {
      // Si le nombre d’erreurs atteint ce niveau, on affiche cette partie du pendu
      parties[i].classList.add("visible");
    } else {
      // Sinon, on la masque
      parties[i].classList.remove("visible");
    }
  }
}
