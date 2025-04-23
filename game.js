// logique de jeu

let jeu;

function initialiserJeu(mot) {
  jeu = new Pendu(mot);
  mettreAJourMot();
  mettreAJourLettresRatees();
  afficherTentativesRestantes();
  afficherPendu(0);
  document.getElementById("message-fin").setAttribute("hidden", true);
}

// Charger le mot au début
fetch("mots.json")
  .then((res) => res.json())
  .then((mots) => {
    const mot = mots[Math.floor(Math.random() * mots.length)];
    initialiserJeu(mot);

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
        sonBip.play();
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
      document.getElementById("texte-message").textContent = message;
      document.getElementById("message-fin").removeAttribute("hidden");
    });
  });

  function mettreAJourMot() {
    if (!jeu) return; // ← ne fait rien si jeu est undefined
    const motAffiche = jeu.afficherMot();
    document.getElementById("mot-affiche").textContent = motAffiche;
  }
  

mettreAJourMot();

function mettreAJourLettresRatees() {
  if (!jeu) return;
  const lettresRatees = jeu.getLettresRatees();
  document.getElementById("lettres-utilisees").textContent = lettresRatees.join(", ");
}
mettreAJourLettresRatees();

function afficherTentativesRestantes() {
  if (!jeu) return;
  const tentatives = jeu.afficherTentatives();
  document.getElementById("tentatives-restantes").textContent = `Tentatives restantes : ${tentatives}`;
}
afficherTentativesRestantes();

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
    document.getElementById("texte-message").textContent = message;
    document.getElementById("message-fin").removeAttribute("hidden");
    mettreAJourMot();
    mettreAJourLettresRatees();
    afficherTentativesRestantes();
  }
}

function afficherPendu(erreurs) {
  const parties = document.querySelectorAll(".p-part");
  console.log("Parties du pendu :", parties);
  for (let i = 0; i < parties.length; i++) {
    console.log(`Partie ${i}: erreurs = ${erreurs}, visible = ${i < erreurs}`);
    if (i < erreurs) {
      parties[i].classList.add("visible");
    } else {
      parties[i].classList.remove("visible");
    }
  }
}
// Interactions pour la pop-up des règles

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-regles").addEventListener("click", () => {
    document.getElementById("popup-regles").removeAttribute("hidden");
  });

  document.getElementById("fermer-regles").addEventListener("click", () => {
    document.getElementById("popup-regles").setAttribute("hidden", true);
  });
});

console.log("popup OK")