(() => {
  class Pokemonager {
    // This should return an array of all the names of n Pokemon from the Pokemon API.
    findNames(n) {
      // Your code here.
      const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${n}`;
      // let result;
      return fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("DATA", data);
          return data.results.map((pokemon) => pokemon.name);
          // console.log("innner RESULT", result);
          // return result;
        });
      // console.log("outer RESULT", result);
      // return result;
    }

    // This should return an array of all the Pokemon that are under a particular weight.

    findUnderWeight(weight) {
      const n = 10;
      const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${n}`;
      // let result;
      return fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return Promise.all(
            data.results.map((pokemonObj) => fetch(pokemonObj["url"]))
          );
          // console.log("innner RESULT", result);
          // return result;
        })
        .then((responseObjects) => {
          return Promise.all(
            responseObjects.map((responseObject) => responseObject.json())
          );
        })
        .then((pokemons) => {
          return pokemons.filter((pokemon) => pokemon.weight < weight);
        });
    }
  }

  window.Pokemonager = Pokemonager;
})();
