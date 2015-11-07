import { SET_LATEST_DATA, SET_LEGACY_DATA, SET_RELATIONSHIP_DATA } from '../constants/ActionTypes';

const initialState = {
    latest: null,
    legacy: null,
    relationships: null
};

export default function geodata(state = initialState, action) {

    switch (action.type) {

        case SET_LATEST_DATA:
            return Object.assign({}, state, {
                latest: action.data
            });

        case SET_LEGACY_DATA:
            return Object.assign({}, state, {
                legacy: action.data
            });

        case SET_RELATIONSHIP_DATA:
            return Object.assign({}, state, {
                relationships: action.data
            });

    }

    return state;

}
