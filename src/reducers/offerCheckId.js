import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.SEND_OFFERID_REQUEST:
			state = action.payload
			return { ...state, errMsg: false, successMsg: false, isOfferIdFetching: true }
		case ACTIONS.FETCH_OFFERID_ERROR:
		console.log('errMsg action.payload',action.payload)
			return { ...state, errMsg: action.payload, isOfferIdFetching: false, successMsg: false };
		case ACTIONS.FETCH_OFFERID_SUCCESS:
			return { ...state, offerIdData: action.payload, idDoesNotExist: true, successMsg: true, errMsg: undefined, isOfferIdFetching: false };
		case 'CLEAR_OFFERID_NOTIFICATIONS':
			return { ...state, errMsg: undefined, successMsg: undefined, isOfferIdFetching: undefined };
		case ACTIONS.CLEAR_OFFERID_SUCCESS_NOTIFICATINS:
			return { ...state, idDoesNotExist: false, isOfferIdFetching: false, offerIdErr: undefined, offerSuccessMsg: false, successMsg:undefined, errMsg : undefined };

		default:
			return { ...state };

	}

}