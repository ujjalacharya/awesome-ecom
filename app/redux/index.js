import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

// export const initStore = (initialState = {}) => {
//   return createStore(reducer, initialState, applyMiddleware(thunk));
// };
const initialState = {};
const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware));

// set up a store subscription listener
// to store the Auths token in localStorage

// initialize current state from redux store for subscription comparison
// preventing undefined error
let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.authentication.token !== currentState.authentication.token) {
    const token = currentState.authentication.token;
    // setAuthToken(token);
  }
});

export default store;
