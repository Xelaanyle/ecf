
const tableauNote = document.getElementById("tableau-note");
const inputs = tableauNote.querySelectorAll("input");
let modeCouleur = true;

function couleurValeur(valeur) {
    switch (valeur) {
        case "1": return "red";
        case "2": return "orange";
        case "3": return "yellow";
        case "4": return "green";
        default: return "green";
    }
}

function reinitialiserSaisies() {
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

function champSuivant(input) {
    const colonneParent = input.parentElement;
    const ligneSuivante = colonneParent.parentElement.nextElementSibling;
    if (ligneSuivante) {
        const prochaineSaisie = ligneSuivante.querySelector("input");
        if (prochaineSaisie) {
            prochaineSaisie.focus();
        }
    }
};

const boutonToggle = document.getElementById("bouton-toggle");
boutonToggle.addEventListener("click", () => {
    modeCouleur = !modeCouleur;
    console.log("mode couleur : " + modeCouleur)
    boutonToggle.textContent = modeCouleur ? "Mode couleur" : "Mode note";
    reinitialiserSaisies();
});

const boutonReset = document.getElementById("bouton-reset");
boutonReset.addEventListener("click", () => {
    inputs.forEach(input => {
        const storageKey = modeCouleur ? `${input.id}_valeurs_couleur` : `${input.id}_valeurs_note`;
        
        localStorage.removeItem(storageKey);
        
        if (modeCouleur) {
            input.style.backgroundColor = couleurValeur(input.value);
        } else {
            input.value = "";
            input.style.backgroundColor = "white";
        }
    });
});

inputs.forEach(input => {
    input.addEventListener("keydown", function(event) {
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
        }
        else if (event.key === "(") {
            event.preventDefault();
            this.value = "5";
            this.dispatchEvent(new Event("input"));
        }
    });
});

inputs.forEach(input => {
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
            champSuivant(input);
        } else {
            const valideNote = /^[1-5]$|^$/.test(valeurActuelle);
            if (!valideNote) {
                alert("Veuillez entrer une valeur entre 1 et 5 pour la note.");
                input.value = "";
                return;
            }
            champSuivant(input);
        }
        localStorage.setItem(`${input.id}_${storageKey}`, valeurActuelle);
        setTimeout(() => {
            input.blur();
        }, 1000);
    });

    input.addEventListener("blur", () => {
        if (modeCouleur) {
            input.value = "";
        }
    });
});
