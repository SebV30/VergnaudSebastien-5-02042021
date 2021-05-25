// Créer variables teddies
let products;
//Création variable résultat pour le html
const result = document.getElementById("product");
// Fonction pour récupérer les données API (fetch)

const params = new URLSearchParams(window.location.search);
const teddieId = params.get("id");


const fetchProducts = async() => {
    products = await fetch(
        "http://localhost:3000/api/teddies" + "/" + teddieId).then(function(res) {
        res.json().then(function(data) {
            var product = data;
            result.innerHTML = (
                `
                    <div class="card card-product">
                        <img src="${product.imageUrl}" class="card-img-top" alt="Ours en peluche" title="Ours ${product.name}" aria-label="Ours ${product.name} />
                        <div class="card-body">
                            <div class="card-info">
                                <h2 class="name-price card-title">${product.name}</h2>
                                <p class="name-price card-text">${product.price/100}€</p>
                            </div>
                            <p class="prod-descrip">${product.description}</p>
                            <div class="d-md-flex d-lg-flex justify-content-around mt-2 option-choice">
                                <p>Choisissez une couleur</p>
                                <div class="pb-3">
                                    <select id="colors">
                                    </select>
                                </div>
                            </div>
                            <a href="/HTML/panier.html" id="btn-send" class="btn btn-info col-10 col-sm-5 col-md-8 col-lg-6 col-xl-8 btn-block ml-auto mr-auto mb-3">Ajouter l'article au panier</a>
                        </div>
                    </div>
                    `
            );
            let colorSelection = " ";
            const color = product.colors;
            for (let c = 0; c < color.length; c++) {
                colorSelection += `<option>${color[c]}</option>`;
            }
            const selectionColor = document.getElementById('colors');
            selectionColor.innerHTML = colorSelection;

            //Sélection Bouton "Ajouter l'article au panier"
            const sendToBasket = document.getElementById("btn-send");

            //Ecouter le bouton et envoyer au panier
            sendToBasket.addEventListener("click", (event) => {
                event.preventDefault();

                function validation() {
                    addItemCart(product);
                    //alert("Produit ajouté dans votre panier.");
                    var validate = confirm("Ce produit a été ajouté dans votre panier. \nCliquez sur 'OK'' pour aller au panier ou sur ''Annuler'' pour continuer vos achats")
                    if (validate)
                        window.location = "panier.html";
                    else
                        window.location = "index.html";
                }
                validation();

            });

        })
    })
};

fetchProducts();

//-------------------------Gestion du panier----------------------
//Récupération des données sélectionnées par l'utilisateur et envoie au panier

//Fonction d'ajout au panier
function addItemCart(item) {
    // Déclarer une variable tableau pour données dans localstorage
    let cartItem = [];
    // Récupération couleur
    //Sélection ID couleur
    let idColor = document.getElementById('colors');
    //const choiceColor = idColor;
    const choiceColor = idColor.value;
    //Créer objet stockage données
    let saveItemCart = {
            name: item.name,
            color: choiceColor,
            quantity: 1,
            _id: item._id,
            imageUrl: item.imageUrl,
            price: item.price / 100,
        }
        // Créer variable = Valeurs vraies par défaut
    let otherItem = true;
    //SI ls vide => envoyer données dans le tableau + enregistrer dans le ls
    if (localStorage.getItem('anyItem') === null) {
        cartItem.push(saveItemCart);
        localStorage.setItem('anyItem', JSON.stringify(cartItem));
    }
    // SINON récupérer le tableau du ls PUIS comparer SI les porduits sont indentiques
    else {
        cartItem = JSON.parse(localStorage.getItem('anyItem'));

        cartItem.forEach((prod) => {
            // SI produits identiques => ++qté => Variable Valeurs vraies => valeurs fausses
            if (item._id === prod._id && choiceColor === prod.color) {
                prod.quantity++;
                //SINON Valeurs vraies = Envoyer nouvelles données (push) dans le tableau
                otherItem = false;
            }
        })
        if (otherItem) cartItem.push(saveItemCart);
        localStorage.setItem('anyItem', JSON.stringify(cartItem));
    }
}