import ACTIONS from './../constants/actions';

export default (state , action) => {
	switch (action.type) {
		case ACTIONS.FETCH_COUNT:
			return { ...state, countErrMsg: '', isCountFetching: true }
			break;

		case ACTIONS.FETCH_COUNT_ERROR:
			return { ...state, countErrMsg: undefined, isCountFetching: false };
			break;

		case ACTIONS.FETCH_COUNT_SUCCESS:
			return { ...state, requestStatus: 'SUCCESSFUL', maxCount: action.payload, countSuccessMsg: true, countErrMsg: undefined, isCountFetching: false };
			break;

		default:
			return { ...state };

    }
}