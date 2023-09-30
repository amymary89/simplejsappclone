//Created IIFE to avoid accidentally accessing the global state of `pokemonListRepository` array
//{ name: 'Charmander', type: 'fire', height: 2 },
//{ name: 'Squirtle', type: 'water', height: 1 },
//{ name: 'Pikachu', type: 'electric', height: 1.5 },
//{ name: 'Jigglypuff', type: ['normal', 'fairy'], height: 1.8 }
let pokemonRepository = (function () {
    let pokemonListRepository = []
      let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === "object" && 
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ){
            pokemonListRepository.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }
  
    function getAll() {
      return pokemonListRepository;
    }

    //print details of each pokemon clicked to console.log
    function showDetails(pokemon) {
        console.log(pokemon.name + " " + pokemon.type + " " + pokemon.height);
      }

//each pokemon is placed in a button, when clicked shows the details of each pokemon in console.log

function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });

  }
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
}
function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
        console.log(pokemon);
    });
}
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
    showDetails: showDetails
  };
})();

//console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });

