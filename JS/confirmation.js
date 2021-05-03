let receive = JSON.parse(localStorage.getItem("receive"));
let total = JSON.parse(localStorage.getItem("total"));
let order = JSON.parse(localStorage.getItem("order"));

const thanks = document.getElementById("confirm");
thanks.innerHTML = `
<div class="text-center m-auto">
    <p>Merci ${receive.firstName} ${receive.lastName}.</p>
    <p>Votre commande numéro :</p>
    <p class="font-bold">${order}</p>
    <p>D'un montant total de <span >${total}</span> € sera expédiée, dans les meilleurs délais, à l'adresse suivante :</p>
    <p>${receive.address}</p>
    <p>${receive.city}</p>
</div>
`;

let clearLocalStorage = localStorage.clear();