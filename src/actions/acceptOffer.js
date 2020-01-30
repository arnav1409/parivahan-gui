import ACTIONS from '../constants/actions';

export const accpetingOfferRequest = (acceptingOffer) => {
  return {
    type: ACTIONS.ACCEPT_OFFER_REQUEST,
    payload: acceptingOffer
  };
}

export const accpetingOfferSuccess = (acceptingSuccess) => {

  return {
    type: ACTIONS.ACCEPT_OFFER_SUCCESS,
    payload: acceptingSuccess
  }
}

export const accpetingOfferError = (errorMsg) => {
  return {
    type: ACTIONS.ACCEPT_OFFER_ERROR,
    payload: errorMsg
  }
}
export const clearacceptingNotifications = () => {
	return {
		type: ACTIONS.CLEAR_ACCEPT_NOTIFICATINS
	}
}

export const clearAcceptingSuccessNotifications = () => {
	return {
		type: ACTIONS.CLEAR_ACCEPT_SUCCESS_NOTIFICATINS
	}
}