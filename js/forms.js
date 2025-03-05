const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    // Affichage du loader pendant le traitement
    result.innerHTML = '<div class="spinner-border text-success" role="status"><span class="visually-hidden">Chargement...</span></div>';

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            Swal.fire({
                title: "Envoyé avec succès !",
                text: "Votre commande a bien été enregistrée. Nous vous contacterons bientôt.",
                icon: "success",
                confirmButtonText: "OK"
            });

            result.innerHTML = ""; // Supprime le loader
        } else {
            console.log(response);
            result.innerHTML = ""; // Supprime le loader
            Swal.fire({
                title: "Erreur",
                text: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    })
    .catch((error) => {
        console.log(error);
        result.innerHTML = ""; // Supprime le loader
        Swal.fire({
            title: "Erreur",
            text: "Une erreur s'est produite lors de l'envoi. Veuillez vérifier votre connexion.",
            icon: "error",
            confirmButtonText: "OK"
        });
    })
    .then(function () {
        form.reset(); // Réinitialise le formulaire après soumission
    });
});
