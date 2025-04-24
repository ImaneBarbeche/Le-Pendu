// logique de jeu

let jeu;

// Toujours cacher la popup au chargement
const overlayFin = document.getElementById("overlay-fin");
overlayFin.setAttribute("hidden", true);

function initialiserJeu(mot, duree = 0) {
  clearInterval(timerInterval); // on arrête tout ancien timer
  document.getElementById("affichage-timer").setAttribute("hidden", true);

  jeu = new Pendu(mot);
  mettreAJourMot();
  mettreAJourLettresRatees();
  afficherTentativesRestantes();
  afficherPendu(0);
  overlayFin.setAttribute("hidden", true);

  // Génération du clavier virtuel uniquement sur mobile
  if (window.innerWidth < 1024) {
    document.getElementById("clavier-virtuel").removeAttribute("hidden");
    genererClavierVirtuel();
    mettreAJourClavier();
  } else {
    document.getElementById("clavier-virtuel").setAttribute("hidden", true);
  }
  // Afficher le timer si la durée est supérieure à 0
  if (duree > 0) {
    lancerTimer(duree);
  }
}

function verifierFinJeu() {
  if (jeu.estTermine()) {
    jeu.finie = true;
    let message = "";
    if (jeu.tentatives <= 0) {
      message = `Vous avez perdu ! Le mot était : "${jeu.mot.toUpperCase()}"`;
      sonLose.play();
    } else {
      message = "Vous avez gagné !";
      sonWin.play();
    }

    document.getElementById("titre-message").textContent =
      jeu.tentatives <= 0 ? "PERDU !" : "GAGNÉ !";
    document.getElementById("texte-message").textContent = message;
    overlayFin.removeAttribute("hidden");

    mettreAJourMot();
    mettreAJourLettresRatees();
    afficherTentativesRestantes();
    clearInterval(timerInterval);
    document.getElementById("affichage-timer").setAttribute("hidden", true);
  }
}
