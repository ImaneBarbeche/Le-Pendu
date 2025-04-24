let themeChoisi = null;
let chronoChoisi = 0; // 0 = infini

// === GÉNÉRER LA LISTE DES THÈMES AUTOMATIQUEMENT ===
fetch("mots.json")
  .then((res) => res.json())
  .then((donnees) => {
    Object.keys(donnees).forEach((theme) => {
      const btn = document.createElement("button");
      btn.classList.add("choix-theme");
      btn.textContent = theme.toUpperCase();
      btn.dataset.theme = theme;

      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".choix-theme")
          .forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        themeChoisi = theme;
      });

      document.getElementById("liste-themes").appendChild(btn);
    });
  });

// === GESTION DES BOUTONS DE CHRONO ===
document.querySelectorAll(".choix-chrono").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".choix-chrono")
      .forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    chronoChoisi = parseInt(btn.dataset.temps);
  });
});

// === LANCER LA PARTIE QUAND ON CLIQUE SUR "JOUER" ===
document.getElementById("btn-jouer").addEventListener("click", () => {
  if (!themeChoisi) return alert("Choisis un thème !");
  // Récupère les mots du thème sélectionné
  fetch("mots.json")
    .then((res) => res.json())
    .then((data) => {
      const mots = data[themeChoisi];
      if (!mots || !Array.isArray(mots) || mots.length === 0) {
        alert("Thème invalide ou aucun mot disponible !");
        return;
      }
      const mot = mots[Math.floor(Math.random() * mots.length)];
      initialiserJeu(mot, chronoChoisi);
      document.getElementById("popup-choix").style.display = "none";
    });
});

// Règles popup fin de partie et règles du jeu

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

let timerInterval; // globale pour pouvoir le clear

function lancerTimer(duree) {
  let tempsRestant = duree;

  // Affiche le timer
  document.getElementById("affichage-timer").removeAttribute("hidden");
  document.getElementById("timer").textContent = tempsRestant;

  timerInterval = setInterval(() => {
    tempsRestant--;

    document.getElementById("timer").textContent = tempsRestant;

    if (tempsRestant <= 0) {
      clearInterval(timerInterval);
      jeu.finie = true;

      // Game over par le temps
      document.getElementById("titre-message").textContent = "TEMPS ÉCOULÉ !";
      document.getElementById(
        "texte-message"
      ).textContent = `Le mot était : "${jeu.mot.toUpperCase()}"`;
      document.getElementById("overlay-fin").removeAttribute("hidden");
      sonLose.play();
    }
  }, 1000);
}
