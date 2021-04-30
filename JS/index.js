// Créer variables teddies
let teddies;
//Création variable résultat pour le html
const result = document.getElementById("result");
// Fonction pour récupérer les données API (fetch)


// lien temporaire si API off
/*const fetchTeddies = async() => {
    teddies = await fetch(
        "https://ab-p5-api.herokuapp.com/api/teddies").then(res => res.json());
        console.log(teddies);
};*/

const fetchTeddies = async() => {
    teddies = await fetch(
        "http://localhost:3000/api/teddies").then(res => res.json());
    console.log(teddies);
};

//Créer fonction pour modifier html
const showTeddies = async() => {
    await fetchTeddies();

    result.innerHTML = (
        teddies
        .map(teddie => (
            `
                <div class="card">
                    <img src="${teddie.imageUrl}" class="card-img-top" alt="Ours en peluche" title="Ours ${teddie.name}" aria-label="Ours ${teddie.name}" />
                    <div class="card-body">
                        <div class="description">
                            <h2 class="card-title">${teddie.name}</h2>
                            <p class="card-text">${teddie.price/100}€</p>
                        </div>

                        <a href="produit.html?id=${teddie._id}" class="btn btn-info col-6 btn-block m-auto">Voir produit</a>
                    </div>
                </div>
                `
        )).join('')
    );
};
showTeddies();