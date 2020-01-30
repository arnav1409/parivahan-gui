import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { acceptOffer } from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function uploadDetails(API_URL, loginDetails, bookingId) {
    console.log('data', loginDetails);
    let LOGIN_URL = API_URL + '/booking/' + bookingId + '?' + 'rideStatus=ACCEPTED'
    return axios({
        url: LOGIN_URL,
        method: 'PUT',
        data: loginDetails,
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .catch(err => {
            console.log(err);
        });
}


export default function* OfferAccept() {
    while (true) {

        const action = yield take(ACTIONS.ACCEPT_OFFER_REQUEST);
        try {
            console.log("Trying to run");
            const API_URL = yield select((state) => state.app.API_URL);
            const payload = action.payload;
            const bookingId = payload.bookingId;
            const [response] = yield all([call(uploadDetails, API_URL, payload, bookingId)]);
            console.log('response',response)
            const item = response && response.data;            
            let offerIdData = yield select((state) => state.offerIdCheck.offerIdData);
            let rideRequests = offerIdData.rideRequests
            const indexOfChangedStatus = rideRequests.findIndex(rideObject => rideObject.bookingId === item.bookingId);
            rideRequests[indexOfChangedStatus] = item
            offerIdData.rideRequests = rideRequests

            if (item) {
                yield put(acceptOffer.accpetingOfferSuccess(item));
            } else {
                yield put(acceptOffer.accpetingOfferError(JSON.stringify(item)));
            }

        }
        catch (e) {
            yield put(acceptOffer.accpetingOfferError('Server Error'))
        }
    }
}