import Image from "next/image";

function CardItem(props) {
  // console.log("Card Item called");
  // console.log(props.pokemon);

  return (
    <div className="flex flex-col border-2 border-gray-200 shadow-md rounded-md hover:shadow-lg">
      <Image
        className="bg-gray-200"
        src={props.pokemon.url}
        height="250"
        width="250"
        alt={props.pokemon.name}
      />
      <span className="text-center font-bold m-2">{props.pokemon.name}</span>
    </div>
  );
}

export default CardItem;
