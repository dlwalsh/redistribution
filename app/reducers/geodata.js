import topojson from 'topojson';
import { SET_GEODATA } from '../constants/ActionTypes';

const initialState = {
  latest: null,
  legacy: null,
};

export default function geodata(state = initialState, action) {
  switch (action.type) {
    case SET_GEODATA:
      return Object.assign({}, state, {
        latest: topojson.feature(action.data, action.data.objects.new),
        legacy: topojson.feature(action.data, action.data.objects.old),
      });
    default:
  }

  return state;
}
