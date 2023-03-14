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
      let cartArticle = `
          <article class="cart__item" data-id="${data.id}" data-color="${item.couleur}">
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
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>
      `;
      cartItems.insertAdjacentHTML("beforeend", cartArticle);
    })
    .catch((err) => console.error(err))
    .catch((err) => console.error(err));
}
// Afficher la quantité des article dans le panier

let totalArticles = 0;
for (let item of itemsMyCart) {
  totalArticles += Number(item.quantite);
}
console.log("le nombre total de mon panier:", totalArticles);
totalQuantity.textContent = totalArticles;

// afficher le prix dans le panier
/*
let itemPrice = itemsMyCart.price;
let totalPrice = totalArticles * itemPrice;
totalPrice = 0;

// En supposant que la  itemMyCart est toujours disponible
for (let a = 0; a < itemsMyCart.lentgh; a++) {
  totalPrice = totalArticles * itemPrice;
  totalPrice.textContent = parseInt(totalPrice);
  totalPrice += Number(totalPrice);
}
console.log("le prix total d'un article", totalPrice);

let totalProductPricePanier = [];
totalProductPricePanier += parseInt(totalPrice);
console.log("Total prix panier", totalPrice);
*/
UpdatetotalPrice();
displayTotalPrice();


let itemPrice = itemsMyCart.price;

// créer une fonctione pour mettre à jours le panier
function UpdatetotalPrice() {
  totalPrice = 0;
  for (let item in myCart) {
    totalPrice = totalPrice + item.quantite * item.Price;

    document.getElementById("totalPrice").innerText = totalPrice;
  }
  return totalPrice;
}
console.log("Total prix article", totalPrice);

// Affichage du montant total du panier

let totalProductPricePanier = 0;

function displayTotalPrice() {
  let totalProductPricePanier = document.getElementById("totalPrice");
  totalProductPricePanier.innerHTML += UpdatetotalPrice();
  totalProductPricePanier == parseInt(Number(totalPrice));
}

console.log("afficher le prix total du panier", totalProductPricePanier);
displayTotalPrice();
