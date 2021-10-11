import { Fragment } from "react";
import Cards from "../components/card/Cards";
import SearchBar from "../components/SearchBar";

// our-domain.com/

function HomePage(props) {
  return (
    <Fragment>
      <SearchBar />
      <Cards pokemon={props.pokemon} />;
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

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25");
  const data = await res.json();

  const pokemonData = await Promise.all(
    data.results.map(async (result) => await test(result))
  );

  // console.log(pokemonData);

  return {
    props: {
      pokemon: pokemonData,
    },
  };
}

export default HomePage;
