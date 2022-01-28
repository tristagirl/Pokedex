alert('Hello world')

let pokemonList= [
  {
    name:'pikachu',
    height: 1.4,
    type:  ['electric' , 'static']
  },

  {
    name: 'jigglypuff',
    height: .7,
    type: ['cute charm' , 'Competitive']
  },

  {
    name: 'Zubat',
    height: .8,
    type:['poison' , 'ultrasonic waves']
  },

  {
    name:'squirtle',
    height: .5,
    type: ['water' , 'Torrent']
  },

  {
    name: 'beedrill',
    height: 1.2,
    type: ['poison' , 'stings']
  },

  {
    name:'arbok',
    height: .9,
    type: ['poison' , 'bite']
  },

  {
    name:'ninetales',
    height: 2.1,
    type: ['fire' , 'flash fire']
  }

]

console.log(pokemonList);

// issues i am having when using js
//spacings, and no spacings.
//remembering to use the ; and '' instead of ""

// In this This Loop + conditional I specify that the pokemon with a height greater than 1 will have this message

for (var i = 0; i < pokemonList.length; i++) {
 if (pokemonList[i].height >= 1.0) {
    document.write('<P>' +  pokemonList[i].name + ( ', height: ' )+ pokemonList[i].height + ( " (Wow, That\'s big!)") + '<P>');
 } else {
   document.write('<P>' +  pokemonList[i].name + ( ', height: ' )+ pokemonList[i].height + '<P>')
  }
}


let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('prettyButton');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
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

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
