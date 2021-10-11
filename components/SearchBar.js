import { useState, useEffect } from "react";
import { useStateValue } from "./react-context-api/StateProvider";

function SearchBar() {
  const [name, setName] = useState("");

  const [{ pokemonName }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "SEND_NAME",
      pokemonName: name,
    });
  }, [name, dispatch]);

  return (
    <div>
      <form>
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Enter pokemon"
        />
      </form>
    </div>
  );
}

export default SearchBar;
