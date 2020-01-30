import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { cancelBookedRideActions, bookingIdActions } from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function sendCancelBookedRideRequest(API_URL, loginDetails) {
    console.log(loginDetails)
    let LOGIN_URL = API_URL + '/booking/' + loginDetails.bookingId+'?'+'rideStatus=CANCELLED'
    return axios({
        url: LOGIN_URL,
        method: 'PUT',
        data: loginDetails,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(err => {
            console.log(err);
        });
}
export default function* cancelRequest() {
    while (true) {
        console.log('im here')
        const action = yield take(ACTIONS.SEND_CANCELBOOKEDRIDE_REQUEST);
        try {
            console.log("Trying to run");
            const API_URL = yield select((state) => state.app.API_URL);
            console.log(action.payload)
            const [response] = yield all([call(sendCancelBookedRideRequest, API_URL, action.payload)]);
            console.log("response", action.payload);
            const item = response && response.data;
            let cancelBookedRideReducer = yield select((state) => state.bookingIdReducer.bookingIdData);
            cancelBookedRideReducer = item       
            
            if (item) {
                yield put(cancelBookedRideActions.fetchCancelBookedRideSuccess(item));
                yield put(bookingIdActions.fetchBookingIdSuccess(item));

            } else {
                yield put(cancelBookedRideActions.fetchCancelBookedRideError(JSON.stringify(item)));
            }

        }
        catch (e) {
            yield put(cancelBookedRideActions.fetchCancelBookedRideError('Server Error'))
        }
    }
}