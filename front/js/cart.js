//* FETCH | Récupération et Transmission des données de l'API

const cartItems = document.getElementById("cart__items");
let totalQuantity = document.getElementById("totalQuantity");
let myCart = localStorage.getItem("myCart");
let totalPrice = document.querySelector("#totalPrice");
let totalPriceCartTotal = 0;
let totalQuantiteCartTotal = 0;
const form = document.querySelector(".cart__order__form");
const btnCommander = document.querySelector("#order");

// créer une fonction pour obtenir le tbleau de mon panier

function getmyCart() {
  let myCart = localStorage.getItem("myCart");
  return !myCart ? [] : JSON.parse(myCart);
}

let itemsMyCart = getmyCart();

//* FETCH | Récupération et Transmission des données de l'API
for (let item of itemsMyCart) {
  let url = `http://localhost:3000/api/products/${item.id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // afficher le prix dans le panier
      totalPriceCartTotal += parseInt(item.quantite) * parseInt(data.price);
      totalPrice.innerHTML = totalPriceCartTotal;

      let cartArticle = `
          <article class="cart__item" data-id="${item.id}" data-color="${item.couleur}">
            <div class="cart__item__img">
              <img src="${data.imageUrl}" alt="${data.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${item.couleur}</p>
                <p>${data.price}€</p>
                </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantite}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem" onclick="removeProduct('${item.id}','${item.couleur}', this, ${data.price})">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;
      cartItems.insertAdjacentHTML("beforeend", cartArticle);
      setupQuantity();
    })

    .catch((err) => console.error(err))
    .catch((err) => console.error(err));
}
// Afficher la quantité des article dans le panier

for (let item of itemsMyCart) {
  totalQuantiteCartTotal += Number(item.quantite);
}
totalQuantity.textContent = totalQuantiteCartTotal;

//créer une fonction pour supprimer des articles dans le panier

function removeProduct(deleteId, deleteColor, element, price) {
  let myCart = JSON.parse(localStorage.getItem("myCart"));
  // Enregistre l'ID et la couleur du produit à supprimer

  // Filtre les  produits à conserver dans le panier et supprime le produit cliqué

  //update la quantite
  let index = myCart.findIndex(
    (p) => p.id === deleteId && p.couleur === deleteColor
  );

  if (index === -1) {
    return;
  }

  let articleCart = myCart[index];

  //update le prix total
  totalPriceCartTotal =
    totalPriceCartTotal - parseInt(articleCart.quantite) * price;
  totalPrice.innerHTML = totalPriceCartTotal;

  totalQuantity.innerHTML = totalQuantiteCartTotal - articleCart.quantite;
  myCart = myCart.filter(
    (element) => element.id !== deleteId && element.couleur !== deleteColor
  );

  // Mettre à jour le LocalStorage avec les produits restants
  localStorage.setItem("myCart", JSON.stringify(myCart));

  //récuperation du bloc article pour le supprimer
  element.parentElement.parentElement.parentElement.parentElement.remove();

  // Affiche un message d'information de la suppression du produit
  alert("Vous allez retirer cet article de votre panier !");
  // Affiche un message de confirmation de la suppression du produit
  alert("votre article a bien été supprimé de votre panier");
}

// Formulaire : Bouton "Commander"

function setupQuantity() {
  let itemsMyCart = getmyCart();
  let inputQuantiteModifie = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < inputQuantiteModifie.length; i++) {
    inputQuantiteModifie[i].addEventListener("change", () => {
      let oldQuantity = itemsMyCart[i].quantite;

      let newQuantity = inputQuantiteModifie[i].value;

      if (newQuantity > 100) {
        alert("Non pas plus de 100");
      } else if (newQuantity <= 0) {
        alert("Mettre article plus de 0");
      } else if (!Number.isInteger(parseFloat(newQuantity))) {
        alert("nombre a virgule interdit");
        return;
      } else {
        let quantiteFinal = itemsMyCart.find(
          (p) => p.newQuantity !== oldQuantity
        );
        quantiteFinal.quantite = newQuantity;
        localStorage.setItem("myCart", JSON.stringify(itemsMyCart));
        alert("mise à jour quantite");
      }
      return location.reload();
    });
  }
}

btnCommander.addEventListener("click", (e) => {
  e.preventDefault();

  const infoData = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  // Créer une fonction pour valider le champ Prénom
  function validationFirstName() {
    let firstName = infoData.firstName;
    const firstNameError = document.querySelector("#firstNameErrorMsg");
    const inputFirstName = document.querySelector("#firstName");
    const regexFirstName = new RegExp(
      /^[a-zA-ZÀ-ÿ]{2,35}([-' ,][a-zA-ZÀ-ÿ]+)*$/i
    );

    if (regexFirstName.test(firstName)) {
      firstNameError.innerHTML = "";
      inputFirstName.style.border = "2px solid green";
      return true;
    } else {
      firstNameError.innerHTML =
        "Erreur de votre prenon, 2 lettres minimum, aucun chiffre";
      inputFirstName.style.border = "2px solid red";
      return false;
    }
  }
  // Créer une fonction pour valider le champ Nom

  function validationLastName() {
    let lastName = infoData.lastName;
    const lastNameError = document.querySelector("#lastNameErrorMsg");
    const inputlastName = document.querySelector("#lastName");
    const regexlastName = new RegExp(
      /^[a-zA-ZÀ-ÿ]{2,35}([-' ,][a-zA-ZÀ-ÿ]+)*$/i
    );

    if (regexlastName.test(lastName)) {
      lastNameError.innerHTML = "";
      inputlastName.style.border = "2px solid green";
      return true;
    } else {
      lastNameError.innerHTML =
        "Erreur de votre prenon, 2 lettres minimum, aucun chiffre";
      inputlastName.style.border = "2px solid red";
      return false;
    }
  }
  // Créer une fonction pour valider le champ Addresse
  function validationAddress() {
    let address = infoData.address;
    const addressError = document.querySelector("#addressErrorMsg");
    const inputAddress = document.querySelector("#address");
    const regexAddress = new RegExp(
      /^\d{1,3}( bis| ter| quater)? (rue|avenue|boulevard|route|chemin|impasse) [a-zA-ZÀ-ÿ]+$/i
    );

    if (regexAddress.test(address)) {
      addressError.innerHTML = "";
      inputAddress.style.border = "2px solid green";
      return true;
    } else {
      addressError.innerHTML =
        "Merci de renseigner une adresse valide (Numéro, voie, nom de la voie)";
      inputAddress.style.border = "2px solid red";
      return false;
    }
  }
  // Créer une fonction pour valider le champ ville
  function validationVille() {
    let city = infoData.city;
    const cityErrorMsg = document.querySelector("#cityErrorMsg");
    const inputCity = document.querySelector("#city");
    const regexCity = new RegExp(
      /^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/
    );

    if (regexCity.test(city)) {
      cityErrorMsg.innerHTML = "";
      inputCity.style.border = "2px solid green";
      return true;
    } else {
      cityErrorMsg.innerHTML =
        "Erreur veuillez remplir votre ville correctement";
      inputCity.style.border = "2px solid red";
      return false;
    }
  }
  // Créer une fonction pour valider le champ Email
  function validationEmail() {
    let email = infoData.email;
    const emailError = document.querySelector("#emailErrorMsg");
    const inputEmail = document.querySelector("#email");
    const regexemail = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
    );

    if (regexemail.test(email)) {
      emailError.innerHTML = "";
      inputEmail.style.border = "2px solid green";
      return true;
    } else {
      emailError.innerHTML =
        "Votre address mail est érroné ,veuillez entrer une adresse mail exacte";
      inputEmail.style.border = "2px solid red";
      return false;
    }
  }

  //Contrôle validité formulaire avant envoie dans le locale storage :
  if (
    firstName === null ||
    lastName === null ||
    address === null ||
    city === null ||
    email === null
  ) {
    alert("merci de remplir les champs de formulaire");
  } else if (
    validationFirstName() === false ||
    validationLastName() === false ||
    validationAddress() === false ||
    validationVille() === false ||
    validationEmail() === false
  ) {
    alert("❌ Veuillez bien remplir le formulaire ❌");
  } else {
    console.log("formaulaire ok");
    sendFromToServer();
  }

  /********************************FIN GESTION DU FORMULAIRE ****************************/

  // Variable qui récupère l'orderId envoyé comme réponse par le serveur lors de la requête POST :

  let orderId = "";
  // création d'une fonction pour envoyer à l'API l'objet data et récupérer l'id de commande
  function sendFromToServer() {
    let lesProduits = itemsMyCart.map((i) => i.id);
    const data = {
      contact: infoData,
      products: lesProduits,
    };

    if (lesProduits.length > 0) {
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        // Ensuite on stock la réponse de l'api (orderId) :
        .then((response) => {
          return response.json();
        })

        .then((server) => {
          orderId = server.orderId;
          // Si la variable orderId n'est pas une chaîne vide on redirige notre utilisateur sur la page confirmation avec la variable :
          if (orderId != "") {
            alert("✅ Votre commande à bient était prise en compte ✅");
            location.href = "confirmation.html?id=" + orderId;
          }
        });
    } else {
      alert("Votre est panier est vide");
    }
  }
});
