const fs = require('fs').promises;
const axios = require('axios');

async function getPokemon(pokemon) {
  pokemon = pokemon.toLowerCase()
  url = "https://pokeapi.co/api/v2/pokemon"
  try {
    const data = await fs.readFile('pokemons.json', 'utf-8');
    const pokemonsObject = JSON.parse(data);
    const pokemonNames = pokemonsObject.pokemons;
    let encontrado = false

    for(let i = 0; i < pokemonNames.length; i++){
      if(pokemonNames[i] == pokemon){
        encontrado = true
        break
      }
    }
  
    if (encontrado){
      getType(pokemon,url)
    } else {
      console.log("pokemon não encontrado")
    }

  } catch (error) {
    console.error('Ocorreu um erro ao ler o arquivo:', error);
  }
}

function getType(pokemon,url) {
  axios.get(`${url}/${pokemon}`)
  .then(response => {
    const types = response.data.types
    let pokemonTypes = []
    for (const type of types) {
      pokemonTypes.push(type.type.name)
    }
    console.log(`\nnome: ${pokemon}, tipos: ${pokemonTypes.join(', ')}`)
  })
  .catch( error => console.error(error))
}

getPokemon("charizard");