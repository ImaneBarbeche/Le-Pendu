class Pendu {

  constructor(mot) {
    this.mot = mot.toLowerCase();
    this.maxErreurs = 8; // Nombre maximum d'erreurs autorisées
    this.tentatives = this.maxErreurs;
    this.lettresTrouvees = new Set();
    this.lettresRatees = new Set();
    this.finie = false;
  }
  // Méthode pour vérifier si une lettre est dans le mot
  verifierLettre(lettre) {
    if (this.lettresTrouvees.has(lettre) || this.lettresRatees.has(lettre)) {
      return "deja_tentee";
    } else if (this.mot.includes(lettre)) {
      this.lettresTrouvees.add(lettre);
      return "bonne_tentative";
    } else {
      this.lettresRatees.add(lettre);
      this.tentatives--;
      return "mauvaise_tentative";
      
    }
  }
  // Méthode pour afficher le mot avec les lettres trouvées
  afficherMot() {
    let motAffiche = "";
    for (let lettre of this.mot) {
      if (this.lettresTrouvees.has(lettre)) {
        motAffiche += lettre + " ";
      } else {
        motAffiche += "_ ";
      }
    }
    return motAffiche.trim();
  }
  // Méthode pour afficher les lettres ratées
  getLettresRatees() {
    return [...this.lettresRatees];
  }

  // Méthode pour vérifier si le jeu est terminé
  estTermine() {
    return (
      this.tentatives <= 0 ||
      this.mot.split("").every((lettre) => this.lettresTrouvees.has(lettre))
    );
  }
  // Méthode pour afficher le nombre de tentatives restantes
  afficherTentatives() {
    return this.tentatives;
  }
    // Méthode pour afficher le nombre d'erreurs restantes
  getErreurs() {
    return this.maxErreurs - this.tentatives;
  }
  
  reinitialiserJeu() {
    this.mot = this.mot = mot.toLowerCase();
    this.tentatives = this.maxErreurs; 
    this.lettresTrouvees = new Set();
    this.lettresRatees = new Set();
    this.finie = false;
  }
  
}
