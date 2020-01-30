import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { bookingIdActions} from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function uploadDetails(API_URL, loginDetails) {
    console.log(loginDetails)
    let LOGIN_URL = API_URL + '/booking/' + loginDetails.bookingId;
    console.log('api:', LOGIN_URL)
    return axios({
        url: LOGIN_URL,
        data: {},
        method: 'get',
        params: loginDetails,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export default function* bookingIdCheck() {
    while (true) {
        const action = yield take(ACTIONS.SEND_BOOKINGID_REQUEST);
        try {
            console.log("Trying to run");
            const API_URL = yield select((state) => state.app.API_URL);
            const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);
            console.log("response", response);

            const item = response && response.data;
            console.log("item", item);
            if (item.bookingId) {
                yield put(bookingIdActions.fetchBookingIdSuccess(item));
            } else {
                yield put(bookingIdActions.fetchBookingIdError(JSON.stringify(item)));
            }

        }
        catch (e) {
            console.log('do it tomorrow',
            JSON.stringify(e.response.data.message));
            yield put(bookingIdActions.fetchBookingIdError(JSON.stringify(e.response.data.message)))
        }
    }
}