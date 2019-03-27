import { ADD_PRODUCT, TOGGLE_PRODUCT } from '../actions/actionTypes';

export const addProduct = product => ({
  type: ADD_PRODUCT,
  products: product
});

export const getProduct = product => ({
  type: TOGGLE_PRODUCT,
  products: product
})