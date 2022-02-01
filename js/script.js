
let pokemonRepository = (function () {
  let pokemonList = [];
  //Pokemon API
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //added function to return the "pokemonList"
  function getAll() {
    return pokemonList;
  }

  //added function to add new pokemen to the "pokemonList"
  function add(pokemon) {
    //checks that only certain properties will be accepted when adding a new pokemon
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      //if property has been validated, new pokemon will be added
      pokemonList.push(pokemon);
    } else {
      // otherwise error message
      console.log("error");
    }
  }

  //added function to create buttons which display each pokemon in HTML
  function addListItem(pokemon) {

    let list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    // creating text inside the button element
    button.innerHTML = pokemon.name;
    //adding a classlist of button
    button.classList.add("btn");
    //add button as a list item
    listItem.appendChild(button);
    //adding the list time to the main pokemon list
    list.appendChild(listItem);

    //adding eventhandler to the button that will show the logged pokemon  on click
    button.addEventListener("click", (event) => {
      showDetails(pokemon);
    });
  }

  //adding function to log the name of the pokemon
  //function showDetails(pokemon) {
  //console.log(pokemon);
  //}

  //adding promise function
  function loadList() {
    //using the fetch method to get pokemon API " result will be the "response", which is a promise
    return fetch(apiUrl)
      .then(function (response) {
        // the reponse is in a json file
        return response.json();
      })
      //we run a forEach loop on the json
      .then(function (json) {
        //"json" object is the file with all the pokemon, result is  json key taken from the json file list,
        //the forEach loop will iterate trough all the different pokemon in the json file.
        json.results.forEach(function (item) {
          //for each of these pokemon item a variable will be created as pokemon and turned into an object with two key-value pairs
          let pokemon = {
            //"item." here is the parameter of function, "name" and "url" are keys taken from the json file list
            name: item.name,
            detailsUrl: item.url,
          };
          //calling add function to
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // use the "detailsUrl" property to load the detailed data for a given Pokémon.
  //for this, you add a loadDetails() function, which takes a Pokémon item as an argument
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //item is from the loadDetails parameter, imageURL is a variable that was just created, details
        //the parameter of this function, "sprites.height.types." are from the second  json file list when you click on the "url" in the first json file list
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //the showDetails() function is executed when a user clicks on a Pokémon and you get the Pokémon’s details from the server.
  //showDetails function will execute
  function showDetails(item) {
    //the loadDetails function with pokemon as parameter and adds a function as a promise and then to return a console log
    loadDetails(item).then(function () {
      console.log(item);
    });
  }

  //IIFE will return an object with  methods to have access to these previously created functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

//this will call the api to display
pokemonRepository.loadList().then(function () {
  // IIFE returned function to retrieve "pokemonList"
  //forEach method iterate trough each pokemon to display button with pokemon name in the browser
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
