import { createStore as reduxCreateStore } from "redux";

const initialState = {
  selectedReddit: "reactjs",
  postsByReddit: {}
}

let store;

export function createStore() {
  const args = [].slice.call(arguments);
  store = reduxCreateStore.apply(undefined, [reducer, initialState].concat(args));
  return store;
}

function reducer(state, action) {
  return action && action.type === "REPLACE_STATE" ? action.state : state;
}

export function getState(selector) {
  return selector ? selector(store.getState()) : store.getState();
}

export function updateState(property, update) {
  const state = store.getState();
  const newState = { ...state, [property]: update(state[property]) };
  store.dispatch({ type: "REPLACE_STATE", state: newState });
}
