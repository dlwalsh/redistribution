import * as types from '../constants/ActionTypes';

export function selectDivision(value) {
  return {
    type: types.SELECT_DIVISION,
    value,
  };
}

function dataLoading() {
  return {
    type: types.DATA_LOADING,
  };
}

function setGeodata(data) {
  return {
    type: types.SET_GEODATA,
    data,
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
    fetchData('/data/nsw.json').then((data) => {
      dispatch(setGeodata(data));
    });
  };
}
