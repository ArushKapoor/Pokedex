import { useState, useEffect } from "react";
import { useStateValue } from "../components/react-context-api/StateProvider";
import { Fragment } from "react";
import Cards from "../components/card/Cards";
import SearchBar from "../components/SearchBar";

// our-domain.com/

function HomePage() {
  const [pokemon, setPokemon] = useState([]);

  const [{ pokemons, allPokemons }, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchPokemonData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25");
      const data = await res.json();

      const pokemonData = await Promise.all(
        data.results.map(async (result) => await test(result))
      );

      dispatch({
        type: "ALL_POKEMON",
        allPokemons: pokemonData,
      });

      // console.log(allPokemons);

      setPokemon(pokemonData);
    }

    if (pokemons.length === 0) {
      fetchPokemonData();
    } else {
      setPokemon(pokemons);
    }
  }, [pokemons]);

  return (
    <Fragment>
      <SearchBar pokemon={pokemon} />
      <Cards pokemon={pokemon} />
    </Fragment>
  );
}

async function test(pokemon) {
  const res = await fetch(pokemon.url);
  const data = await res.json();

  return {
    name: pokemon.name,
    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
  };
}

// export async function getStaticProps() {
//   const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25");
//   const data = await res.json();

//   const pokemonData = await Promise.all(
//     data.results.map(async (result) => await test(result))
//   );

//   // console.log(pokemonData);

//   return {
//     props: {
//       pokemon: pokemonData,
//     },
//   };
// }

export default HomePage;
