import ACTIONS from '../constants/actions';

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.SHOW_MESSAGE:
			return { ...state, msgShow: true, message : action.message, theme: action.theme }

		case ACTIONS.HIDE_MESSAGE:
			return { ...state, msgShow: false }
			
		default:
			return { ...state };
	}
}