function genererClavierVirtuel() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const clavier = document.getElementById("clavier-virtuel");
  
    clavier.innerHTML = ""; // reset s'il y a un refresh
  
    alphabet.forEach(lettre => {
      const bouton = document.createElement("button");
      bouton.textContent = lettre.toUpperCase();
      bouton.classList.add("touche-clavier");
      bouton.addEventListener("click", () => {
        if (!jeu.finie) {
          traiterLettre(lettre); // une fonction qu’on va créer juste après
        }
      });
      clavier.appendChild(bouton);
    });
  }

  function traiterLettre(lettre) {
    const resultat = jeu.verifierLettre(lettre);
  
    if (resultat === "bonne_tentative") {
        sonGoodLetter.play();
    } else if (resultat === "mauvaise_tentative") {
      sonWrongLetter.play();
    }
  
    mettreAJourMot();
    mettreAJourLettresRatees();
    afficherTentativesRestantes();
    verifierFinJeu();
    afficherPendu(jeu.maxErreurs - jeu.tentatives);
  
    // Met à jour les touches
    mettreAJourClavier();
  }

  function mettreAJourClavier() {
    document.querySelectorAll(".touche-clavier").forEach(btn => {
      const lettre = btn.textContent.toLowerCase();
      if (jeu.lettresTrouvees.has(lettre) || jeu.lettresRatees.has(lettre)) {
        btn.classList.add("utilisee");
        btn.disabled = true;
      }
    });
  }
  