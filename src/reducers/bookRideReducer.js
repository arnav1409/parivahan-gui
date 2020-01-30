import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {

		case ACTIONS.FETCH_BOOKRIDE_LISTS:
        state = action.payload
		return{...state, bookingErrMsg:'',isBookingFetching: true}

		case ACTIONS.FETCH_BOOKRIDE_LISTS_ERROR:
            return { ...state, bookingErrMsg: undefined, isBookingFetching:false };
            
        case ACTIONS.FETCH_BOOKRIDE_LISTS_SUCCESS:
            console.log(action.payload);
            return { ...state,  requestStatus: 'SUCCESSFUL', availableRides: action.payload, bookingSuccessMsg: true, bookingErrMsg: undefined, isBookingFetching: false};
        
        case ACTIONS.BOOKING_BOOKRIDE_FAILED:
			return { ...state, requestStatus: 'FAILED' };

		default:
			return { ...state };
			
	}
	
}