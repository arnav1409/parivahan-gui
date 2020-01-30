import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.SEND_PUBLISH_REQUEST:
			state = action.payload
			return { ...state, errMsg: false, successMsg: false, isOfferFetching: true }
		case ACTIONS.FETCH_PUBLISH_SUCCESS:
			state = action.payload
			return { ...state, loginData: action.payload,  successMsg: true, errMsg: undefined, isOfferFetching: false  }
		case ACTIONS.FETCH_PUBLISH_ERROR:
		console.log('errorMsg',action.payload)
			return { ...state, errorMsg: action.payload,
			isOfferFetching:false, successMsg:false  };

		case 'CLEAR_PUBLISH_NOTIFICATION':
			return { ...state, errorMsg: undefined, successMsg: undefined };

		default:
			return { ...state };

	}

}