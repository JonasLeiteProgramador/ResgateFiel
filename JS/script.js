const form = document.getElementById("cadastroForm");


function cadastrar(){
    
    const nomePet = document.getElementById("nome").value;
    const idadePet = document.getElementById("idade").value;

    if (nomePet && idadePet) {
        const chave = `pet_${Date.now()}`;
        const dadosPet = `Nome: ${nomePet}, Idade: ${idadePet}`;
        localStorage.setItem(chave, dadosPet);
        document.getElementById("nome").value = ""; 
        document.getElementById("idade").value = "";
        window.location = "index2.html";
    }
   
}
function carregarPets(){
  

    const apareceDog = document.querySelector('#resultado');
    apareceDog.innerHTML = ""; 

    for (let chave in localStorage) {
        if (chave.startsWith('pet_')) { 
            const dadosPet = localStorage.getItem(chave);
            const aparece = `<div class="dog">
                <span>${dadosPet}</span>
                <button class="remover-item" data-chave="${chave}" onclick="removerPet(event)">Remover</button>
            </div>`;
            apareceDog.innerHTML += aparece;
        }
    }
}
    
 


 
 function removerPet(event) {
    const chave = event.target.getAttribute("data-chave");
    localStorage.removeItem(chave);

 
    carregarPets(); 
}
