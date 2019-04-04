import { 
  ADD_PRODUCT,
  TOGGLE_PRODUCT,
  ADD_PRODUCTS,
  FILL_FIELDS,
} from '../actions/actionsTypes';

// import json from '../assets/products.json';

const initState = {
  products: [],
  product: {}
}

export const productReducer = (state = initState, action) => {

  switch (action.type) {

    case ADD_PRODUCT:

      return {
        ...state,
        products: state.products.concat(action.product)
      }

    case ADD_PRODUCTS:

      return {
        ...state,
        products: action.products
      }

    case FILL_FIELDS:

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
