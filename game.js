// logique de jeu

let jeu;

// Toujours cacher la popup au chargement
const overlayFin = document.getElementById("overlay-fin");
overlayFin.setAttribute("hidden", true);

function initialiserJeu(mot) {
  jeu = new Pendu(mot);
  mettreAJourMot();
  mettreAJourLettresRatees();
  afficherTentativesRestantes();
  afficherPendu(0);
  overlayFin.setAttribute("hidden", true);
  genererClavierVirtuel(); // Génère les boutons
  mettreAJourClavier(); // Assure que tout est clean
}

// Charger le mot au début
fetch("mots.json")
  .then((res) => res.json())
  .then((mots) => {
    const mot = mots[Math.floor(Math.random() * mots.length)];
    initialiserJeu(mot);
   
      // Génération du clavier virtuel uniquement sur mobile
    if (window.innerWidth < 1024) {
      document.getElementById("clavier-virtuel").removeAttribute("hidden");
      genererClavierVirtuel();
      mettreAJourClavier();
    } else {
      document.getElementById("clavier-virtuel").setAttribute("hidden", true);
    }

    document.addEventListener("keydown", (event) => {
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
  });

document.getElementById("btn-rejouer").addEventListener("click", () => {
  fetch("mots.json")
    .then((res) => res.json())
    .then((mots) => {
      const mot = mots[Math.floor(Math.random() * mots.length)];
      initialiserJeu(mot);
    });
});

document.getElementById("btn-abandonner").addEventListener("click", () => {
  jeu.finie = true;
  const message = "Vous avez abandonné le jeu !";
  document.getElementById("titre-message").textContent = "ABANDON";
  document.getElementById("texte-message").textContent = message;
  overlayFin.removeAttribute("hidden");
});

function mettreAJourMot() {
  if (!jeu) return;
  const motAffiche = jeu.afficherMot();
  document.getElementById("mot-affiche").textContent = motAffiche;
}

function mettreAJourLettresRatees() {
  if (!jeu) return;
  const lettresRatees = jeu.getLettresRatees();
  document.getElementById("lettres-utilisees").textContent =
    lettresRatees.join(", ");
}

function afficherTentativesRestantes() {
  if (!jeu) return;
  const tentatives = jeu.afficherTentatives();
  document.getElementById(
    "tentatives-restantes"
  ).textContent = `Tentatives restantes : ${tentatives}`;
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
  }
}

function afficherPendu(erreurs) {
  const parties = document.querySelectorAll(".p-part");
  for (let i = 0; i < parties.length; i++) {
    if (i < erreurs) {
      parties[i].classList.add("visible");
    } else {
      parties[i].classList.remove("visible");
    }
  }
}

// Règles popup

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-regles").addEventListener("click", () => {
    document.getElementById("popup-regles").removeAttribute("hidden");
  });

  document.getElementById("fermer-regles").addEventListener("click", () => {
    document.getElementById("popup-regles").setAttribute("hidden", true);
  });
   // Activation clavier virtuel sur mobile
   const clavierVirtuel = document.getElementById("clavier-virtuel");
   const champLettre = document.getElementById("saisie-lettre");
 
   if (window.innerWidth < 768) {
     clavierVirtuel.removeAttribute("hidden");
     if (champLettre) champLettre.setAttribute("hidden", true);
   }
});
