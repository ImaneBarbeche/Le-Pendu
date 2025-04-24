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
