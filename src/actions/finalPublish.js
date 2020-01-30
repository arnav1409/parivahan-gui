import ACTIONS from '../constants/actions';

export const sendReviewedRequest = (publishDetails) => {    
	return {
		type: ACTIONS.SEND_REVIEWED_REQUEST,
		payload: publishDetails
	};
}
export const fetchReviewedSuccess = (bookRideSuccess) => {

	return {
		type: ACTIONS.FETCH_REVIEWED_SUCCESS,
		payload: bookRideSuccess
	}
}

export const fetchReviewedError = (errorMsg) => {
	return {
		type: ACTIONS.FETCH_REVIEWED_ERROR,
		payload: errorMsg
	}
}