import { 
  ADD_PRODUCT,
  ADD_PRODUCTS,
  TOGGLE_PRODUCT, 
  REMOVE_PRODUCT 
} from './actionsTypes';

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product,
})

export const addProducts = products => ({
  type: ADD_PRODUCTS,
  products,
})

export const toggleProduct = id => ({
  type: TOGGLE_PRODUCT,
  id,
})

export const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  id,
})
