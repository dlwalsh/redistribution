import { DATA_LOADING, SET_GEODATA } from '../constants/ActionTypes';

const initialState = {
  loaded: false,
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return Object.assign({}, state, {
        loaded: false,
      });
    case SET_GEODATA:
      return Object.assign({}, state, {
        loaded: true,
      });
    default:
  }

  return state;
}
