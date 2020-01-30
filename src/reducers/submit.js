import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.SEND_SIGNUP_REQUEST:
			return { ...state, errMsg: false, successMsg: false, isFetching: true }

		case ACTIONS.FETCH_SIGNUP_ERROR:
			return { ...state, errorMsg: action.payload, isFetching: false, successMsg: false };

		case 'CLEAR_SIGNUP_NOTIFICATION':
			return { ...state, errorMsg: undefined, successMsg: undefined, hideForm:false  };

		case ACTIONS.FETCH_SIGNUP_SUCCESS:
			return { ...state, signUpData: action.payload, successMsg: true, errMsg: undefined, isFetching: false };

		default:
			return { ...state };

	}

}