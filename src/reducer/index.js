import { ProductReducer } from './stateReducer';
// import { OtherReducer } from './otherReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  ProductReducer: ProductReducer,
  // otherState: otherReducer
});