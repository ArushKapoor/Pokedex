// This is the initial state of the data layer
export const initialState = {
  pokemonName: "",
};

// This is where we create the reducer which has state and actions which
// are called to check the current value of the data layer and to make
// changes to the data layer/ global variable
const reducer = (state, action) => {
  //   console.log(action);

  // this is a switch case to decide what changes to make in the data
  // layer when we fire off a dispatch
  switch (action.type) {
    case "SEND_NAME":
      return {
        ...state,
        pokemonName: action.pokemonName,
      };

    // To store name of all the shows in posts
    case "CREATE_POSTS":
      return {
        ...state,
        posts: action.item?.posts,
      };

    // To change the value of skipShow to trigger UseEffect
    // when skip button is clicked
    case "CHANGE_SHOW":
      return {
        ...state,
        skipShow: action.skipShow,
      };

    // To change the value of the filter either "shows" or
    // "anime" to get the particular collection
    case "CHANGE_FILTER":
      console.log("Filter ", action.filter);
      return {
        ...state,
        filter: action.filter,
      };

    case "SET_LOADING":
      console.log("Inside Reducer ", action.loading);
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
};

// Anything that we have to use outside of this file, we export it
export default reducer;
