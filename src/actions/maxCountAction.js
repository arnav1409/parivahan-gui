import ACTIONS from '../constants/actions';

export const fetchCount = () => {
  return {
    type: ACTIONS.FETCH_COUNT,
  };
}

export const fetchCountSuccess = (data) => {
  return {
    type: ACTIONS.FETCH_COUNT_SUCCESS,
    payload: data
  };
}

export const fetchCountError = (data) => {
  return {
    type: ACTIONS.FETCH_COUNT_ERROR,
    payload: data
  }
}