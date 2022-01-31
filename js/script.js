
let pokemonRepository = [function ()]

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
          type: ['water' , 'torrent']
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
        },
];

function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return repository;
  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
