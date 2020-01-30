import ACTIONS from '../constants/actions';

export const locationSearchRequest = (acceptingOffer) => {
  return {
    type: ACTIONS.LOCATION_SEARCH_REQUEST,
    payload: acceptingOffer
  };
}

export const locationSearchSuccess = (acceptingSuccess) => {

  return {
    type: ACTIONS.LOCATION_SEARCH_SUCCESS,
    payload: acceptingSuccess
  }
}

export const locationSearchError = (errorMsg) => {
  return {
    type: ACTIONS.LOCATION_SEARCH_ERROR,
    payload: errorMsg
  }
}
export const clearSearchNotifications = () => {
	return {
		type: ACTIONS.CLEAR_LOCATION_SEARCH_NOTIFICATINS
	}
}

export const clearSearchSuccessNotifications = () => {
	return {
		type: ACTIONS.CLEAR_LOCATION_SEARCH_SUCCESS_NOTIFICATINS
	}
}