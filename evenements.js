// Écouteur d'événement pour les touches du clavier physique (PC uniquement)
document.addEventListener("keydown", (event) => {
  console.log("Touche appuyée :", event.key);

  // Si la musique est active mais arrêtée, on la relance
  if (musiqueActive && fondSonore.paused) {
    fondSonore.play();
  }


  const lettre = event.key.toLowerCase(); // on convertit en minuscule
  // On ignore tout sauf les lettres de l'alphabet, ou si le jeu est terminé
  if (jeu.finie || !/^[a-z]$/.test(lettre)) 
    return;

   // On vérifie si la lettre est correcte ou non
   const resultat = jeu.verifierLettre(lettre);

    // Sons associés
    if (resultat === "mauvaise_tentative") {
      sonWrongLetter.play();
    } else if (resultat === "bonne_tentative") {
      sonGoodLetter.play();
    }

  console.log(`Lettre ${lettre} : ${resultat}`);

  // Mise à jour de l'affichage après chaque tentative
  mettreAJourMot();
  mettreAJourLettresRatees();
  afficherTentativesRestantes();
  verifierFinJeu();
  afficherPendu(jeu.maxErreurs - jeu.tentatives);
});

// Bouton "Rejouer" — relance une partie avec un mot du même thème
document.getElementById("btn-rejouer").addEventListener("click", () => {
  if (!themeChoisi) return;


  fetch("mots.json")
    .then((res) => res.json())
    .then((data) => {
      const mots = data[themeChoisi];
      if (!mots || !Array.isArray(mots) || mots.length === 0) // Vérifie qu’on a bien un tableau non vide
        return; 

      const mot = mots[Math.floor(Math.random() * mots.length)]; // Choisit un mot aléatoire dans le thème
      initialiserJeu(mot, chronoChoisi); // Lance le jeu avec ce mot et la durée sélectionnée (si chronoChoisi ≠ 0).
    });
});

// Bouton "Abandonner" — met fin à la partie
document.getElementById("btn-abandonner").addEventListener("click", () => { 
  clearInterval(timerInterval); // stoppe le chrono s'il est actif
  jeu.finie = true;

  const message = "Vous avez abandonné le jeu !";
  document.getElementById("titre-message").textContent = "ABANDON";
  document.getElementById("texte-message").textContent = message;
  overlayFin.removeAttribute("hidden"); // affiche la pop-up de fin

  // Ferme la popup après 5 secondes
  setTimeout(() => {
    overlayFin.setAttribute("hidden", "true");
  }, 5000);
  
});

// Bouton "Changer de thème" pendant la partie
document.getElementById("btn-changer-theme").addEventListener("click", () => {
  document.getElementById("popup-choix").style.display = "flex"; // Montre la popup
  document.getElementById("game-container").style.display = "none"; // Cache le jeu
  themeChoisi = null; // Reset du thème pour forcer l'utilisateur à choisir un nouveau
});

// Bouton "Changer de thème" depuis la popup de fin
document.getElementById("btn-choisir-theme").addEventListener("click", () => {
  document.getElementById("popup-choix").style.display = "flex"; // Montre la popup
  document.getElementById("game-container").style.display = "none"; // Cache le jeu
  overlayFin.setAttribute("hidden", "true"); // Cache la popup de fin
  themeChoisi = null; // Reset du thème
});