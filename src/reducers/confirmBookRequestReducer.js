import ACTIONS from '../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {

		case ACTIONS.CONFIRM_BOOK_REQUEST:
        state = action.payload
		return{...state, bookingErrMsg: false,successMsg: false, isBookingFetching: true, confirmBookRequest: action.payload}

		case ACTIONS.CONFIRM_BOOK_REQUEST_ERROR:
            return { ...state, bookingErrMsg: action.payload, successMsg: false , isBookingFetching: false};
            
        case ACTIONS.CONFIRM_BOOK_REQUEST_SUCCESS:
            console.log(action.payload);
            return { ...state,  requestStatus: 'SUCCESSFUL', confirmBookRequest: action.payload , successMsg: true, bookingErrMsg: undefined, isBookingFetching: false};
		case 'CLEAR_BACK_LOG' :
			return { ...state, successMsg: false  };
		
		case 'CLEAR_BOOKING_NOTIFICATION':
			return { ...state, bookingErrMsg: undefined, successMsg: undefined };

		default:
			return { ...state };
			
	}
	
}