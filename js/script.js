
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


    function getAll () {
        return pokemonList;

      }
  function add (pokemon) {
    pokemonList.push(pokemon);
      }

      return {
        getAll: getAll,
        add: add
      };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon))
  });
});
