import * as types from '../constants/ActionTypes';

export function selectDivision(value) {
    return {
        type: types.SELECT_DIVISION,
        value
    };
}

function dataLoading() {
    return {
        type: types.DATA_LOADING
    };
}

function dataLoaded() {
    return {
        type: types.DATA_LOADED
    };
}

function setLegacyData(data) {
    return {
        type: types.SET_LEGACY_DATA,
        data
    };
}

function setLatestData(data) {
    return {
        type: types.SET_LATEST_DATA,
        data
    };
}

function setRelationshipData(data) {
    return {
        type: types.SET_RELATIONSHIP_DATA,
        data
    };
}

function fetchData(resource) {
    return fetch(resource)
        .then((response) => response.json())
        .catch((error) => {
            throw error;
        });
}

export function loadData() {

    return (dispatch) => {

        dispatch(dataLoading());

        return Promise.all([
            fetchData('/data/nsw-pre.json').then((data) =>
                dispatch(setLegacyData(data))
            ),
            fetchData('/data/nsw-proposed.json').then((data) =>
                dispatch(setLatestData(data))
            ),
            fetchData('/data/nsw-transform.json').then((data) =>
                dispatch(setRelationshipData(data))
            )
        ]).then(() => dispatch(dataLoaded()));

    };

}
