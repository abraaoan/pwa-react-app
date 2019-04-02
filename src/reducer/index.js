import { productReducer } from './stateReducer';
// import { OtherReducer } from './otherReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  productState: productReducer
  // otherState: otherReducer
});
