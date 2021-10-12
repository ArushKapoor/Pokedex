import { useState, useEffect } from "react";
import { useStateValue } from "../components/react-context-api/StateProvider";
import { Fragment } from "react";
import Cards from "../components/card/Cards";
import SearchBar from "../components/SearchBar";

// our-domain.com/

function HomePage() {
  const [{ searchName, allPokemons, offset }, dispatch] = useStateValue();

  useEffect(() => {
    console.log("useEffect called");
    async function fetchPokemonData() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`
      );
      const data = await res.json();

      const pokemonData = await Promise.all(
        data.results.map(async (result) => await test(result))
      );

      dispatch({
        type: "ALL_POKEMON",
        allPokemons: pokemonData,
      });

      // console.log(allPokemons);
    }
    fetchPokemonData();

    const scrollToEnd = () => {
      console.log("isAtEnd");
      dispatch({
        type: "CHANGE_OFFSET",
        offset: offset + 25,
      });
    };

    setTimeout(() => {
      if (
        offset < 1118 &&
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
      ) {
        scrollToEnd();
      }
    }, 500);

    window.onscroll = function () {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        scrollToEnd();
      }
    };
  }, [offset, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      if (
        offset < 1118 &&
        window.innerHeight + 200 > document.body.clientHeight
      ) {
        console.log("true");
        dispatch({
          type: "CHANGE_OFFSET",
          offset: offset + 25,
        });
      } else {
        console.log("false");
      }
    }, 500);
  }, [searchName, dispatch, offset]);

  return (
    <Fragment>
      <SearchBar />
      <Cards />
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
