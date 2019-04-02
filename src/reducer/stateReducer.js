import { 
  ADD_PRODUCT,
  TOGGLE_PRODUCT,
} from '../actions/actionsTypes';

// import json from '../assets/products.json';

const initState = {
  products: [],
}

export const productReducer = (state = initState, action) => {

  switch (action.type) {

    case ADD_PRODUCT:

      return {
        ...state,
        products: state.products.concat(action.product)
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
