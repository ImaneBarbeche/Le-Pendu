// ==========================
// CLASSE PRINCIPALE DU JEU
// ==========================

class Pendu {
  #mot; // Mot à deviner en privé pour éviter les accès directs
  constructor(mot) {
    this.#mot = mot.toLowerCase();        // Le mot à deviner
    this.maxErreurs = 8;                 // Nombre max d’erreurs possibles
    this.tentatives = this.maxErreurs;   // Tentatives restantes
    this.lettresTrouvees = new Set();    // Lettres correctement devinées
    this.lettresRatees = new Set();      // Lettres incorrectes
    this.finie = false;                  // État du jeu (fini ou non)
  }

    /**
   * Vérifie si la lettre est correcte, incorrecte ou déjà tentée
   */
   verifierLettre(lettre) {
    if (this.lettresTrouvees.has(lettre) || this.lettresRatees.has(lettre)) {
      return "deja_tentee";
    }

    if (this.#mot.includes(lettre)) {
      this.lettresTrouvees.add(lettre);
      return "bonne_tentative";
    } else {
      this.lettresRatees.add(lettre);
      this.tentatives--;
      return "mauvaise_tentative";
    }
  }
   /**
   * Retourne le mot à afficher, avec les lettres trouvées et des "_" pour le reste
   */
   afficherMot() {
    return this.#mot
      .split("") // découpe le mot en lettres individuelles
      .map((lettre) => (this.lettresTrouvees.has(lettre) ? lettre : "_")) // on parcours chaque lettre et on affiche soit la lettre soit un "_" si elle n'est pas trouvée
      .join(" "); // On rassemble le tableau obtenu, avec un espace entre chaque lettre
  }
  
  /**
   * Retourne les lettres incorrectes sous forme de tableau
   */
  getLettresRatees() {
    return [...this.lettresRatees];
  }

   /**
   * Détermine si le jeu est terminé (gagné ou perdu)
   */
   estTermine() {
    const motComplet = this.#mot.split("").every((lettre) => this.lettresTrouvees.has(lettre)); // découpe le mot en lettres et vérifie si toutes les lettres sont trouvées
    return this.tentatives <= 0 || motComplet; // le jeu est terminé si le nombre de tentatives est épuisé ou si le mot est complètement trouvé
  }

   /**
   * Retourne le nombre de tentatives restantes
   */
   afficherTentatives() {
    return this.tentatives;
  }

   /**
   * Retourne le nombre d'erreurs effectuées
   */
  getErreurs() {
    return this.maxErreurs - this.tentatives;
  }
  
  /**
   * Réinitialise l'objet pour relancer une partie (si jamais on en a besoin)
   * 
   */
  reinitialiserJeu(nouveauMot) { // Réinitialiser le jeu avec un nouveau mot
    this.#mot = nouveauMot.toLowerCase(); // passer le nouveau mot
    this.tentatives = this.maxErreurs; // réinitialiser le nombre de tentatives
    this.lettresTrouvees = new Set(); // réinitialiser les lettres trouvées
    this.lettresRatees = new Set(); // réinitialiser les lettres ratées
    this.finie = false; // réinitialiser l'état du jeu
  }
    // Permet d'afficher le mot à la fin en cas de défaite
    revelerMot() {
      return this.finie ? this.#mot : null; // retourne le mot si le jeu est terminé, sinon null
    }
    
}

