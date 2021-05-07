let receive = JSON.parse(localStorage.getItem("receive"));
let total = JSON.parse(localStorage.getItem("total"));
let order = JSON.parse(localStorage.getItem("order"));

const thanks = document.getElementById("confirm");
thanks.innerHTML = `
<div class="text-center m-auto">
    <p>Merci :<br><span class="confirm-color">${receive.firstName} ${receive.lastName}</span></p>
    <p>Votre commande numéro :</p>
    <p class="font-bold"><span class="confirm-color">${order}</span></p>
    <p>D'un montant total de <span class="confirm-color">${total} €</span> sera expédiée, dans les meilleurs délais, à l'adresse suivante :</p>
    <p><span class="confirm-color">${receive.address}</span></p>
    <p><span class="confirm-color">${receive.city}</span></p>
</div>
`;

let clearLocalStorage = localStorage.clear();