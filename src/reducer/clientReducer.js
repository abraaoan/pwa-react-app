import { 
  ADD_CLIENTS,
  ADD_CLIENT,
} from '../actions/actionsTypes';

// import json from '../assets/products.json';

const initState = {
  clients: [],
  client: {}
}

export const clientReducer = (state = initState, action) => {

  switch (action.type) {

    case ADD_CLIENT:

      return {
        ...state,
        clients: state.clients.concat(action.client)
      }

    case ADD_CLIENTS:

      return {
        ...state,
        clients: action.clients
      }

    default:
      return state;
  }
};
