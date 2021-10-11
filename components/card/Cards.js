import CardItem from "./CardItem";

function Cards(props) {
  //   console.log(props.pokemon);
  return (
    <div className="grid grid-cols-4 gap-10 py-8 px-32 z-0">
      {/* <CardItem pokemon={props.pokemon[0]} />
      <CardItem pokemon={props.pokemon[0]} />
      <CardItem pokemon={props.pokemon[0]} />
      <CardItem pokemon={props.pokemon[0]} /> */}
      {props.pokemon.map((pokemon) => (
        <CardItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default Cards;
