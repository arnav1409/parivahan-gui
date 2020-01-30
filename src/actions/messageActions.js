import ACTIONS from '../constants/actions';

export const showMessage = (theme, message) => {
	return {
		type: ACTIONS.SHOW_MESSAGE,
		theme: theme,
		message: message
	};
}

export const hideMessage = (payload) => {
	return {
		type: ACTIONS.HIDE_MESSAGE,
		payload: payload
	};
}