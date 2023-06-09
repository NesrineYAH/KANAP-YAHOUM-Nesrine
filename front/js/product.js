const localisation = window.location.href;
const url = new URL(localisation);
const idurl = url.searchParams.get("id");
const urlProduct = "http://localhost:3000/api/products/" + idurl;

//* Affichage du Produit
//*------------------------------------------------------------------------

fetch(urlProduct)
  .then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        document.title = data.name;

        // Image
        const image = document.createElement("img");
        document.querySelector(".item__img").appendChild(image);
        image.src = data.imageUrl;
        image.alt = data.altTxt;
        // Nom, Prix, Description

        document.querySelector("#title").innerHTML = data.name;
        document.querySelector("#price").innerHTML = data.price;
        document.querySelector("#description").innerHTML = data.description;

        // Éléments : Couleurs disponibles
        const couleur = document.querySelector("#colors");
        for (color in data.colors) {
          couleur.innerHTML += `<option value="${data.colors[color]}">${data.colors[color]}</option>`;
        }
      });
    } else {
      console.log("erreur de communication avec API");
    }
  })
  .catch((error) => {
    console.log(error);
  });

// Création addtoCart via méthode "addEventListener"

const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {
  let quantite = document.querySelector("#quantity").value;
  if (!Number.isInteger(parseFloat(quantite))) {
    alert("nombre a virgule interdit");
    return;
  }

  let couleur = document.querySelector("#colors").value;

  let canapeSelectione = {
    id: idurl,
    quantite: quantite,
    couleur: couleur,
  };

  if (quantite <= 100) {
    addProductLocalStorage(canapeSelectione);
  } else {
    alerte("votre canapeSelectionevous pouvez séléctionner un article");
  }
});

/***************      Local storage        **************/

//addProductLocalStorage(canapeSelectione);

function addProductLocalStorage(canapeSelectione) {
  if (
    canapeSelectione.couleur === null ||
    canapeSelectione.couleur === "" ||
    canapeSelectione.quantite < 1 ||
    canapeSelectione.quantite > 100
  ) {
    alert(
      "Pour valider le choix,  Veuillez renseigner une couleur, et/ou une quantité entre 1 et 100"
    );
  } else {
    let myCart = JSON.parse(localStorage.getItem("myCart"));
    if (myCart === null) {
      myCart = [];
    }
    let articleAjoute = myCart.find(
      (item) =>
        item.id === canapeSelectione.id &&
        item.couleur === canapeSelectione.couleur
    );
    if (articleAjoute) {
      let totalQuantite =
        parseInt(articleAjoute.quantite) + parseInt(canapeSelectione.quantite);
      if (totalQuantite > 100) {
        articleAjoute.quantite === articleAjoute.quantite;
        alerte(
          "la quantite choisie et la quantite du panier est superieur du 100"
        );
      } else {
        articleAjoute.quantite =
          parseInt(articleAjoute.quantite) +
          parseInt(canapeSelectione.quantite);
        alert("la quantite est à jour");
      }
    } else {
      myCart.push(canapeSelectione);
      alert("produit ajouté au panier");
    }
    localStorage.setItem("myCart", JSON.stringify(myCart));
  }
}
