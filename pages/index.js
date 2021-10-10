import Card from "../components/Card";

// our-domain.com/

function HomePage(props) {
    // console.log(props.test);

  return <Card />;
}

async function test(pokemon) {
  const res = await fetch(pokemon.url);
  const data = await res.json();
  
  return {
    name: pokemon.name,
    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
  };
}

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2");
  const data = await res.json();

  const pokemonData = await Promise.all(data.results.map(async (result) => await test(result)));

  console.log(pokemonData);

  return {
    props: {
      test: "Its Working",
    },
  };
}

export default HomePage;