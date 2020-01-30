import ACTIONS from '../constants/actions';

export const sendLoginRequest = (loginDetails) => {
	loginDetails.email = loginDetails.email + "@gslab.com";
	return {
		type: ACTIONS.SEND_LOGIN_REQUEST,
		payload: loginDetails
	};
}

export const fetchLoginSuccess = (loginData) => {
	return {
		type: ACTIONS.FETCH_LOGIN_SUCCESS,
		payload: loginData
	}
}

export const fetchLoginError = (errorMsg) => {
	return {
		type: ACTIONS.FETCH_LOGIN_ERROR,
		payload: errorMsg
	}
}

export const clearLoginNotifications = () => {
	return {
		type: ACTIONS.CLEAR_LOGIN_NOTIFICATINS
	}
}

export const clearLoginSuccessNotifications = () => {
	return {
		type: ACTIONS.CLEAR_LOGIN_SUCCESS_NOTIFICATINS
	}
}