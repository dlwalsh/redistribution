import { combineReducers } from 'redux';
import divisions from './divisions';
import geodata from './geodata';
import ui from './ui';

const rootReducer = combineReducers({
  divisions,
  geodata,
  ui,
});

export default rootReducer;
