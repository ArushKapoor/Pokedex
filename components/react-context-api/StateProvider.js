// setup data layer/ global variable
// We need this to track the basket

import React, { createContext, useContext, useReducer } from "react";

// THIS IS THE DATA LAYER
export const StateContext = createContext();

// BUILD A PROVIDER

// Here reducer is what we use to get the state of the data layer and to
// make changes to it
// initialState is what we define the initial state of the data layer to be
// Children is what we wrap the provider around (Here its child is App.js)
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// This is how we use it inside of a component
export const useStateValue = () => useContext(StateContext);
