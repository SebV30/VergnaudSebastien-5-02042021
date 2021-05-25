// Créer variables teddies
let teddies;
//Création variable résultat pour le html
const result = document.getElementById("result");
// Fonction pour récupérer les données API (fetch)

const fetchTeddies = async() => {
    teddies = await fetch(
        "http://localhost:3000/api/teddies").then(res => res.json());
};

//Créer fonction pour modifier html
const showTeddies = async() => {
    await fetchTeddies();

    result.innerHTML = (
        teddies
        .map(teddie => (
            `
                <div class="card">
                    <img src="${teddie.imageUrl}" class="card-img-top img_index" alt="Ours en peluche" title="Ours ${teddie.name}" aria-label="Ours ${teddie.name}" />
                    <div class="card-body">
                        <div class="card-info">
                            <h2 class="name-price card-title initialism">${teddie.name}</h2>
                            <p class="name-price card-text">${teddie.price/100}€</p>
                        </div>
                        <a href="/HTML/produit.html?id=${teddie._id}" class="btn btn-info col-6 btn-block m-auto">Voir produit</a>
                    </div>
                </div>
                `
        )).join('')
    );
};
showTeddies();