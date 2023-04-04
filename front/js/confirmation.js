// URLSearchParams :
//déclare une variable valant l'url de la page actuelle

let url = new URLSearchParams(document.location.search);
let id = url.get("id");

const orderId = id;

//Affichage de l'id du produit :

const idConfirmation = document.querySelector("#orderId");

idConfirmation.innerHTML = `<span id="orderId"><strong>${orderId}</strong><br>Merci pour votre commande 😀 !</span>`;

//Nettoyage du local storage :

localStorage.clear();
