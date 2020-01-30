import ACTIONS from '../constants/actions';

export const sendBookingIdRequest = (bookinLoginDetails) => {
	return {
		type: ACTIONS.SEND_BOOKINGID_REQUEST,
		payload: bookinLoginDetails
	};
}

export const fetchBookingIdSuccess = (bookingLoginData) => {
	return {
		type: ACTIONS.FETCH_BOOKINGID_SUCCESS,
		payload: bookingLoginData
	}
}

export const fetchBookingIdError = (bookingErrMsg) => {
	return {
		type: ACTIONS.FETCH_BOOKINGID_ERROR,
		payload: bookingErrMsg
	}
}

export const clearBookingIdNotifications = () => {
	return {
		type: ACTIONS.CLEAR_BOOKINGID_NOTIFICATINS
	}
}

export const clearBookingIdSuccessNotifications = () => {
	return {
		type: ACTIONS.CLEAR_BOOKINGID_SUCCESS_NOTIFICATINS
	}
}
