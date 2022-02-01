
let pokemonRepository = (function () {

  let pokemonList = [
    {
      name:'pikachu',
      height: 1.4,
      type:  ['electric' , 'static']
    },
    {
      name: 'Zubat',
      height: 0.8,
      type:['poison' , 'ultrasonic waves']
    },
    {
      name:'squirtle',
      height: 0.5,
      type: ['water' , 'Torrent']
    },
    {
      name: 'beedrill',
      height: 1.2,
      type: ['poison' , 'stings']
    },
    {
      name:'arbok',
      height: 0.9,
      type: ['poison' , 'bite']
    },
    {
      name:'ninetales',
      height: 2.1,
      type: ['fire' , 'flash fire']
    }
  ];
    function add(pokemon) {
    //validate type of passed parameter to be an object
    if(typeof pokemon === 'object' && !Array.isArray(pokemon)){
      //validating Object.keys() to equal expected keys
      if(Object.keys(pokemon)[0] === 'name' &&
        Object.keys(pokemon)[1] === 'height' &&
        Object.keys(pokemon)[2] === 'type'){
        pokemonList.push(pokemon);
      }
    }
  }

  function getAll() {
    return pokemonList;
  }

// function that allows to find specific Pokémon by name
  function findPokemon(searchName){
    let filteredPokemon = pokemonList.filter(pokemon => pokemon.name === searchName);
    return filteredPokemon
  }

// function that creates a button as list item for a passed pokemon
  function addListItem(pokemon) {
    let ulElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    ulElement.appendChild(listItem);

    // Added an event listener to newly created button
    buttonEventListener(button,pokemon);
  }

// function to add an event listener to a button that will show details of the pokemon when the button is clicked
  function buttonEventListener(button,pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

// function that prints pokemon details onto console
  function showDetails(pokemon){
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem
  };
})();

// Creating a list of buttons for each pokemon in the repository
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});
