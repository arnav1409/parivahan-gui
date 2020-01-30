import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.SEND_FEEDBACK_REQUEST:
			state = action.payload
			return { ...state, showLoader: true, errMsg: false, successMsg: false, isRequestFetching: true }
		case ACTIONS.FETCH_FEEDBACK_ERROR:
			return { ...state, errMsg: action.payload, isRequestFetching: false, successMsg: false  };
		case ACTIONS.FETCH_FEEDBACK_SUCCESS:
      return { ...state, showLoader: false, feedbackData: action.payload, successMsg: true, errMsg: undefined, isRequestFetching: false };
      
      case ACTIONS.CLEAR_FEEDBACK_SUCCESS_NOTIFICATINS:
			return { ...state, errMsg:undefined, successMsg:undefined, isDeleting: false };

		case ACTIONS.CLEAR_FEEDBACK_NOTIFICATINS:
			return { ...state, feedbackData: action.payload,  successMsg: true, errMsg: undefined, isDeleting : false };
		default:
			return { ...state };

	}

}