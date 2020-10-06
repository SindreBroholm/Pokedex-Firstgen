import{ getAnimatedShinyImageFromId, getIdFromUrl} from './utils';

let mainNode = document.getElementById("main");
let currentPage = 0;
let perPage = 20;
let firstGen = 151;

function fetchPokemons(page, perPage) {
    console.log(page);
let nextTotal = page * perPage;
let nextLimit = Math.min(20, firstGen - nextTotal);
return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${nextLimit}&offset=${nextTotal}`)
.then(function (response){
return response.json();
})
.then(function(data){
return data.results;
})
}

function createPokemonsLoadingMarkup(){
return `
    <h3>Loading Pokemons...</h3>
`;
}

function createHomeMarkup () {
return ` 
<h1>My Pokedex</h1>
<button id="view">View pokemons</button>
`;
}

function creatPokemonCard(pokemon){
let pokemonId = getIdFromUrl(pokemon.url);
let imageUrl = getAnimatedShinyImageFromId(pokemonId);
return `
    <div class="pokemonCard" id="${pokemonId}">
    <img src="${imageUrl}">
    <h3>${pokemon.name}</h3>
    </div>
    `;
}

function createPokedexMarkup(pokemons){
let pokemonList = pokemons
    .map(creatPokemonCard).join("");

    return `
        <h1>My Pokemons</h1>
        <button id="prevButton">Prev</button>
        <button id="nextButton">Next</button>
        <div id="pokemonList">
        ${pokemonList}
        </div>
        `;
}

function createpokedexErrorMarkup(error) {
return `
        <h3>Unable to get pokemons</h3>
        <p>${error.message}</p>
        <p>Lost internett?</p>
    `;
}

function renderPokemon(pokemonid){


fetchPokemon(pokemonid)

.then(function (pokemon){
    let typeItems = pokemon.types.map(function (type){
        return `<span>${type.type.name}</span>`;
    }).join(", ");

    let ability = pokemon.abilities.map(function(ability){
        return `<span>${ability.ability.name}</span>`;
    }).join(", ")

    let stats = pokemon.stats.map(function(stats){
        return `
            <li>${stats.stat.name}: ${stats.base_stat}</li>
        `;
    }).join("");
    mainNode.innerHTML = `
        <h1>${pokemon.name}</h1>
        <button id="back">Back</button>
        <div>
        <img src="${pokemon.sprites.other.dream_world.front_default}">
        </div>
        <div class="pokemonInfo">
            <div>Type: ${typeItems}</div>
            <div>Abilities: ${ability} </div>
            <div><h3>Stats</h3>
                <ul>
                    ${stats}
                </ul>
            </div>
        <p></p>
        </div>

    `;

    let backButtonNode = document.getElementById("back");
    backButtonNode.addEventListener('click', function(){
        console.log('currentPage:', currentPage)
        renderPokemons(currentPage, perPage);
    })
})
}

function renderPokemons(Page, perPage) {
mainNode.innerHTML = createPokemonsLoadingMarkup();

fetchPokemons(Page, perPage)
.then(function(pokemons){
    mainNode.innerHTML = createPokedexMarkup(pokemons);

    let prevButtonNode = document.getElementById("prevButton")
    if (currentPage > 0) {
        prevButtonNode.addEventListener("click", function () {
        currentPage--;
        renderPokemons(currentPage, perPage);
        });
    } else {
        prevButtonNode.style.display = "none";
    };
    let nextButtonNode = document.getElementById("nextButton")
    if ((currentPage+1)* perPage <= 151) {
        nextButtonNode.addEventListener("click", function () {
        currentPage++;
        renderPokemons(currentPage, perPage);
        });
    } else {
        nextButtonNode.style.display = "none";
    };

    let pokemonListNode = document.getElementById("pokemonList");
        pokemonListNode.childNodes.forEach(function(child){
            child.addEventListener('click', function(event){
            renderPokemon(event.currentTarget.id);
        });
    });
})
.catch(function (error){
    mainNode.innerHTML = createpokedexErrorMarkup(error);
});
}

function renderHome() {
mainNode.innerHTML = createHomeMarkup();

let viewButtonNode = document.getElementById("view");
viewButtonNode.addEventListener('click', function(){
    renderPokemons(currentPage, perPage);
})
}

renderHome();