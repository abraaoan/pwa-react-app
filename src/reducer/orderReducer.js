import { 
  ADD_ORDER,
  ADD_ORDERS,
} from '../actions/actionsTypes';

// import json from '../assets/products.json';

const initState = {
  orders: [],
  order: {}
}

export const orderReducer = (state = initState, action) => {

  switch (action.type) {

    case ADD_ORDER:

      return {
        ...state,
        orders: state.orders.concat(action.order)
      }

    case ADD_ORDERS:

      return {
        ...state,
        orders: action.orders
      }

    default:
      return state;
  }
};
