import ACTIONS from '../constants/actions';

export const fetchRecentRides = (data, startIndex, emailId) => {
  return {
    type: ACTIONS.FETCH_RECENTRIDE_LISTS,
    payload: { data, startIndex, emailId }
  };
}

export const fetchRecentRidesSuccess = (data) => {
  return {
    type: ACTIONS.FETCH_RECENTRIDE_LISTS_SUCCESS,
    payload: data
  };
}

export const fetchRecentRidesListError = (data) => {
  return {
    type: ACTIONS.FETCH_RECENTRIDE_LISTS_ERROR,
    payload: data
  };
}

export const clearRecentRidesReducer = () => {
  return {
    type: ACTIONS.CLEAR_RECENT_RIDES_REDUCER,
  }
}
