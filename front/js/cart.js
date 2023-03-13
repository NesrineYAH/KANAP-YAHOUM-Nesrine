//* FETCH | Récupération et Transmission des données de l'API

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
      /*     <!-- <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
              <div class="cart__item__img">
                <img src="../images/product01.jpg" alt="Photographie d'un canapé">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>Nom du produit</h2>
                  <p>Vert</p>
                  <p>42,00 €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>-->*/

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
      // cardItem.appendChild(article);
      //cardItem.appendChild(Image);

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
      cartArea.appendChild(p2);*/
    }
  });

/*
for (let totalQuantite of myCart) {
  // Boucle sur les produits de l'API
  for (let i = 0; i < myCart.length; i++) {
    // Si id produit PANIER = id produit API
    if (canapeSelectione.id === products[a]._id) {
      // Récupération des informations manquantes
      canapeSelectione.name = products[a].name;
      canapeSelectione.price = products[a].price;
      canapeSelectione.imageUrl = products[a].imageUrl;
      canapeSelectione.altTxt = products[a].altTxt;
      canapeSelectione.description = products[a].description;
    }
  }
}*/
