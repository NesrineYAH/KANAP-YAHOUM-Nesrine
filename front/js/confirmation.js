// URLSearchParams :
//déclare une variable valant l'url de la page actuelle
let url = new URL(location.href);
let orderIdKanap = url.searchParams.get("orderId");

//Affichage de l'id du produit :

const idConfirmation = document.querySelector("#orderId");

idConfirmation.innerHTML = `<span id="orderId"><strong>${orderIdKanap}</strong><br>Merci pour votre commande 😀 !</span>`;

//on vide le local storage :

localStorage.clear();
