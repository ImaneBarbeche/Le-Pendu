document.addEventListener("keydown", (event) => {
  console.log("Touche appuyée :", event.key);
  if (musiqueActive && fondSonore.paused) {
    fondSonore.play();
  }
  const lettre = event.key.toLowerCase();
  if (jeu.finie || !/^[a-z]$/.test(lettre))
    // on verifie si la touche est une lettre de l'alphabet
    return; // Ne rien faire si le jeu est déjà terminé
  const resultat = jeu.verifierLettre(lettre);
  if (resultat === "mauvaise_tentative") {
    sonWrongLetter.play();
  } else if (resultat === "bonne_tentative") {
    sonGoodLetter.play();
  }
  console.log(`Lettre ${lettre} : ${resultat}`);
  // Mettre à jour l'affichage du mot, des lettres ratées et des tentatives restantes
  mettreAJourMot();
  mettreAJourLettresRatees();
  afficherTentativesRestantes();
  verifierFinJeu();
  afficherPendu(jeu.maxErreurs - jeu.tentatives);
});

document.getElementById("btn-rejouer").addEventListener("click", () => {
  if (!themeChoisi) return;

  fetch("mots.json")
    .then((res) => res.json())
    .then((data) => {
      const mots = data[themeChoisi];
      if (!mots || !Array.isArray(mots) || mots.length === 0) return;

      const mot = mots[Math.floor(Math.random() * mots.length)];
      initialiserJeu(mot, chronoChoisi);
    });
});

document.getElementById("btn-abandonner").addEventListener("click", () => {
  clearInterval(timerInterval);
  jeu.finie = true;
  const message = "Vous avez abandonné le jeu !";
  document.getElementById("titre-message").textContent = "ABANDON";
  document.getElementById("texte-message").textContent = message;
  overlayFin.removeAttribute("hidden");
});
