import { useState, useEffect } from "react";
import { useStateValue } from "./react-context-api/StateProvider";

// TODO - On backspace the data for the search bar doesnt change.

function SearchBar() {
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [{ allPokemons }, dispatch] = useStateValue();

  useEffect(() => {
    const localData = localStorage.getItem("searchName");

    if (localData) {
      setName(localData);
      dispatch({
        type: "SET_NAME",
        searchName: localData,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("searchName", name);
  }, [name]);

  const onSuggestHandler = (name) => {
    onChangeHandler(name);
    setSuggestions([]);
  };

  const onChangeHandler = (name) => {
    let matches = [];
    if (name.length > 0) {
      matches = allPokemons.filter((user) => {
        const regex = new RegExp(`${name}`, "gi");
        return user.name.match(regex);
      });
    }
    setSuggestions(matches);
    setName(name);
    dispatch({
      type: "SET_NAME",
      searchName: name,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="px-48 relative">
      <form className="w-full">
        <div className="flex items-center w-full">
          <input
            className="border-2 border-black w-full h-10 p-2 focus:outline-none placeholder-black"
            value={name}
            onChange={(event) => onChangeHandler(event.target.value)}
            placeholder="Search..."
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 100);
            }}
            onFocus={() => {
              onChangeHandler(name);
            }}
          />
          <span
            className="border-2 border-black px-1 ml-5"
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </form>
      <div className="max-h-custom-40 w-custom-70 overflow-x-auto z-10 absolute">
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <div
              className="border-2 border-t-0 border-black p-2 bg-white hover:bg-gray-200 cursor-pointer capitalize"
              key={i}
              onClick={() => onSuggestHandler(suggestion.name)}
            >
              {suggestion.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
