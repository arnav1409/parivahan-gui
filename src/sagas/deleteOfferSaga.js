import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { deleteOffer } from './../actions';
import axios from 'axios';

function uploadDetails(API_URL, loginDetails,offerCode) {
    console.log('data',loginDetails);
    console.log('code',offerCode);
   
    let LOGIN_URL = API_URL +'/ride'+'?offerCode='+offerCode
    return axios({
        url: LOGIN_URL,
        method: 'DELETE',
        data: loginDetails,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(err => {
            console.log(err);
        });
}
export default function* OfferDelete() {
    while (true) {
        
        const action = yield take(ACTIONS.DELETE_OFFER_REQUEST);
        try {
            console.log("Trying to run");
            const API_URL = yield select((state) => state.app.API_URL);
            const payload = action.payload;
            const offerCode = payload.id;
            const [response] = yield all([call(uploadDetails, API_URL, payload, offerCode)]);
            const item = response && response.data;
            if (item ) {
                yield put(deleteOffer.deletingOfferSuccess(item));
            } else {
                yield put(deleteOffer.deletingOfferError(JSON.stringify(item)));
            }

        }
        catch (e) {
            yield put(deleteOffer.deletingOfferError('Server Error'))
        }
    }
}