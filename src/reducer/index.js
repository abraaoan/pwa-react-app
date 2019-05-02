import { productReducer } from './stateReducer';
import { clientReducer } from './clientReducer';
import { orderReducer } from './orderReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  productState: productReducer,
  clientState: clientReducer,
  orderState: orderReducer,
});
