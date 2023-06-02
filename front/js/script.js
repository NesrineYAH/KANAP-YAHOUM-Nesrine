//--------Appel API----------------//
 //requete de l'API afin d'importer les données des canapés demander uniquement le produit lié à l'ID
const url = "http://localhost:3000/api/products";


fetch(url)
  .then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        for (index = 0; index < data.length; index++) {
          let lien = document.createElement("a");
          document.querySelector("#items").appendChild(lien);
          lien.href = `./product.html?id=${data[index]._id}`;

          let article = document.createElement("article");
          lien.appendChild(article);

          let image = document.createElement("img");
          article.appendChild(image);
          image.src = data[index].imageUrl;
          image.alt = data[index].altTxt;

          let titre = document.createElement("h3");
          article.appendChild(titre);
          titre.className = "productName";
          titre.textContent = data[index].name;

          let description = document.createElement("p");
          article.appendChild(description);
          description.className = "productDescription";
          description.textContent = data[index].description;
        }
      });
    } else {
      console.log("erreur de communication avec API");
    }
  })
  .catch((error) => {
    console.log(error);
  });
