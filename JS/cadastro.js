
const appearsAnimal = document.querySelector('#result');



function registerPet() {

    const yearsPet = document.getElementById("name").value;
    const namePet = document.getElementById("years").value;
    const filesPet = document.getElementById("filesPet").files[0];

    if (namePet && yearsPet && filesPet) {
        const keyPet = `pet_${Date.now()}`;
        const dataPet = `Nome: ${namePet}, Idade: ${yearsPet} `;

        const reader = new FileReader();
        reader.readAsDataURL(filesPet);
        reader.onload = function () {
            const imageBase64 = reader.result;
            localStorage.setItem(keyPet, `${dataPet}, Imagem: ${imageBase64}`);
        };

        document.getElementById("name").value = "";
        document.getElementById("years").value = "";
        document.getElementById("filesPet").value = "";
        window.location = "ListaCadastro.html";
    }

}

function LoadingPets() {



    appearsAnimal.innerHTML = "";

    for (let keyPet in localStorage) {
        if (keyPet.startsWith('pet_')) {
            const dataPet = localStorage.getItem(keyPet);
            const dataPetArray = dataPet.split(", ");
            const namePet = dataPetArray[0].split(": ")[1];
            const yearsPet = dataPetArray[1].split(": ")[1];
            const imageBase64 = dataPetArray[2].split(": ")[1];


            const screen = `<div class="animal">
            <img src="${imageBase64}" alt="Imagem do PET">
            <span>Nome: ${namePet}</span>
            <span>Idade: ${yearsPet}</span>
            <button class="remover-item" data-chave="${keyPet}" onclick="removePet(event)">Remover</button>
        </div>`;
            appearsAnimal.innerHTML += screen;
        }
    }
}





function removePet(event) {
    const key = event.target.getAttribute("data-chave");
    localStorage.removeItem(key);


    LoadingPets();
}
 function addExamples() {
    
    const examples = [
        { name: "Nebulosa", years: "4 meses", image: "./Images/Carrocel2.jpg" },
        { name: "Luna", years: "2 anos", image: "/Images/Carrocel3.jpg" },
        { name: "Blobby", years: "2 anos", image: "/Images/pexels-umut-sarıalan-17657304.jpg" }
    ];

    examples.forEach((example, index) => {
        const keyPet = `pet_${Date.now() + index}`;
        const dataPet = `Nome: ${example.name}, Idade: ${example.years}, Imagem: ${example.image}`;


        const screen = `<div class="animal">
            <img src="${example.name}" alt="Imagem do PET">
            <span>Nome: ${example.years}</span>
            <span>Idade: ${example.image}</span>
            <button class="remover-item" data-chave="${keyPet}" onclick="removerPet(event)">Remover</button>
        </div>`;
        appearsAnimal.innerHTML += screen
        localStorage.setItem(keyPet, dataPet);
    });
}

function searchPets() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const listPets = document.querySelectorAll(".animal");

    listPets.forEach(pet => {
        const petName = pet.querySelector("span:nth-child(2)").textContent.toLowerCase();
        const petYears = pet.querySelector("span:nth-child(3)").textContent.toLowerCase();

        if (petName.includes(searchTerm) || petYears.includes(searchTerm)) {
            pet.style.display = "";
        } else {
            pet.style.display = "none";
        }
    });

    const message = document.getElementById("message");
    const result = document.getElementById("result");

    if (searchTerm === "") {
        message.textContent = "";
    } else if (result.children.length === 0) {
        message.textContent = "Nenhum resultado encontrado.";
    } else {
        message.textContent = `Exibindo resultados para "${searchTerm}".`;
    }
}


