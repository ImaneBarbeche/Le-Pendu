const sonBip = new Audio("assets/sounds/erreur_bip.mp3");
const sonWin = new Audio("assets/sounds/victoire_jingle.mp3");
const sonLose = new Audio("assets/sounds/defaite_tune.mp3");

let musiqueActive = true;

const fondSonore = new Audio("assets/sounds/ambiance_loop_pokemon_style.mp3");
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
