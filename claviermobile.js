// Dès que la page est chargée, on vérifie si l'utilisateur est sur un appareil tactile
// Si oui, on ajoute une classe "tactile" au body pour adapter l'affichage via le CSS
function mettreAJourModeTactile() {
  const estTactile = estAppareilTactile();
  const body = document.body; // récupère l'élément body

  if (estTactile) {
    body.classList.add("tactile"); // on ajoute une classe css 
    genererClavierVirtuel(); // Appel le clavier
  } else {
    body.classList.remove("tactile");
    const clavier = document.getElementById("clavier-virtuel");
    if (clavier) clavier.innerHTML = ""; // Supprime le clavier
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mettreAJourModeTactile();
});



// Génère le clavier virtuel (boutons A-Z) pour les appareils tactiles
function genererClavierVirtuel() {
  const clavier = document.getElementById("clavier-virtuel");
  if (!clavier) return; // sécurité si l'élément n'existe pas

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); // On crée un tableau contenant toutes les lettres de l’alphabet (a → z) + split pour séparer les lettres
  clavier.innerHTML = ""; // réinitialise le clavier à chaque lancement

  alphabet.forEach(lettre => {
    const bouton = document.createElement("button");
    bouton.textContent = lettre.toUpperCase();
    bouton.classList.add("touche-clavier"); // classe CSS pour le style

     // Lorsque l'utilisateur clique sur une lettre
     bouton.addEventListener("click", () => {
      if (!jeu || jeu.finie) return; // sécurité : pas d'action si le jeu est terminé
      traiterLettre(lettre); // on traite la lettre
    });

    clavier.appendChild(bouton); // ajoute le bouton au clavier
  });
}


// Traite une lettre cliquée par l'utilisateur (logique identique à celle du clavier physique)
function traiterLettre(lettre) {
  const resultat = jeu.verifierLettre(lettre);

  // Lecture du bon son selon le résultat
  if (resultat === "bonne_tentative") {
    sonGoodLetter.play();
  } else if (resultat === "mauvaise_tentative") {
    sonWrongLetter.play();
  }
  
  // Met à jour l'interface
  mettreAJourMot();
  mettreAJourLettresRatees();
  afficherTentativesRestantes();
  verifierFinJeu();
  afficherPendu(jeu.maxErreurs - jeu.tentatives);
  
  // Grise les lettres déjà utilisées
  mettreAJourClavier();
}

// Grise les lettres déjà utilisées sur le clavier virtuel
function mettreAJourClavier() {
  if (!jeu) return;

  document.querySelectorAll(".touche-clavier").forEach(btn => {
    const lettre = btn.textContent.toLowerCase();
    if (jeu.lettresTrouvees.has(lettre) || jeu.lettresRatees.has(lettre)) {
      btn.classList.add("utilisee");
      btn.disabled = true;
    }
  });
}
  
  
// Fonction utilitaire pour savoir si l'appareil est tactile
function estAppareilTactile() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
  
// Mise à jour en cas de redimensionnement (simulateur, rotation, etc.)
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    mettreAJourModeTactile();
  }, 200);
});
