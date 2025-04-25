const sonWrongLetter = new Audio("assets/sounds/mauvaise_lettre.mp3"); // crée un nouvel objet Audio pour le son de la lettre incorrecte
sonWrongLetter.volume = 0.5; // Volume de la lettre incorrecte

const sonGoodLetter = new Audio("assets/sounds/bonne_lettre.mp3"); // crée un nouvel objet Audio pour le son de la lettre correcte
sonGoodLetter.volume = 0.5; // Volume de la lettre correcte

const sonLose = new Audio("assets/sounds/gameover.mp3"); // crée un nouvel objet Audio pour le son de la défaite
sonLose.volume = 0.5; // Volume du gameover

const sonWin = new Audio("assets/sounds/victoire.mp3"); // crée un nouvel objet Audio pour le son de la victoire
sonWin.volume = 0.5; // Volume de la victoire


let musiqueActive = true; // Variable pour suivre l'état de la musique (active ou non)

const fondSonore = new Audio("assets/sounds/ambiance.mp3"); // crée un nouvel objet Audio pour le fond sonore
fondSonore.loop = true; // Boucle le fond sonore
fondSonore.volume = 0.2; // Volume de fond sonore


const boutonMusique = document.getElementById("btn-musique"); // Sélectionne le bouton de musique dans le DOM

if (boutonMusique) {
  // Si le bouton de musique existe, on lui ajoute un écouteur d'événement pour gérer le clic
  boutonMusique.addEventListener("click", () => {
    if (musiqueActive) {
      fondSonore.pause(); // Met en pause le fond sonore
      musiqueActive = false; // Met à jour l'état de la musique
      boutonMusique.textContent = "🔇 Muet"; // Change le texte du bouton
    } else {
      fondSonore.play(); // Joue le fond sonore
      musiqueActive = true; // Met à jour l'état de la musique
      boutonMusique.textContent = "🔊 Musique"; // Change le texte du bouton
    }
  });
}
