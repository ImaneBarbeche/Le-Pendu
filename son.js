const sonBip = new Audio("assets/sounds/mauvaise_lettre.mp3");
const sonWin = new Audio("assets/sounds/bonne_lettre.mp3");
const sonLose = new Audio("assets/sounds/gameover.mp3");

let musiqueActive = true;

const fondSonore = new Audio("assets/sounds/ambiance.mp3");
fondSonore.loop = true;
fondSonore.volume = 0.1; // Volume de fond sonore


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
