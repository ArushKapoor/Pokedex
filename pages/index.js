import { useState, useEffect } from "react";
import { useStateValue } from "../components/react-context-api/StateProvider";
import { Fragment } from "react";
import Cards from "../components/card/Cards";
import SearchBar from "../components/SearchBar";

// our-domain.com/

function HomePage() {
  const [pokemon, setPokemon] = useState([]);

  const [{ pokemonName }] = useStateValue();

  useEffect(() => {
    // console.log(`Use Effect pokemonName=${pokemonName}`);

    async function fetchPokemonData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25");
      const data = await res.json();

      const pokemonData = await Promise.all(
        data.results.map(async (result) => await test(result))
      );

      setPokemon(pokemonData);
    }

    fetchPokemonData();
  }, [pokemonName]);

  return (
    <Fragment>
      <SearchBar />
      <Cards pokemon={pokemon} />;
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
