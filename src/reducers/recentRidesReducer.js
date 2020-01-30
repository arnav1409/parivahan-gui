import ACTIONS from './../constants/actions';
export default (state, action) => {
	switch (action.type) {
		case ACTIONS.FETCH_RECENTRIDE_LISTS:
			return { ...state, recentBookingErrMsg: '', isRecentBookingFetching: true }
			break;

		case ACTIONS.FETCH_RECENTRIDE_LISTS_ERROR:
			return { ...state, recentBookingErrMsg: undefined, isRecentBookingFetching: false };
			break;

		case ACTIONS.FETCH_RECENTRIDE_LISTS_SUCCESS:
        let recentRides = state.recentRides ? state.recentRides : [];
			return { ...state, requestStatus: 'SUCCESSFUL', recentRides: [...recentRides, ...action.payload], recentBookingSuccessMsg: true, recentBookingErrMsg: undefined, isRecentBookingFetching: false };
			break;
      
    case ACTIONS.CLEAR_RECENT_RIDES_REDUCER: 
      return { ...state, recentRides: [], recentBookingSuccessMsg: false, recentBookingErrMsg: undefined, isRecentBookingFetching: false };
      break;

		default:
			return { ...state };

	}

}