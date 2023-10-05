//Created IIFE to avoid accidentally accessing the global state of `pokemonListRepository` array
let pokemonRepository = (function () {
    let pokemonListRepository = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150';
    let modalContainer = document.querySelector('#modal-container'); 

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

    //each pokemon is placed in a button, when clicked shows the details of each pokemon 

    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listpokemon = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.setAttribute("data-target", "#modal-container");
      button.classList.add('button-class');
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener('click', () => {
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
          showModal(item);
      }).catch(function (e) {
          console.error(e);
      });
    }

  
    function showModal (item) {
        console.log(item);
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
  
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
  
        let titleElement = document.createElement('h1');
        titleElement.innerText = item.name;
  
        let contentElement = document.createElement('p');
        contentElement.innerText = "Height" + " " + item.height + " " + "meters";
  
        let container = document.querySelector('#image-container');
        let myImage = document.createElement("img");
  
        myImage.src = item.imageUrl;
  
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(myImage);
        modalContainer.appendChild(modal);
  
        modalContainer.classList.add('is-visible');
  
     }
  
    
  


    function hideModal() {
      modalContainer.classList.remove('is-visible');

    }

    window.addEventListener('keydown', (e) => { 
      if (e.key === 'Escape' &&
         modalContainer.classList.contains('is-visible')) {
        hideModal();
         }
    });
  
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if(target === modalContainer) {
        hideModal();
      }
    });

  
    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal(title, text);
    });
  

  
  function showDetails(item) {
      loadDetails(item).then(function(){
         showModal(item);
      });
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

//console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });