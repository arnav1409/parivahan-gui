import ACTIONS from '../constants/actions';

export const deletingOfferRequest = (acceptingOffer) => {
  return {
    type: ACTIONS.DELETE_OFFER_REQUEST,
    payload: acceptingOffer
  };
}

export const deletingOfferSuccess = (acceptingSuccess) => {

  return {
    type: ACTIONS.DELETE_OFFER_SUCCESS,
    payload: acceptingSuccess
  }
}

export const deletingOfferError = (errorMsg) => {
  return {
    type: ACTIONS.DELETE_OFFER_ERROR,
    payload: errorMsg
  }
}
export const clearDeleteNotifications = () => {
	return {
		type: ACTIONS.CLEAR_DELETE_NOTIFICATINS
	}
}

export const clearDeleteSuccessNotifications = () => {
	return {
		type: ACTIONS.CLEAR_DELETE_SUCCESS_NOTIFICATINS
	}
}