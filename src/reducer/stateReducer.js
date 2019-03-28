import { ADD_PRODUCT, TOGGLE_PRODUCT, REMOVE_PRODUCT } from '../actions/actionsTypes';
import json from '../assets/products.json';

const initState = {
  products: json.products,
}

export const ProductReducer = (state = initState, action) => {
  switch (action.type) {

    case ADD_PRODUCT:
      return {
        ...state,
        product: action.product
      }

    case TOGGLE_PRODUCT:
      return {
        ...state,
        product: state.map((product) => {

          if (product.id === action.id) {
            return product
          }
          return product
        })
      }
    default:
      return state;
  }
};