ORINOCO - ORINOURS

Création d'un MVP (Minimum Viable Project) concernant un site de E-commerce. Pour la créatiobn de cette boutique en ligne, les produits disponibles à la vente seront des Ours en peluche fait à la main.

Le code source de ce projet est disponible à l'adresse suivante : https://github.com/SebV30/VergnaudSebastien-5-02042021/settings

Ce projet se compose de différentes parties :

1. HTML : Crétion de 4 pages : index.html, produit.html, panier.html et confirmation.html.
2. CSS : La mise en forme CSS a été faite via SASS.
3. JS : Développement de la partie Applicative/Interactive de l'application.

L'utilisateur pourra depuis la page d'accueil sélectionner un produit. Cela ouvrira la page du produit sélectionné. Sur cette page, apparaîtra une description plus précise du produit. Il pourra, également sur cette page, choisir une couleur parmi plusieurs options. Enfin en validant le produit sera ajouté au panier. Une fois ses achats terminés, il devra remplir un formulaire (dont les champs seront conditionnés par des RegExp) pour valider sa commande. Une fois la commande validée, les données seront envoyées au back-end qui nous retournera un rappel des données formulaire saisies, le montant total de la commande et le numéro de commande généré par le serveur. Grâce à ce retour d'informations, l'application affichera une page de confirmation/remerciements.

Concernant le back-end :

### Prerequisites

You will need to have Node and `npm` installed locally on your machine.

### Installation

Clone this repo. From within the project folder, run `npm install`. You
can then run the server with `node server`.
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.
