import Card from "../components/Card";

// our-domain.com/

function HomePage(props) {
    // console.log(props.test);

  return <Card />;
}

async function test(pokemon) {
  const res = await fetch(pokemon.url);
  const data = await res.json();

  // return pokemon.name
  return {
    name: pokemon.name,
    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
  };
}

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2");
  const data = await res.json();

  //   console.log(data);

  const pokemonData = await Promise.all(data.results.map(async (result) => await test(result)));

  //   console.log(pokemonData);

  // const output = await data.results.map((result) => {
  //   fetch(result.url).then(response => response.json()).then(function(pokeData) {
      
  //     // return {
  //     //   name: result.name,
  //     //   url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`
  //     // }
  //   })
  // })

  // let output = [];
  
  // data.results.forEach(async element => {
  //   const res = await fetch(element.url);
  //   const data = await res.json();

  //   const pokemon = {name: element.name, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`};

  //   output.push(pokemon);
  //   console.log(output);
  // });

  console.log(pokemonData);

  //   fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  //     .then((response) => response.json())
  //     .then((allpokemon) => console.log(allpokemon));

  return {
    props: {
      test: "Its Working",
    },
  };
}

export default HomePage;
