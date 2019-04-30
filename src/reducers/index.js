import { combineReducers } from "redux";
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';
import soundReducer from './soundReducer';
import playListReducer from './playListReducer';

export default combineReducers({
  userReducer,
  tokenReducer,
  playListReducer,
  soundReducer
});
