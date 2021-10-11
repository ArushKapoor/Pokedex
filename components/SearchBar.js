import { useState, useEffect } from "react";
import { useStateValue } from "./react-context-api/StateProvider";

function SearchBar({ pokemon }) {
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [{ pokemonName }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "SEND_NAME",
      pokemonName: name,
    });
  }, [name, dispatch]);

  const onSuggestHandler = (name) => {
    setName(name);
    setSuggestions([]);
  };

  const onChangeHandler = (name) => {
    let matches = [];
    if (name.length > 0) {
      matches = pokemon.filter((user) => {
        const regex = new RegExp(`${name}`, "gi");
        return user.name.match(regex);
      });
    }
    setName(name);
    setSuggestions(matches);
  };

  return (
    <div>
      <form>
        <input
          value={name}
          onChange={(event) => onChangeHandler(event.target.value)}
          placeholder="Enter pokemon"
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([]);
            }, 100);
          }}
        />
      </form>
      <div>
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <div key={i} onClick={() => onSuggestHandler(suggestion.name)}>
              {suggestion.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
