import { useState } from "react";

function SearchBar() {
  const [name, setName] = useState("");

  return (
    <div>
      <form>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter pokemon"
        />
      </form>
    </div>
  );
}

export default SearchBar;
