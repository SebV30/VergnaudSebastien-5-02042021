//Récupération produits LS
cartItem = JSON.parse(localStorage.getItem('anyItem'));

//Si panier vide => retour index
function basketEmpty() {
    if (cartItem === null) {
        alert("ATTENTION : Votre panier est vide. \n Cliquez sur ''OK'' pour revenir à l'accueil.")
        window.location = "index.html";
    }
}

basketEmpty();

//console.log(cartItem);

//Création d'un tableau
let itemBasket = [];

/*
    {
        'firsName' : 'prenom',
        'lastName' : 'nom',
        'address' : 'ton adresse',
        'city' : 'ville',
        'email' : 'monmail@gmail.com',
        'product_id' : ['AdaDadeoz', '5135cez1c'...]
    }
*/

let products = []

//Boucle FOR
for (b = 0; b < cartItem.length; b++) {
    //console.log("j'ai " + cartItem.length + " articles");
    let basketFilling = document.getElementById('basket');
    basketFilling.innerHTML += `
    <td><a href="produit.html?id=${cartItem[b]._id}"><img src="${cartItem[b].imageUrl}" class="img-article" alt="Ours en peluche" ></a></td>
    <td>${cartItem[b].name}<br>${cartItem[b].color}</td>
    <td class="d-flex-inline justify-content-around">${cartItem[b].quantity}</td>
    <td>${(cartItem[b].price * cartItem[b].quantity)} €</td>
    `
    products.push(cartItem[b]._id)
}
//--------------------------- Modif Bouton "trash" sur chaque ligne ---------------------
/*<button class = "clear" title = "Supprimer cet article" aria - label = "Supprimer cet article" ><i class="fas fa-trash-alt"></i></button>*/
//************************** FIN Modif Bouton "trash" sur chaque ligne ********************

//==========================  PRIX TOTAL + SUPPRESSION PANIER ============================

const basketTotalClear = document.getElementById("sum-del");
basketTotalClear.innerHTML = `
<tr>
<td colspan="3">Montant total de la commande</td>
<td id="totalBasketPrice"></td>
</tr>
<tr>
<td colspan="3">Vider le panier.</td>
<td><button class="clear" title="Supprimer le contenu de votre panier" aria-label="Supprimer le contenu de votre panier"><i class="fas fa-trash-alt"></i></button></td>
</tr>
`;
//-------------------------- BOUTON POUR VIDER TOTALEMENT LE PANIER ----------------------
//Sélection de la référence du bouton class="clear"
const clear = document.querySelector(".clear");

//Suppression de la key "anyItem" du LS pour, entièrement, vider le panier
clear.addEventListener("click", (e) => {
    e.preventDefault;

    //Méthode removeItem pour vider le LS
    localStorage.removeItem("anyItem");

    //alert() pour confirmer que le panier a été vidé
    alert("Votre panier a été vidé");

    //Redirection vers la page "Accueil"
    window.location.href = "index.html";
});

//*********************** FIN BOUTON POUR VIDER TOTALEMENT LE PANIER *********************

//----------------------------CALCUL PRIX TOTAL DU PANIER-----------------------

//Déclaration de la variable pour y mettre les prix des articles présents dans le panier
let totalPrice = [];

//Aller cherche les prix dans le panier
let basketPrice = 0;
for (p = 0; p < cartItem.length; p++) {
    basketPrice = cartItem[p].price * cartItem[p].quantity;

    //Mettre les prix du panier dans la variable "totalPrice"
    totalPrice.push(basketPrice);
    console.log(totalPrice);
}
//Additionner les prix du tableau "totalPrice" avec la méthode .reduce
let total = 0;
const reducer = (accumulator, currentValue) => accumulator + currentValue;
total = totalPrice.reduce(reducer, 0);
console.log(total);

//Le code HTML du prix à afficher
const totalBasketPriceHtml = document.getElementById("totalBasketPrice");
totalBasketPriceHtml.innerHTML = `
${total} €
`;

//**************************** FIN PRIX TOTAL + SUPPRESSION PANIER ***********************

//--------------------------- MISE EN PLACE ET ENVOI DU FORMULAIRE -----------------------
/*Ligne à mettre sous les input
<small id="smallFirstName" class="text-success"></small>*/

const form = document.getElementById("form");
form.innerHTML = `
<h2>Veuillez remplir le formulaire pour passer votre commande.</h2>
<div class="row justify-content-center">
    <div class="col-6">
        <label for="first-name">Nom</label>
        <input type="text" class="form-control text-center" id="last-name" placeholder="DUPONT" required>
        
    </div>
</div>
<div class="row justify-content-center">
    <div class="col-6">
        <label for="last-name">Prénom</label>
        <input type="text" class="form-control text-center" id="first-name" placeholder="Martin" required>
    </div>
</div>
<div class="form-row justify-content-center">
    <div class="form-group col-md-6">
        <label for="inputEmail4">Email</label>
        <input type="email" class="form-control text-center" id="inputEmail4" placeholder="dupont.martin@servicemail.com" required>
    </div>
</div>
<div class="form-row justify-content-center">
    <div class="form-group col-md-6">
        <label for="inputAddress">Adresse</label>
        <input type="text" class="form-control text-center" id="inputAddress" placeholder="55 Rue du Faubourg Saint-Honoré" required>
    </div>
</div>
<div class="form-row justify-content-center">
    <div class="form-group col-md-6">
        <label for="inputAddress2">Complément d'adresse</label>
        <input type="text" class="form-control text-center" id="inputAddress2" placeholder="Bâtiment, Appartement, Chez ...etc">
    </div>
</div>
<div class="form-row justify-content-center">
    <div class="form-group col-md-2">
        <label for="inputZip">Code Postal</label>
        <input type="text" class="form-control text-center" id="inputZip" placeholder="75008" required>
    </div>
    <div class="form-group col-md-4">
        <label for="inputCity">Ville</label>
        <input type="text" class="form-control text-center" id="inputCity" placeholder="PARIS" required>
    </div>
</div>
<button type="submit" id="sendForm" class="btn btn-info mt-3 mb-5 m-auto">Valider ce panier ET passer la
    commande</button>
`;

// addEventListener bouton confirmation commande
const sendForm = document.getElementById("sendForm");
sendForm.addEventListener("click", (e) => {
    e.preventDefault();

    // Mettre les valeurs du formulaire dans un objet
    const contact = {
            firstName: document.getElementById("first-name").value, // ==> regex FormValues
            lastName: document.getElementById("last-name").value, // ==> regex FormValues
            city: document.getElementById("inputCity").value, // ==> regex FormValues
            address: document.getElementById("inputAddress").value, // ==> regex FormAddValues
            email: document.getElementById("inputEmail4").value,
        }
        //console.log(formValues);
        //---------------------------------------- VERIFICATION DONNES SAISES DANS LE FORMULAIRES ---------------------------------

    const formSuit = {
        adresse2: document.getElementById("inputAddress2").value, // ==> regex FormAddValues
        codePostal: document.getElementById("inputZip").value,
    }

    //CONSTANTES DONNEES FORMULAIRE
    const lastName = contact.lastName;
    const firstName = contact.firstName;
    const ville = contact.city;
    const email = contact.email;
    const address = contact.address;
    const address2 = formSuit.adresse2;
    const codePostal = formSuit.codePostal;

    /****************** VERIFICATION DONNEE : NOM + PRENOM + VILLE **************/
    const regexFormvalues = (value) => {
        return /^[A-Za-z\s-ÀÂÄÇÈÉÊËÎÏÔÖÙÛÜàâäçéèêëîïôöùûü]{2,20}$/.test(value);
    };

    /*
    modif return pour ajouter texte ""valide" ou non
    return document.getElementById("smallFirstName").innerHTML = `
    Case FAUSSE
    `;
    small.classList.add("text-success"); => TRUE
    smallclassList.remove("text-danger") => TRUE
    small.classList.add("text-danger"); => FALSE
    smallclassList.remove("text-success") => FALSE
    VOIR POUR "TOGGLE"
    */

    function lastNameControl() {
        if (regexFormvalues(lastName)) {
            console.log("nom valide")
            return true;
        } else {
            alert("De 3 à 20 caractères.\nChiffres et caratères spéciaux interdits")
            console.log("nom invalide")
            return false;
        }
    };

    function firstNameControl() {
        if (regexFormvalues(firstName)) {
            console.log("prénom valide")
            return true;
        } else {
            alert("De 3 à 20 caractères en majuscule.\nChiffres et caratères spéciaux interdits")
            console.log("prénom invalide")
            return false;
        }
    };

    function villeControl() {
        if (regexFormvalues(ville)) {
            console.log("ville valide")
            return true;
        } else {
            //alert("De 3 à 20 caractères.\nChiffres et caratères spéciaux interdits")
            console.log("ville invalide")
            return false;
        }
    };
    /****************** VERIFICATION DONNEE : EMAIL **************/

    const regexEmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g.test(value);
    };

    function emailControl() {
        if (regexEmail(email)) {
            console.log("e-mail valide")
            return true;
        } else {
            alert("E-mail non valide")
            console.log("e-mail invalide")
            return false;
        }
    };
    /****************** VERIFICATION DONNEE : ADRESSE + COMPLEMENT **************/

    const regexFormAddvalues = (value) => {
        return /^[A-Za-z0-9\s-,'ÀÂÄÇÈÉÊËÎÏÔÖÙÛÜàâäçéèêëîïôöùûü]{0,50}$/.test(value);
    }

    function addressControl() {
        if (regexFormAddvalues(address)) {
            console.log("address valide")
            return true;
        } else {
            //alert("De 0 à 50 caractères.\nChiffres et caratères spéciaux interdits")
            console.log("address invalide")
            return false;
        }
    };

    function address2Control() {
        if (regexFormAddvalues(address2)) {
            console.log("Comp add valide")
            return true;
        } else {
            //alert("De 0 à 50 caractères.\nChiffres et caratères spéciaux interdits")
            console.log("Comp add invalide")
            return false;
        }
    };

    /****************** VERIFICATION DONNEE : CODE POSTAL **************/

    const regexCodePostal = (value) => {
        return /^[0-9]{5}$/.test(value);
    };

    function codePostalControl() {
        if (regexCodePostal(codePostal)) {
            console.log("zip valide")
            return true;
        } else {
            alert("Le code postal est composé de 5 chiffres")
            console.log("zip invalide")
            return false;
        }
    };

    // Contrôle validité formulaire avant envoie dans LS
    if (lastNameControl() && firstNameControl() && emailControl() && addressControl() && address2Control() && codePostalControl() && villeControl()) {
        //Mettre l'objcet "formValues" dans le LS
        localStorage.setItem("contact", JSON.stringify(contact));
        //Mettre les "valeurs formulaire" et "porduits panier" dans un objet
        const toSend = JSON.stringify({
            products,
            contact
        });

        console.log(toSend);

        //Envoie de "toSend" au serveur
        fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: toSend //variables à envoyer au serveur
            })
            .then(response => {
                return response.json(); //Réponse renvoyée par le serveur au format json
            })
            .then(result => { //Résultat attendu
                localStorage.setItem("receive", JSON.stringify(result.contact)); //Retour données "contact" du formulaire
                localStorage.setItem("order", JSON.stringify(result.orderId)); //retour de l'Id commande fournie par le serveur
                localStorage.setItem("total", JSON.stringify(total)); //Retour du montant de la commande récupéré dans les données du panier (calcul du prix total)
                localStorage.removeItem("contact"); //suppression des données renseignées par l'utilisateur du LS
                localStorage.removeItem("anyItem"); //suppression des produits ajoutés au panier par l'utilisateur du LS
                window.location.replace("confirmation.html") //redirection de l'utilisateur vers la page de confirmation
            })
            .catch(error => {
                console.log(error); //Message à afficher en cas d'erreur lors du fetch 
            });

    } else {
        alert("Veillez à bien remplir le formulaire") //Si données formulaire non conforme aux REGEX
    }

    //*************************************** FIN - VERIFICATION DONNES SAISES DANS LE FORMULAIRES *****************************



});