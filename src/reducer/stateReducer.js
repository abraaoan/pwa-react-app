import { ADD_PRODUCT, TOGGLE_PRODUCT } from '../actions/actionsTypes';
import Json from '../assets/products.json';

const initialState = {
  newValue: []
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_PRODUCT:
      return {
        ...state,
        newValue: state.newValue.push(Json.product)
      };

    case TOGGLE_PRODUCT:
      return {
        ...state,
        products: Json.products
      };
    default:
      return state;
  }
};