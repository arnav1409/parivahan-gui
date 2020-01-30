import ACTIONS from '../constants/actions';

export const sendPublishRequest = (publishDetails) => {    
	return {
		type: ACTIONS.SEND_PUBLISH_REQUEST,
		payload: publishDetails
	};
}
export const fetchPublishSuccess = (bookRideSuccess) => {
	return {
		type: ACTIONS.FETCH_PUBLISH_SUCCESS,
		payload: bookRideSuccess
	}
}

export const fetchPublishError = (errorMsg) => {
	return {
		type: ACTIONS.FETCH_PUBLISH_ERROR,
		payload: errorMsg
	}
}