const appearsAnimal = document.querySelector('#result');

function createPetObject(name, years, local, species, image) {
    return {
        name: name,
        years: years,
        local: local,
        species: species,
        image: image
    };
}

function createAndAddPet(name, years, local, species, image) {
    const keyPet = `pet_${Date.now()}`;
    const dataPet = `Nome: ${name}, Idade: ${years}, Local: ${local}, Espécie: ${species} `;

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
        const imageBase64 = reader.result;
        localStorage.setItem(keyPet, `${dataPet}, Imagem: ${imageBase64}`);
        LoadingPets();
    };
}

function createAnimalScreen(namePet, yearsPet, localPet, speciesPet, imageBase64, keyPet) {
    return `<div class="animal">
        <img src="${imageBase64}" alt="Imagem do PET">
        <span>Nome: ${namePet}</span>
        <span>Idade: ${yearsPet}</span>
        <span>Local: ${localPet}</span>
        <span>Espécie: ${speciesPet}</span>
        <button class="remove-item" data-key="${keyPet}" onclick="removePet(event)">Remover</button>
        <button class="adopt-item" data-name="${namePet}" data-years="${yearsPet}" data-local="${localPet}" data-species="${speciesPet}" data-image="${imageBase64}" onclick="adoptPet(event)">Adotar</button>
    </div>`;
}

function registerPet() {
    const namePet = document.getElementById("name").value;
    const yearsPet = document.getElementById("years").value;
    const localPet = document.getElementById("local").value;
    const speciesPet = document.getElementById("species").value;
    const filesPet = document.getElementById("filesPet").files[0];

    if (namePet && yearsPet && localPet && speciesPet && filesPet) {
        createAndAddPet(namePet, yearsPet, localPet, speciesPet, filesPet);

        document.getElementById("name").value = "";
        document.getElementById("years").value = "";
        document.getElementById("local").value = "";
        document.getElementById("species").value = "";
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

            if (dataPetArray.length >= 5) {
                const namePet = dataPetArray[0].split(": ")[1];
                const yearsPet = dataPetArray[1].split(": ")[1];
                const localPet = dataPetArray[2].split(": ")[1];
                const speciesPet = dataPetArray[3].split(": ")[1];
                const imageIndex = dataPetArray.findIndex(item => item.includes("Imagem:"));
                const imageBase64 = imageIndex !== -1 ? dataPetArray[imageIndex].split(": ")[1] : "";

                const screen = createAnimalScreen(namePet, yearsPet, localPet, speciesPet, imageBase64, keyPet);
                appearsAnimal.innerHTML += screen;
            }
        }
    }
}

function removePet(event) {
    const key = event.target.getAttribute("data-key");
    localStorage.removeItem(key);
    LoadingPets();
}

function addExamples() {
    const examples = [
        createPetObject("Nebulosa", "4 meses", "Rio de Janeiro-Paraíba do Sul", "Gato", "./Images/Carrocel2.jpg"),
        createPetObject("Luna", "2 anos", "Bahia-Salvador", "Cachorro", "./Images/Carrocel3.jpg"),
        createPetObject("Blobby", "2 anos", "Espirito Santo-Vitória", "Gato", "./Images/pexels-umut-sarıalan-17657304.jpg")
    ];

    examples.forEach((example, index) => {
        const keyPet = `pet_${Date.now() + index}`;
        const dataPet = `Nome: ${example.name}, Idade: ${example.years}, Local: ${example.local}, Espécie: ${example.species}, Imagem: ${example.image}`;

        const screen = createAnimalScreen(example.name, example.years, example.local, example.species, example.image, keyPet);
        appearsAnimal.innerHTML += screen;
        localStorage.setItem(keyPet, dataPet);
    });
}






function searchPets() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const listPets = document.querySelectorAll(".animal");

    listPets.forEach(pet => {
        const petName = pet.querySelector("span:nth-child(2)").textContent.toLowerCase();
        const petYears = pet.querySelector("span:nth-child(3)").textContent.toLowerCase();
        const petLocal = pet.querySelector("span:nth-child(4)").textContent.toLowerCase();
        const petSpecies = pet.querySelector("span:nth-child(5)").textContent.toLowerCase();

        if (petName.includes(searchTerm) || petYears.includes(searchTerm) || petLocal.includes(searchTerm) || petSpecies.includes(searchTerm)) {
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

function adoptPet(event) {
    const namePet = event.target.getAttribute("data-name");
    const yearsPet = event.target.getAttribute("data-years");
    const localPet = event.target.getAttribute("data-local");
    const speciesPet = event.target.getAttribute("data-species");
    const email = "resgatefiel@outlook.com";
    const subject = "Adoção de Animal de Estimação";


    const bodyEmail = `Olá,\n\nEstou interessado em adotar o seguinte animal de estimação:\n\nNome: ${namePet}\nIdade: ${yearsPet}\nLocal: ${localPet}\nEspécie: ${speciesPet}\n\nImagem do PET:\n\nPor favor, entre em contato comigo.\n\nAtenciosamente, [Seu Nome]`;

    const linkEmail = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyEmail)}`;

    window.location.href = linkEmail;
}