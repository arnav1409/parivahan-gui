import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.REJECT_OFFER_REQUEST:
		state = action.payload
		return{...state, errMsg: false, showLoader: true, successMsg: false, isLoginFetching: true}
		case ACTIONS.REJECT_OFFER_ERROR:
		return { ...state, errMsg: action.payload, isLoginFetching: false, successMsg: false };
		case ACTIONS.REJECT_OFFER_SUCCESS:
			return { ...state, loginData: action.payload, showLoader: false, successMsg: true, errMsg: undefined, isLoginFetching: false };
		case 'CLEAR_NOTIFICATINS':
			return { ...state, errMsg:undefined, successMsg:undefined, isAccpeted: false };
		default:
			return { ...state };
			
	}
	
}