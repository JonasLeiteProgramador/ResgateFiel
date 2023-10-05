const form = document.getElementById("cadastroForm");


function cadastrar(){
    
    const nomePet = document.getElementById("nome").value;
    const idadePet = document.getElementById("idade").value;
    const filesPet = document.getElementById("filesPet").files[0];

    if (nomePet && idadePet && filesPet) {
        const chave = `pet_${Date.now()}`;
        const dadosPet = `Nome: ${nomePet}, Idade: ${idadePet} `;
        
        const reader = new FileReader();
        reader.readAsDataURL(filesPet);
        reader.onload = function () {
            const imagemBase64 = reader.result;
            localStorage.setItem(chave, `${dadosPet}, Imagem: ${imagemBase64}`);
        };

        document.getElementById("nome").value = ""; 
        document.getElementById("idade").value = "";
        document.getElementById("filesPet").value = "";
        window.location = "ListaCadastro.html";
    }
   
}
function carregarPets(){
  

    const apareceDog = document.querySelector('#resultado');
    apareceDog.innerHTML = ""; 

    for (let chave in localStorage) {
        if (chave.startsWith('pet_')) {
            const dadosPet = localStorage.getItem(chave);
            const dadosPetArray = dadosPet.split(", ");
            const nomePet = dadosPetArray[0].split(": ")[1];
            const idadePet = dadosPetArray[1].split(": ")[1];
            const imagemBase64 = dadosPetArray[2].split(": ")[1];

            
            const aparece = `<div class="animal">
            <img src="${imagemBase64}" alt="Imagem do PET">
            <span>Nome: ${nomePet}</span>
            <span>Idade: ${idadePet}</span>
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
