//* FETCH | Récupération et Transmission des données de l'API
/*
function getmyCart() {
  let myCart = localStorage.getItem("myCart");
  // Si mon panier n'est pas vide [...]
  if (myCart === null) {
    return [];
  } else {
    return JSON.parse(myCart);
  }
}
let itemsMyCart = getmyCart();
console.log("liste des articles dans mon panier", itemsMyCart);

fetch("http://localhost:3000/api/products")
  // Obtention des données de l'API => conversion du résultat en .json
  .then((res) => res.json())
  .then((data) => {
    // document.querySelector("#cart__items").innerHTML = "";
    const cartArea = document.querySelector("#cart__items");
    for (let i = 0; i < itemsMyCart.length; i++) {
      let id = itemsMyCart[i].id;
      let couleur = itemsMyCart[i].couleur;
      let quantite = itemsMyCart[i].quantite;
      let item = data.find((p) => id === p._id);
     

      const article = document.createElement("article");
      document.querySelector("#cart__items").appendChild(article);
      article.className = "cart__item";
      article.setAttribute("data-id", id);
      article.setAttribute("data-color", couleur);

      const Image = document.createElement("img");
      article.appendChild(Image);
      //Image.classList.add(".cart__item__img");
      Image.className = ".cart__item__img";
      Image.alt = data.altTxt;
      Image.src = data.imageUrl;

      const cardItem = document.createElement("div");
      cardItem.classList.add("cart__item__content");
      cardItem.classList.add("cart__item__img");
      cardItem.classList.add("cart__item");
  

      const description = document.createElement("cardItem");
      description.classList.add("cart__item__content__description");

      const h2 = document.createElement("h2");
      h2.textContent = data.name;

      const p = document.createElement("p");
      p.textContent = data.colors;

      const p2 = document.createElement("p");
      p2.textContent = data.price + " €";

      description.appendChild(h2);
      description.appendChild(p);
      description.appendChild(p2);

      cartArea.appendChild(cardItem);
      cartArea.appendChild(description);
      cartArea.appendChild(article);
      cartArea.appendChild(Image);
      /* cartArea.appendChild(h2);
      cartArea.appendChild(p);
      cartArea.appendChild(p2);
    }
  });*/

const cartItems = document.getElementById("cart__items");
let totalQuantity = document.getElementById("totalQuantity");
let myCart = localStorage.getItem("myCart");
let totalPrice = document.querySelector("#totalPrice");
let totalPriceCartTotal = 0;
let totalQuantiteCartTotal = 0;
const form = document.querySelector(".cart__order__form");

// créer une fonction pour obtenir le tbleau de mon panier

function getmyCart() {
  let myCart = localStorage.getItem("myCart");
  return !myCart ? [] : JSON.parse(myCart);
}

let itemsMyCart = getmyCart();
console.log("liste des articles dans mon panier", itemsMyCart);

//* FETCH | Récupération et Transmission des données de l'API
for (let item of itemsMyCart) {
  let url = `http://localhost:3000/api/products/${item.id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
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
    })
    .catch((err) => console.error(err))
    .catch((err) => console.error(err));
}
// Afficher la quantité des article dans le panier

for (let item of itemsMyCart) {
  totalQuantiteCartTotal += Number(item.quantite);
}
console.log("le nombre total de mon panier:", totalQuantiteCartTotal);
totalQuantity.textContent = totalQuantiteCartTotal;

// afficher le prix dans le panier

//UpdatetotalPrice();

// créer une fonctione pour mettre à jours le panier

/*function UpdatetotalPrice() {
  // on donne une valeur initial à totalPrice

  fetch(`http://localhost:3000/api/products/`)
    .then((res) => res.json())
    .then((data) => {
      let totalPriceCart = 0;
      let quantitePanier = 0;
      let TotalpriceItem = 0;
      for (let i = 0; i < itemsMyCart.length; i++) {
        let id = itemsMyCart[i].id;
        let a = data.find((p) => id === p._id);
        console.log("a", a);
        let quantItem = itemsMyCart[i].quantite;
        let prix = a.price;
        TotalpriceItem = quantItem * a.price;
        quantitePanier += parseInt(quantItem);
        totalPriceCart += parseInt(TotalpriceItem);
        console.log("totalPriceCart", totalPriceCart);
      }
      document.querySelector("#totalQuantity").innerHTML = quantitePanier;
      document.querySelector("#totalPrice").innerHTML = totalPriceCart;
    });
}

console.log("Total prix article", totalPrice);
//UpdatetotalPrice();
*/
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

  console.log(articleCart.quantite);

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

  // Affiche un message de confirmation de la suppression du produit
  alert("Votre article a bien été retiré de votre panier !");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(form.firstName.value);
  const infoData = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    addresse: form.address.value,
    ville: form.city.value,
    email: form.email.value,
  };
  console.log(infoData);
});
