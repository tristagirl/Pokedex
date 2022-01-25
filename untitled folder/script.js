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
