/* created an IIFE to wrap the previous 'global variables' (e.g. pokemonList) and
turn them into 'local variables', so they are protected from changes and don't conflict with other variables or external code.*/

let pokemonRepository = (function () {
    let pokemonList = [];
    //created an empty array of pokemon objects to use with the 'PokéAPI'.
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#exampleModal');

    // created function to, when required, add new pokemon to the pokemonList array.
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        )   {
            pokemonList.push(pokemon);
        }   else {
            console.log('Pokemon is not correct');
        }
    }

//created function to return all items within the pokemonList array, on demand.

    function getAll() {
        return pokemonList;
    }
 //created function to add, within the pokemon-list ul, list items with buttons holding a Pokemon's name as its inner text.
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        listItem.classList.add('listItem-class');
        button.innerText = pokemon.name;
        button.classList.add('button-class');

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        loadDetails(pokemon).then(function () {
        let imageDiv = document.createElement('div');
        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageURL;
        pokemonImage.classList.add('pokemon-image');

        imageDiv.appendChild(pokemonImage);
        button.appendChild(imageDiv);
        })

        //on-click event
        button.addEventListener('click', function() {
            showDetails(pokemon, modalContainer);
        });
    }

    // loadDetails(pokemon).then(function () {
    //     let imgDiv = document.createElement("div");
    //     button.appendChild(imgDiv);

    //     let pokemonImg = document.createElement("img");
    //     pokemonImg.src = pokemon.imageUrl;
    //     imgDiv.appendChild(pokemonImg);
    // })


    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
            // now we add the details (e.g. height, abilities) to the item, to the pokemon
        }).then(function (details) {
            pokemon.types = details.types;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
            pokemon.abilities = details.abilities;
            pokemon.imageURL = details.sprites.front_default;
        }).catch(function (e) {
            console.error(e);
        })
    }
// function to show details of the pokemon on the button 'click' event, called above within addListItem function.
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });

    }

//function to show a Modal with details about a pokemon.
    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        // let modalHeader = $('.modal-header');

        modalTitle.empty();
        modalBody.empty();

        let pokemonName = $('<h1>' + pokemon.name + '</h1>');
        let pokemonImage = $('<img class="modal-img" style="width:50%">');
        pokemonImage.attr('src', pokemon.imageURL);

        let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
        let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

        let pokemonType = document.createElement('p');
        let typesCon = ''
        pokemon.types.forEach(element => {
            typesCon += `${element.type.name},`
        });
        pokemonType.innerText = 'Type(s): ' + typesCon;

        /*let pokemonTypeOne = capitalizeFirstLetter(pokemon.types[0].type.name);
        if (pokemon.types[1] === undefined) {
            pokemonType.innerText = 'Type(s): ' + pokemonTypeOne;
        } else {
            let pokemonTypeTwo = capitalizeFirstLetter(pokemon.types[1].type.name);
            pokemonType.innerText = 'Type(s): ' + pokemonTypeOne + ', ' + pokemonTypeTwo;
        } */

        //let pokemonAbility = $('<p>' + 'abilities: ' + pokemon.abilities + '</p>');
        let pokemonAbility = document.createElement('p');
        let abilitiesCon = ''
        pokemon.abilities.forEach(element => {
            abilitiesCon += `${element.ability.name},`
        });
        pokemonAbility.innerText = 'Abilities: ' + abilitiesCon;


        modalTitle.append(pokemonName);
        modalBody.append(pokemonImage);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonWeight);
        modalBody.append(pokemonType);
        modalBody.append(pokemonAbility);

        $('#exampleModal').modal();
      }

      // function for searching through pokemons

      $(document).ready(function(){
        $("#search-pokemon").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $(".button-class").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });



    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal

    };

})();



// forEach loop to iterate over the pokemon in pokemonList
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
