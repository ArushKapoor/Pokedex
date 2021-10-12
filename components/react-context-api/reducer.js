// This is the initial state of the data layer
export const initialState = {
  pokemons: [],
  allPokemons: [],
  searchName: "",
};

// This is where we create the reducer which has state and actions which
// are called to check the current value of the data layer and to make
// changes to the data layer/ global variable
const reducer = (state, action) => {
  //   console.log(action);

  // this is a switch case to decide what changes to make in the data
  // layer when we fire off a dispatch
  switch (action.type) {
    case "ALL_POKEMON":
      let newPokemons = [...state.allPokemons];

      if (newPokemons.length === 0) {
        newPokemons = action.allPokemons;
      } else {
        action.allPokemons.map((object) => {
          newPokemons.push(object);
        });
      }

      return {
        ...state,
        allPokemons: newPokemons,
      };

    case "SHOW_POKEMON":
      return {
        ...state,
        pokemons: action.pokemons,
      };

    case "SET_NAME":
      return {
        ...state,
        searchName: action.searchName,
      };

    default:
      return state;
  }
};

// Anything that we have to use outside of this file, we export it
export default reducer;
