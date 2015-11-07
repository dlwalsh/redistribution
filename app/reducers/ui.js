import { DATA_LOADED, DATA_LOADING } from '../constants/ActionTypes';

const initialState = {
    loaded: false
};

export default function ui(state = initialState, action) {

    switch (action.type) {

        case DATA_LOADED:
            return Object.assign({}, state, {
                loaded: true
            });

        case DATA_LOADING:
            return Object.assign({}, state, {
                loaded: false
            });

    }

    return state;

}
