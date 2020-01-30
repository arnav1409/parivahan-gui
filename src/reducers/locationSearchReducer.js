import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.LOCATION_SEARCH_REQUEST:
			state = action.payload
			return { ...state, errMsg: false, successMsg: false, isLocationFetching: true }
		case ACTIONS.LOCATION_SEARCH_ERROR:
			return { ...state, errMsg: action.payload, isLocationFetching: false, successMsg: false };
		case ACTIONS.LOCATION_SEARCH_SUCCESS:
			return { ...state, locationSearch: action.payload, successMsg: true, errMsg: undefined, isLocationFetching: false };

		default:
			return { ...state };

	}

}