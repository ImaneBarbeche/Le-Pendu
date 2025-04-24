const sonWrongLetter = new Audio("assets/sounds/mauvaise_lettre.mp3");
sonWrongLetter.volume = 0.5; // Volume de la lettre incorrecte

const sonGoodLetter = new Audio("assets/sounds/bonne_lettre.mp3");
sonGoodLetter.volume = 0.5; // Volume de la lettre correcte
const sonLose = new Audio("assets/sounds/gameover.mp3");
sonLose.volume = 0.5; // Volume du gameover

const sonWin = new Audio("assets/sounds/victoire.mp3");
sonWin.volume = 0.5; // Volume de la victoire


let musiqueActive = true;

const fondSonore = new Audio("assets/sounds/ambiance.mp3");
fondSonore.loop = true;
fondSonore.volume = 0.2; // Volume de fond sonore


const boutonMusique = document.getElementById("btn-musique");

boutonMusique.addEventListener("click", () => {
  if (musiqueActive) {
    fondSonore.pause();
    musiqueActive = false;
    boutonMusique.textContent = "🔇 Muet";
  } else {
    fondSonore.play();
    musiqueActive = true;
    boutonMusique.textContent = "🔊 Musique";
  }
});
