import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.DELETE_OFFER_REQUEST:
			state = action.payload
			return { ...state, errMsg: false, successMsg: false, isDeleting: true }

		case ACTIONS.DELETE_OFFER_ERROR:
			return { ...state, errMsg: action.payload, isDeleting: false, successMsg: false };

		case ACTIONS.CLEAR_DELETE_NOTIFICATINS:
			return { ...state, errMsg: undefined, successMsg: false, isDeleting: false };

		case ACTIONS.CLEAR_DELETE_SUCCESS_NOTIFICATINS:
			return { ...state, errMsg:undefined, successMsg:undefined, isDeleting: false };

		case ACTIONS.DELETE_OFFER_SUCCESS:
			return { ...state, loginData: action.payload,  successMsg: true, errMsg: undefined, isDeleting : false };

		default:
			return { ...state };

	}

}