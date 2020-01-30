import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.SEND_REVIEWED_REQUEST:
			state = action.payload
			return { ...state, errMsg: '' , PreviewData : action.payload, isOfferFetching : true }
		case ACTIONS.FETCH_REVIEWED_SUCCESS:
			state = action.payload
			return { ...state, PreviewData: action.payload, successMsg: true, errMsg: undefined, isOfferFetching: false };
		case ACTIONS.FETCH_REVIEWED_ERROR:
			return { ...state, errorMsg: action.payload };
			case 'CLEAR_BACK_LOG' :
			return { ...state, successMsg: false  };
		default:
			return { ...state };

	}

}