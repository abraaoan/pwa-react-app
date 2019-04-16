import { productReducer } from './stateReducer';
import { clientReducer } from './clientReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  productState: productReducer,
  clientState: clientReducer,
});
