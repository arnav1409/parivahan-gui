import ACTIONS from '../constants/actions';

export const rejectingOfferRequest = (acceptingOffer) => {
  return {
    type: ACTIONS.REJECT_OFFER_REQUEST,
    payload: acceptingOffer
  };
}

export const rejectingOfferSuccess = (acceptingSuccess) => {

  return {
    type: ACTIONS.REJECT_OFFER_SUCCESS,
    payload: acceptingSuccess
  }
}

export const rejectingOfferError = (errorMsg) => {
  return {
    type: ACTIONS.REJECT_OFFER_ERROR,
    payload: errorMsg
  }
}
export const clearRejectingNotifications = () => {
	return {
		type: ACTIONS.CLEAR_REJECT_NOTIFICATINS
	}
}

export const clearRejectingSuccessNotifications = () => {
	return {
		type: ACTIONS.CLEAR_REJECT_SUCCESS_NOTIFICATINS
	}
}