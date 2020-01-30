import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.SEND_BOOKINGID_REQUEST:
			state = action.payload
			return { ...state, bookingErrMsg: false, bookingSuccessMsg: false, isBookingIdFetching: true }
		case ACTIONS.FETCH_BOOKINGID_ERROR:
		console.log('error======>',action.payload)
			return { ...state, bookingErrMsg: action.payload, isBookingIdFetching: false, bookingSuccessMsg: false };
		case ACTIONS.FETCH_BOOKINGID_SUCCESS:
            return { ...state, bookingIdData: action.payload, bookingIdDoesNotExist: true, bookingSuccessMsg: true, bookingErrMsg: undefined, isBookingIdFetching: false };
        case 'CLEAR_BOOKINGID_NOTIFICATIONS':
			return { ...state, bookingErrMsg: undefined, bookingSuccessMsg: undefined ,bookingIdDoesNotExist: undefined, isBookingIdFetching: undefined };

		default:
			return { ...state };

	}

}