import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.SEND_LOGIN_REQUEST:
			state = action.payload
			return { ...state, errMsg: false, successMsg: false, isLoginFetching: true }

		case ACTIONS.FETCH_LOGIN_ERROR:
			return { ...state, errMsg: action.payload, isLoginFetching: false, successMsg: false };

		case ACTIONS.CLEAR_LOGIN_NOTIFICATINS:
			return { ...state, errMsg: undefined, successMsg: false, isLoginFetching: false };

		case ACTIONS.CLEAR_LOGIN_SUCCESS_NOTIFICATINS:
			return { ...state, userDoesNotExist: false, isLoginFetching: false };

		case ACTIONS.FETCH_LOGIN_SUCCESS:
			return { ...state, loginData: action.payload, userDoesNotExist: true, successMsg: true, errMsg: undefined, isLoginFetching: false };

		default:
			return { ...state };

	}

}