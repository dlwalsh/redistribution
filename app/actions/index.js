import * as types from '../constants/ActionTypes';

export function selectDivision (value) {
    return {
        type: types.SELECT_DIVISION,
        value
    };
}
