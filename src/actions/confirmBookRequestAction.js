import ACTIONS from '../constants/actions';

export const confirmBookRequest = (bookRequest) =>{
    return{
        type: ACTIONS.CONFIRM_BOOK_REQUEST,
        payload: bookRequest
    };
}

export const confirmBookRequestSuccess = (bookRequestSuccess) => {

	return {
		type: ACTIONS.CONFIRM_BOOK_REQUEST_SUCCESS,
		payload: bookRequestSuccess
	}
}

export const confirmBookRequestError = (bookingErrMsg) => {
	return {
		type: ACTIONS.CONFIRM_BOOK_REQUEST_ERROR,
		payload: bookingErrMsg
	}
}