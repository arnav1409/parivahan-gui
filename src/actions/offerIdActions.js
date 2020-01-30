import ACTIONS from '../constants/actions';

export const sendOfferIdRequest = (loginDetails) => {
	return {
		type: ACTIONS.SEND_OFFERID_REQUEST,
		payload: loginDetails
	};
}

export const fetchOfferIdSuccess = (loginData) => {
	return {
		type: ACTIONS.FETCH_OFFERID_SUCCESS,
		payload: loginData
	}
}

export const fetchOfferIdError = (errorMsg) => {
	return {
		type: ACTIONS.FETCH_OFFERID_ERROR,
		payload: errorMsg
	}
}
export const clearOfferIdNotifications = () => {
	return {
		type: ACTIONS.CLEAR_OFFERID_NOTIFICATINS
	}
}

export const clearOfferIdSuccessNotifications = () => {
	return {
		type: ACTIONS.CLEAR_OFFERID_SUCCESS_NOTIFICATINS
	}
}
