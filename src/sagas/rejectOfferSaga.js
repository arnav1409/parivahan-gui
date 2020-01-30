import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { rejectOffer } from './../actions';
import axios from 'axios';

function uploadDetails(API_URL, loginDetails,bookingId) {
    console.log('data',loginDetails);
    console.log("Code",bookingId);
    let LOGIN_URL = API_URL +'/booking/'+bookingId+'?'+'rideStatus=DECLINED'
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
export default function* OfferReject() {
    while (true) {
        
        const action = yield take(ACTIONS.REJECT_OFFER_REQUEST);
        try {
            console.log("Trying to run");
            const API_URL = yield select((state) => state.app.API_URL);
            const payload = action.payload;
            const bookingId = payload.bookingId;
            console.log('bookingCode',payload)
            const [response] = yield all([call(uploadDetails, API_URL,payload,bookingId)]);
            console.log("response",response.data);
            const item = response && response.data;            
            let offerIdData = yield select((state) => state.offerIdCheck.offerIdData);
            console.log('offerTdData=========>>>',offerIdData)
            let rideRequests = offerIdData.rideRequests
            console.log('rideRequests------->',rideRequests)
            let indexOfChangedStatus = rideRequests.findIndex(rideObject => rideObject.bookingId === item.bookingId);
            console.log('indexOfChangedStatus',indexOfChangedStatus);
            rideRequests[indexOfChangedStatus] = item
            offerIdData.rideRequests = rideRequests
            console.log('check',offerIdData.rideRequests)
            
            if (item ) {
                yield put(rejectOffer.rejectingOfferSuccess(item));
            } else {
                yield put(rejectOffer.rejectingOfferError(JSON.stringify(item)));
            }

        }
        catch (e) {
            yield put(rejectOffer.rejectingOfferError('Server Error'))
        }
    }
}