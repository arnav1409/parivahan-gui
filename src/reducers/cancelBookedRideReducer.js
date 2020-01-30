import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {

		case ACTIONS.SEND_CANCELBOOKEDRIDE_REQUEST:
        state = action.payload
		return{...state, errMsg: false, successMsg: false, isFetching: true, showLoader: true}

		case ACTIONS.FETCH_CANCELBOOKEDRIDE_ERROR:
		console.log('err action payload',action.payload)
            return { ...state, errMsg: action.payload, isFetching: false, successMsg: false };
            
        case ACTIONS.FETCH_CANCELBOOKEDRIDE_SUCCESS:
            console.log(action.payload);
            return { ...state, cancelRide: action.payload, successMsg: true, isFetching: false, errMsg: undefined, showLoader: false };
		case 'CLEAR_NOTIFICATIONS':
			return { ...state, errMsg:undefined, successMsg:undefined };
		default:
			return { ...state };
			
	}
	
}