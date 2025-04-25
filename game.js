// ==========================
// LOGIQUE DU JEU PRINCIPALE
// ==========================

let jeu; // variable globale contenant l'instance de Pendu

// Cache la popup de fin dès le début
const overlayFin = document.getElementById("overlay-fin");
overlayFin.setAttribute("hidden", true);

// Initialise une nouvelle partie avec un mot et une durée (optionnelle)
function initialiserJeu(mot, duree = 0) {
  clearInterval(timerInterval); // on arrête tout ancien timer
  document.getElementById("affichage-timer").setAttribute("hidden", true);

  // Nouvelle instance de Pendu
  jeu = new Pendu(mot);

  // MàJ de l'affichage initial
  mettreAJourMot();
  mettreAJourLettresRatees();
  afficherTentativesRestantes();
  afficherPendu(0);

  overlayFin.setAttribute("hidden", true);

  // Affiche ou non le clavier virtuel selon le type d'appareil
  const clavierVirtuel = document.getElementById("clavier-virtuel");
  if (estAppareilTactile()) {
    clavierVirtuel.removeAttribute("hidden");
    genererClavierVirtuel();
    mettreAJourClavier();
  } else {
    clavierVirtuel.setAttribute("hidden", true);
  }

  // Si un timer est défini, le lancer
  if (duree > 0) {
    lancerTimer(duree);
  }
}

/**
 * Vérifie si le jeu est terminé (victoire ou défaite) et affiche le résultat
 */
function verifierFinJeu() {
  if (!jeu.estTermine()) return;

  jeu.finie = true;

  // Détermine le message et joue le bon son
  const perdu = jeu.tentatives <= 0;
  const message = perdu
    ? `Vous avez perdu ! Le mot était : "${jeu.mot.toUpperCase()}"`
    : "Vous avez gagné !";

  document.getElementById("titre-message").textContent = perdu
    ? "PERDU !"
    : "GAGNÉ !";
  document.getElementById("texte-message").textContent = message;
  overlayFin.removeAttribute("hidden");

  perdu ? sonLose.play() : sonWin.play(); // Joue le son de victoire ou de défaite

  // Mise à jour finale de l'état visuel
  mettreAJourMot();
  mettreAJourLettresRatees();
  afficherTentativesRestantes();
  clearInterval(timerInterval);
  document.getElementById("affichage-timer").setAttribute("hidden", true);

}
