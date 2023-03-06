let pokemonList= [
    {name: 'Charmander', type: 'fire' , height: 2},
    {name: 'Squirtle', type: 'water', height: 1},
    {name: 'Pikachu', type: 'electric' , height: 1.5},
    {name: 'Jigglypuff', type: ['normal','fairy'], height: 1.8}]


for(let i=0; i < pokemonList.length; i++){
    if(pokemonList[i].height > 1.9){
        document.write( pokemonList[i].name + ',' + ' ' + '(height:' + ' ' + pokemonList[i].height + ')' + '-' + 'Wow! That is big!')
    }else{
        document.write('<p>' + pokemonList[i].name + ',' + ' ' + '(height:' + pokemonList[i].height + ')' + '</p>')
    }
}
