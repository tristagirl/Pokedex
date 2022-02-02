let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#exampleModal');

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


    function getAll() {
        return pokemonList;
    }

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

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
        
    }

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

        /*let pokemonAbilityOne = capitalizeFirstLetter(pokemon.abilities[0].ability.name);
        if (pokemon.abilities[1] === undefined && 
            pokemon.abilities[2] === undefined) {
            pokemonAbility.innerText = 'Abilities: ' + pokemonAbilityOne;
        } else if(pokemon.abilities[2] === undefined) {
            let pokemonAbilityTwo = capitalizeFirstLetter(pokemon.abilities[1].ability.name);
            pokemonAbility.innerText = 'Abilities: ' + pokemonAbilityOne + ', ' + pokemonAbilityTwo;
        } else {
            let pokemonAbilityTwo = capitalizeFirstLetter(pokemon.abilities[1].ability.name);
            let pokemonAbilityThree = capitalizeFirstLetter(pokemon.abilities[2].ability.name);
            pokemonAbility.innerText = 'Abilities: ' + pokemonAbilityOne + ', ' + pokemonAbilityTwo + ', ' + pokemonAbilityThree;
        } */

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