// Attendez que le contenu de la page soit chargé
document.addEventListener("DOMContentLoaded", () => {
    // Sélectionnez les éléments HTML nécessaires
    const boutonToggle = document.getElementById("bouton-toggle");
    const tableauNote = document.getElementById("tableau-note");
    const boutonsReset = document.querySelectorAll(".reset-button");
    const inputsDevoir1 = tableauNote.querySelectorAll(".devoir1-input");
    const inputsDevoir2 = tableauNote.querySelectorAll(".devoir2-input");
    const boutonReset = document.getElementById("bouton-reset");
    let modeCouleur = true;

    // Fonction pour associer une couleur à une valeur
    function couleurValeur(valeur) {
        switch (valeur) {
            case "1": return "red";
            case "2": return "orange";
            case "3": return "yellow";
            case "4": return "green";
            default: return "green";
        }
    }

    // Fonction pour réinitialiser les saisies
    function reinitialiserSaisies(inputs) {
        inputs.forEach(input => {
            const storageKey = modeCouleur ? "valeurs_couleur" : "valeurs_note";
            const storedValue = localStorage.getItem(`${input.id}_${storageKey}`);

            if (modeCouleur) {
                input.value = "";
                if (storedValue !== null) {
                    input.style.backgroundColor = couleurValeur(storedValue);
                } else {
                    input.style.backgroundColor = "green";
                }
            } else {
                if (storedValue !== null) {
                    input.value = storedValue;
                    input.style.backgroundColor = "white";
                } else {
                    input.value = "";
                    input.style.backgroundColor = "white";
                }
            }
            input.removeAttribute("hidden");
        });
    }

    // Écouteur pour le bouton de basculement entre le mode couleur et le mode note
    boutonToggle.addEventListener("click", () => {
        modeCouleur = !modeCouleur;
        console.log("mode couleur : " + modeCouleur);
        boutonToggle.textContent = modeCouleur ? "Mode couleur" : "Mode note";
        reinitialiserSaisies([...inputsDevoir1, ...inputsDevoir2]);
    });

    // Écouteurs pour les boutons de réinitialisation
    boutonsReset.forEach(boutonReset => {
        boutonReset.addEventListener("click", () => {
            const devoir = boutonReset.getAttribute("data-devoir");
            const inputs = devoir === "devoir1" ? inputsDevoir1 : inputsDevoir2;

            inputs.forEach(input => {
                const storageKey = modeCouleur ? `${input.id}_valeurs_couleur` : `${input.id}_valeurs_note`;
                const storageKeyDevoir1 = `${input.id}_valeurs_couleur`;
                const storageKeyDevoir2 = `${input.id}_valeurs_note`;

                localStorage.removeItem(storageKeyDevoir1);
                localStorage.removeItem(storageKeyDevoir2);
                localStorage.removeItem(storageKey);

                if (modeCouleur) {
                    input.style.backgroundColor = couleurValeur(input.value);
                } else {
                    input.value = "";
                    input.style.backgroundColor = "white";
                }
            });
            reinitialiserSaisies([...inputsDevoir1, ...inputsDevoir2])
            localStorage.removeItem("valeurs_couleur");
            localStorage.removeItem("valeurs_note");
        });
    });

    // Écouteur pour le bouton de réinitialisation générale
    boutonReset.addEventListener("click", () => {
        [...inputsDevoir1, ...inputsDevoir2].forEach(input => {
            const storageKeyDevoir1 = `${input.id}_valeurs_couleur`;
            const storageKeyDevoir2 = `${input.id}_valeurs_note`;

            localStorage.removeItem(storageKeyDevoir1);
            localStorage.removeItem(storageKeyDevoir2);

            if (modeCouleur) {
                input.style.backgroundColor = couleurValeur(input.value);
            } else {
                input.value = "";
                input.style.backgroundColor = "white";
            }
        });

        localStorage.removeItem("valeurs_couleur");
        localStorage.removeItem("valeurs_note");
    });

    // Écouteurs pour les saisies du devoir 1
    inputsDevoir1.forEach(input => {
        input.addEventListener("keydown", function (event) {
            // Gérer les touches spécifiques pour attribuer une valeur
            if (event.key === "&") {
                event.preventDefault();
                this.value = "1";
                this.dispatchEvent(new Event("input"));
            } else if (event.key === "é") {
                event.preventDefault();
                this.value = "2";
                this.dispatchEvent(new Event("input"));
            } else if (event.key === '"') {
                event.preventDefault();
                this.value = "3";
                this.dispatchEvent(new Event("input"));
            } else if (event.key === "'") {
                event.preventDefault();
                this.value = "4";
                this.dispatchEvent(new Event("input"));
            } else if (event.key === "(") {
                event.preventDefault();
                this.value = "5";
                this.dispatchEvent(new Event("input"));
            }
        });

        // Écouteur pour gérer les saisies et le changement de champ
        input.addEventListener("input", function () {
            const valeurActuelle = this.value;
            const storageKey = modeCouleur ? "valeurs_couleur" : "valeurs_note";

            if (modeCouleur) {
                const valideCouleur = /^[1-4]$|^$/.test(valeurActuelle);
                if (!valideCouleur) {
                    alert("Veuillez entrer une valeur entre 1 et 4 pour la couleur.");
                    input.value = "";
                    return;
                }
                input.style.backgroundColor = couleurValeur(valeurActuelle);
                champSuivant(input, inputsDevoir1);
            } else {
                const valideNote = /^[1-5]$|^$/.test(valeurActuelle);
                if (!valideNote) {
                    alert("Veuillez entrer une valeur entre 1 et 5 pour la note.");
                    input.value = "";
                    return;
                }
                champSuivant(input, inputsDevoir1);
            }
            localStorage.setItem(`${input.id}_${storageKey}`, valeurActuelle);
            setTimeout(() => {
                input.blur();
            }, 1000);
        });

        // Écouteur pour gérer le flou de l'input
        input.addEventListener("blur", () => {
            if (modeCouleur) {
                input.value = "";
            }
        });
    });

    // Écouteurs pour les saisies du devoir 2
    inputsDevoir2.forEach(input => {
        input.addEventListener("keydown", function (event) {
            // Gérer les touches spécifiques pour attribuer une valeur
            if (event.key === "&") {
                event.preventDefault();
                this.value = "1";
                this.dispatchEvent(new Event("input"));
            } else if (event.key === "é") {
                event.preventDefault();
                this.value = "2";
                this.dispatchEvent(new Event("input"));
            } else if (event.key === '"') {
                event.preventDefault();
                this.value = "3";
                this.dispatchEvent(new Event("input"));
            } else if (event.key === "'") {
                event.preventDefault();
                this.value = "4";
                this.dispatchEvent(new Event("input"));
            } else if (event.key === "(") {
                event.preventDefault();
                this.value = "5";
                this.dispatchEvent(new Event("input"));
            }
        });

        // Écouteur pour gérer les saisies et le changement de champ
        input.addEventListener("input", function () {
            const valeurActuelle = this.value;
            const storageKey = modeCouleur ? "valeurs_couleur" : "valeurs_note";

            if (modeCouleur) {
                const valideCouleur = /^[1-4]$|^$/.test(valeurActuelle);
                if (!valideCouleur) {
                    alert("Veuillez entrer une valeur entre 1 et 4 pour la couleur.");
                    input.value = "";
                    return;
                }
                input.style.backgroundColor = couleurValeur(valeurActuelle);
                champSuivant(input, inputsDevoir2);
            } else {
                const valideNote = /^[1-5]$|^$/.test(valeurActuelle);
                if (!valideNote) {
                    alert("Veuillez entrer une valeur entre 1 et 5 pour la note.");
                    input.value = "";
                    return;
                }
                champSuivant(input, inputsDevoir2);
            }
            localStorage.setItem(`${input.id}_${storageKey}`, valeurActuelle);
            setTimeout(() => {
                input.blur();
            }, 1000);
        });

        // Écouteur pour gérer le flou de l'input
        input.addEventListener("blur", () => {
            if (modeCouleur) {
                input.value = "";
            }
        });
    });

    // Fonction pour passer au champ suivant
    function champSuivant(input, inputs) {
        const index = Array.from(inputs).indexOf(input);

        if (index >= 0 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    }
});
