import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

const rootReducer = combineReducers({
  routing: routerReducer,
  reduxAsyncConnect
});

export default rootReducer;
