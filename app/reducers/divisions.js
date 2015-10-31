import { SELECT_DIVISION } from '../constants/ActionTypes';

const initialState = {
    selected: null
};

export default function divisions(state = initialState, action) {

    switch (action.type) {

        case SELECT_DIVISION:
            return Object.assign({}, state, {
                selected: action.value
            });

    }

    return state;

}
