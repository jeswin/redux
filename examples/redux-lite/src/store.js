import { createStore as reduxCreateStore } from "redux";

const initialState = {
  selectedReddit: "reactjs",
  postsByReddit: {}
};

let store;

const ACTION_PREFIX = "$$RX";

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
  return action && action.type.startsWith(ACTION_PREFIX) ? action.state : state;
}

export function getState(selector) {
  return selector ? selector(store.getState()) : store.getState();
}

export function updateState(property, update, actionType) {
  const state = store.getState();
  const newState = { ...state, [property]: update(state[property]) };
  store.dispatch({
    type: actionType ? `${ACTION_PREFIX}.${actionType}` : ACTION_PREFIX,
    state: newState
  });
}
