import ACTIONS from '../constants/actions';

export const sendFeedback= (rating,comments) => {

	return {
		type: ACTIONS.SEND_FEEDBACK_REQUEST,
		payload: rating,comments
	};
}

export const fetchFeedbackSuccess = (feedback) => {
	return {
		type: ACTIONS.FETCH_FEEDBACK_SUCCESS,
		payload: feedback
	}
}

export const fetchFeedbackError = (errorMsg) => {
	return {
		type: ACTIONS.FETCH_FEEDBACK_ERROR,
		payload: errorMsg
	}
}

export const clearFeedbackNotifications = () => {
	return {
		type: ACTIONS.CLEAR_FEEDBACK_NOTIFICATINS
	}
}

export const clearFeedbackSuccessNotifications = () => {
	return {
		type: ACTIONS.CLEAR_FEEDBACK_SUCCESS_NOTIFICATINS
	}
}