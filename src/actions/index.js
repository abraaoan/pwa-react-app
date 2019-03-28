import { ADD_PRODUCT, TOGGLE_PRODUCT, REMOVE_PRODUCT } from '../actions/actionTypes';
import { REMOVE_PRODUCT } from './actionsTypes';

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
});

export const toggleProduct = id => ({
  type: TOGGLE_PRODUCT,
  id
})

export const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  id
})