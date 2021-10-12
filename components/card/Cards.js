import CardItem from "./CardItem";
import { useStateValue } from "../react-context-api/StateProvider";

function Cards() {
  const [{ allPokemons, searchName }] = useStateValue();

  return (
    <div className="grid grid-cols-4 gap-10 py-8 px-32 z-0">
      {allPokemons.map((pokemon) => {
        const regex = new RegExp(`${searchName}`, "gi");
        if (pokemon.name.match(regex)) {
          return <CardItem key={pokemon.name} pokemon={pokemon} />;
        }
      })}
    </div>
  );
}

export default Cards;
