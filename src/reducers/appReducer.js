import ACTIONS from '../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.CONFIG_LOADED:
			return {
				...state,
				...action.config
			};
		default:
			return { ...state }
	}
};