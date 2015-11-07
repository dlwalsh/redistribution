import { DATA_LOADED, DATA_LOADING } from '../constants/ActionTypes';

const initialState = {
    loading: false
};

export default function ui(state = initialState, action) {

    switch (action.type) {

        case DATA_LOADED:
            return Object.assign({}, state, {
                loading: false
            });

        case DATA_LOADING:
            return Object.assign({}, state, {
                loading: true
            });

    }

    return state;

}
