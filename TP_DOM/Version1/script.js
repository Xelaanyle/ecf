const boutonToggle = document.getElementById("bouton-toggle");
const tableauNote = document.getElementById("tableau-note");
const inputs = tableauNote.querySelectorAll("input");
let modeCouleur = true;

boutonToggle.addEventListener("click", () => {
    modeCouleur = !modeCouleur;
    console.log("mode couleur : " + modeCouleur)
    boutonToggle.textContent = modeCouleur ? "Mode couleur" : "Mode note";
    reinitialiserSaisies();
});

inputs.forEach(input => {
    input.addEventListener("input", function () {
        const valeurActuelle = this.value;
        
        if (modeCouleur) {
            const valideCouleur = /^[1-4]$/.test(valeurActuelle);
            if (!valideCouleur) {
                alert("Veuillez entrer une valeur entre 1 et 4 pour la couleur.");
                input.value = "";
                return;
            }
            
            input.style.backgroundColor = couleurPourValeur(valeurActuelle);

            const celluleParente = input.parentElement;
            const ligneSuivante = celluleParente.parentElement.nextElementSibling;
            if (ligneSuivante) {
                const prochaineSaisie = ligneSuivante.querySelector("input");
                if (prochaineSaisie) {
                    prochaineSaisie.focus();
                }
            }
        } else {
            const valideNote = /^[1-5]$/.test(valeurActuelle);
            if (!valideNote) {
                alert("Veuillez entrer une valeur entre 1 et 5 pour la note.");
                input.value = "";
                return;
            }
            
            const colonneParente = input.parentElement;
            const ligneSuivante = colonneParente.parentElement.nextElementSibling;
            if (ligneSuivante) {
                const prochaineSaisie = ligneSuivante.querySelector("input");
                if (prochaineSaisie) {
                    prochaineSaisie.focus();
                }
            }
        }
    });
    
    input.addEventListener("blur", () => {
        if (modeCouleur) {
            input.value = "";
        }
    });
});

function couleurPourValeur(valeur) {
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
        if (modeCouleur) {
            input.value = "";
            input.style.backgroundColor = couleurPourValeur(input.value);
        } else {
            input.style.backgroundColor = "white";
        }
        input.removeAttribute("hidden"); 
    });
}
