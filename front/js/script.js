//--------Appel API----------------//

const url = "http://localhost:3000/api/products"; //requete de l'API afin d'importer les données des canapés demander uniquement le produit lié à l'ID

fetch(url)
  .then((res) => {
    if (res.ok) {
      console.log(res);
      res.json().then((data) => {
        /* <section class="items" id="items">
                   <a href="./product.html?id=42">
                <article>
                  <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                  <h3 class="productName">Kanap name1</h3>
                  <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                </article>
              </a> 
          </section>*/
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
