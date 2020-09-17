import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './src/reducers';

const appReducer = combineReducers({
  main: mainReducer,
});

const configureStore = () => {
  return createStore(appReducer, applyMiddleware(thunk));
};

export default configureStore;
