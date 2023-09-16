//let pokemonList= [
//    {name: 'Charmander', type: 'fire' , height: 2},
 //   {name: 'Squirtle', type: 'water', height: 1},
//    {name: 'Pikachu', type: 'electric' , height: 1.5},
//    {name: 'Jigglypuff', type: ['normal','fairy'], height: 1.8}]


//for(let i=0; i < pokemonList.length; i++){
   // if(pokemonList[i].height > 1.9){
   //     document.write( pokemonList[i].name + ',' + ' ' + '(height:' + ' ' + pokemonList[i].height + ')' + '-' + 'Wow! That is big!')
   // }else{
  //      document.write('<p>' + pokemonList[i].name + ',' + ' ' + '(height:' + pokemonList[i].height + ')' + '</p>')
  //  }
//}

//Created IIFE to avoid accidentally accessing the global state of `pokemonListRepository` array
let pokemonRepository = (function () {
    let pokemonListRepository= [
        {name: 'Charmander', type: 'fire' , height: 2},
        {name: 'Squirtle', type: 'water', height: 1},
        {name: 'Pikachu', type: 'electric' , height: 1.5},
        {name: 'Jigglypuff', type: ['normal','fairy'], height: 1.8}]
    
    function add(pokemon) {
        pokemonListRepository.push(pokemon);
    }
    
    function getAll() {
        return pokemonListRepository;
    }

    //print details of each pokemon clicked to console.log
    function showDetails(pokemon) {
        console.log(pokemon.name + " " + pokemon.type + " " + pokemon.height);
      }

//each pokemon is placed in a button, when clicked shows the details of each pokemon in console.log

    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function(event){ 
            showDetails(pokemon); 
      });

    return {
        add: add,
        getAll: getAll
        addListItem: addListItem
        showDetails: showDetails,
    };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//function myLoopFunction(pokemon) {
//    console.log(pokemon.name + ' is ' + pokemon.type + ' type ' + pokemon.height + ' height. ');
//}
//pokemonRepository.getAll().forEach(function (pokemon) {
//    let pokemonList = document.querySelector(".pokemon-list");
   // let listpokemon = document.createElement("li");
   // let button = document.createElement("button");
 //   button.innerText = pokemon.name;
 //   button.classList.add("button-class");
 //   listpokemon.appendChild(button);
  //  pokemonList.appendChild(listpokemon);

//});