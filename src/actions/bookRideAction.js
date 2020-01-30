import ACTIONS from '../constants/actions';

export const fetchBookRideDetails = (bookRideDetails) =>{
    console.log('in actions');
    return{
        type: ACTIONS.FETCH_BOOKRIDE_LISTS,
        payload: bookRideDetails
    };
}

export const fetchBookRideListSuccess = (bookRideSuccess) => {

	return {
		type: ACTIONS.FETCH_BOOKRIDE_LISTS_SUCCESS,
		payload: bookRideSuccess
	}
}

export const fetchBookRideListError = (bookingErrorMsg) => {
	return {
		type: ACTIONS.FETCH_BOOKRIDE_LISTS_ERROR,
		payload: bookingErrorMsg
	}
}