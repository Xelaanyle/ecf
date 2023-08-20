const boutonToggle = document.getElementById("bouton-toggle");
const tableauNote = document.getElementById("tableau-note");
const inputs = tableauNote.querySelectorAll("tbody input");
let useColorMode = false;

boutonToggle.addEventListener("click", () => {
    boutonToggle.classList.toggle("c");
    useColorMode = boutonToggle.classList.contains("c");
    boutonToggle.textContent = useColorMode ? "Mode couleur" : "Mode note";
    inputReset();
});

inputs.forEach(input => {
    input.addEventListener("input", function () {
        const currentValue = this.value;
        
        if (useColorMode) {
            input.value = "";
            input.style.backgroundColor = couleurInput(currentValue);
        }
        
        const parentCell = input.parentElement;
        const nextRow = parentCell.parentElement.nextElementSibling;
        if (nextRow) {
            const nextInput = nextRow.querySelector("input");
            if (nextInput) {
                // Validation avec regex
                const isValidNote = /^[1-5]$/.test(currentValue);
                if (useColorMode && !isValidNote) {
                    alert("Veuillez entrer une valeur entre 1 et 5.");
                    return;
                }
                
                nextInput.focus();
            }
        }
    });
    
    input.addEventListener("blur", function () {
        if (useColorMode) {
            input.value = "";
        }
    });
});

function couleurInput(value) {
    switch (value) {
        case "1": return "red";
        case "2": return "orange";
        case "3": return "yellow";
        case "4": return "green";
        default: return "white";
    }
}

function inputReset() {
    inputs.forEach(input => {
        if (useColorMode) {
            input.value = "";
            input.style.backgroundColor = couleurInput(input.value);
        } else {
            input.style.backgroundColor = "white";
        }
        input.removeAttribute("hidden"); 
    });
}
