import ACTIONS from './../constants/actions';

export default (state , action) => {
	switch (action.type) {
		case ACTIONS.FETCH_SHUTTLE_LISTS:
			return { ...state, shuttleBookingErrMsg: '', isShuttleBookingFetching: true }
			break;

		case ACTIONS.FETCH_SHUTTLE_LISTS_ERROR:
			return { ...state, shuttleBookingErrMsg: undefined, isShuttleBookingFetching: false };
			break;

		case ACTIONS.FETCH_SHUTTLE_LISTS_SUCCESS:
		console.log('state ', state )
			return { ...state, requestStatus: 'SUCCESSFUL', shuttleRides: action.payload, shuttleBookingSuccessMsg: true, shuttleBookingErrMsg: undefined, isShuttleBookingFetching: false };
			break;

		default:
			return { ...state };

    }
}