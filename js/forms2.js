const form = document.getElementById("contactForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collecte des données du formulaire
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Affichage du loader pendant l'envoi
    result.innerHTML = '<div class="spinner-border text-success" role="status"><span class="visually-hidden">Chargement...</span></div>';

    // Envoi des données au serveur via Fetch avec méthode POST
    fetch("https://api.web3forms.com/submit", {
        method: "POST", // Utilisation de la méthode POST
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    })
    .then(async (response) => {
        let jsonResponse = await response.json();
        
        if (response.status === 200) {
            // Affichage du message de succès
            Swal.fire({
                title: "Envoyé avec succès !",
                text: "Votre message a bien été envoyé. Nous vous répondrons bientôt.",
                icon: "success",
                confirmButtonText: "OK"
            });
            result.innerHTML = ""; // Supprimer le loader
        } else {
            // En cas d'erreur avec la réponse
            console.log(jsonResponse);
            result.innerHTML = ""; // Supprimer le loader
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
        result.innerHTML = ""; // Supprimer le loader
        Swal.fire({
            title: "Erreur",
            text: "Une erreur s'est produite lors de l'envoi. Veuillez vérifier votre connexion.",
            icon: "error",
            confirmButtonText: "OK"
        });
    })
    .then(function () {
        // Réinitialisation du formulaire après soumission
        form.reset();
    });
});
