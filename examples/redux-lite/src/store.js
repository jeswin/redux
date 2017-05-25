import { createStore as reduxCreateStore } from "redux";

const initialState = {
  selectedReddit: "reactjs",
  postsByReddit: {}
};

let store;

export function createStore() {
  const args = [].slice.call(arguments);
  store = reduxCreateStore.apply(
    undefined,
    [
      reducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    ].concat(args)
  );
  return store;
}

function reducer(state, action) {
  return action && action.__replaceState ? action.state : state;
}

export function getState(selector) {
  return selector ? selector(store.getState()) : store.getState();
}

export function updateState(property, update, actionType) {
  const state = store.getState();
  const newState = { ...state, [property]: update(state[property]) };
  store.dispatch({
    type: actionType || "REPLACE_STATE",
    __replaceState: true,
    state: newState
  });
}

export function replaceState(newState) {
  store.dispatch({
    type: "REPLACE_STATE",
    __replaceState: true,
    state: newState
  });
}
