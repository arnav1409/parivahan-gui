import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.ACCEPT_OFFER_REQUEST:
			state = action.payload
			return { ...state, showLoader: true, errMsg: false, successMsg: false, isRequestFetching: true }
		case ACTIONS.ACCEPT_OFFER_ERROR:
			return { ...state, errMsg: action.payload, isRequestFetching: false, successMsg: false };
		case ACTIONS.ACCEPT_OFFER_SUCCESS:
			return { ...state, showLoader: false,loginData: action.payload, successMsg: true, errMsg: undefined, isRequestFetching: false };
		case 'CLEAR_NOTIFICATINS':
			return { ...state, errMsg:undefined, successMsg:undefined, isAccpeted: false };
		default:
			return { ...state };

	}

}