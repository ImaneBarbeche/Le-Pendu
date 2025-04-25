let themeChoisi = null; // Le thème sélectionné (ex: animaux, cinéma...)
let chronoChoisi = 0; // Temps choisi (0 = pas de limite de temps)

// === GÉNÉRER LA LISTE DES THÈMES AUTOMATIQUEMENT ===
fetch("mots.json")
  .then((res) => res.json())
  .then((donnees) => {
    Object.keys(donnees).forEach((theme) => {
      const btn = document.createElement("button");
      btn.classList.add("choix-theme");
      btn.textContent = theme.toUpperCase(); // Exemple : "animaux" => "ANIMAUX"
      btn.dataset.theme = theme;

      // Gestion du clic sur un thème
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
    chronoChoisi = parseInt(btn.dataset.temps); // Convertit "30" ou "60" en nombre
  });
});

// === LANCER LA PARTIE QUAND ON CLIQUE SUR "JOUER" ===
document.getElementById("btn-jouer").addEventListener("click", () => {
  if (!themeChoisi) return alert("Choisis un thème !");

  // Si la musique est activée dans les options ET qu'elle est actuellement en pause...
  if (musiqueActive && fondSonore.paused) {
    // ...alors on tente de la jouer (au moment du clic "jouer")
    fondSonore
      .play()

      // Si le navigateur bloque la lecture (ex : pas d'interaction utilisateur),
      // on intercepte l'erreur pour éviter que ça plante,
      // et on affiche juste un message d'avertissement dans la console
      .catch((e) =>
        console.warn("🎧 Lecture audio bloquée par le navigateur :", e)
      );
  }

  // 📥 Récupère les mots du thème sélectionné
  fetch("mots.json")
    .then((res) => res.json())
    .then((data) => {
      const mots = data[themeChoisi];
      if (!mots || !Array.isArray(mots) || mots.length === 0) {
        alert("Thème invalide ou aucun mot disponible !");
        return;
      }
      // Lance le jeu avec un mot aléatoire
      const mot = mots[Math.floor(Math.random() * mots.length)];
      initialiserJeu(mot, chronoChoisi);

      // Cache la pop-up de départ
      document.getElementById("popup-choix").style.display = "none";
    });
});

// === RÈGLES : Pop-up ouverture/fermeture + gestion mobile ===
document.addEventListener("DOMContentLoaded", () => {
  // Ouvre les règles
  document.getElementById("btn-regles").addEventListener("click", () => {
    document.getElementById("popup-regles").removeAttribute("hidden");
  });

  // Ferme les règles
  document.getElementById("fermer-regles").addEventListener("click", () => {
    document.getElementById("popup-regles").setAttribute("hidden", true);
  });

  // Active le clavier virtuel si appareil tactile
  const clavierVirtuel = document.getElementById("clavier-virtuel");
  if (estAppareilTactile()) {
    clavierVirtuel.removeAttribute("hidden");
  }
});

let timerInterval; // Permet d’annuler le setInterval depuis d'autres fichiers

function lancerTimer(duree) {
  let tempsRestant = duree;

  document.getElementById("affichage-timer").removeAttribute("hidden");
  document.getElementById("timer").textContent = tempsRestant;

  timerInterval = setInterval(() => {
    tempsRestant--;
    document.getElementById("timer").textContent = tempsRestant;

    if (tempsRestant <= 0) {
      clearInterval(timerInterval);
      jeu.finie = true;

      // Affiche le game over
      document.getElementById("titre-message").textContent = "TEMPS ÉCOULÉ !";
      document.getElementById("texte-message").textContent = `Le mot était : "${jeu.revelerMot().toUpperCase()}"`;
      document.getElementById("overlay-fin").removeAttribute("hidden");
      sonLose.play();
    }
  }, 1000);
}
