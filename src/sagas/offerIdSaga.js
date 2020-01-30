import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { offerId } from './../actions';
import axios from 'axios';


function uploadDetails(API_URL, loginDetails) {
    if(loginDetails.data){
    
        loginDetails.id = loginDetails.data.id 
        loginDetails.userEmail = loginDetails.userEmail.email
    }
    let LOGIN_URL = API_URL + '/offer/' + loginDetails.id+'?email='+loginDetails.userEmail;
    console.log('api:', LOGIN_URL)
    console.log('userEmail',loginDetails)
    return axios({
        url: LOGIN_URL,
        data: {},
        method: 'get',  
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default function* offerIdCheck() {
    while (true) {
        const action = yield take(ACTIONS.SEND_OFFERID_REQUEST);
        try {
            console.log("Trying to run");
            const API_URL = yield select((state) => state.app.API_URL);
            console.log('userPayload',action.payload)
            const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);
            console.log("response", response);

            const item = response && response.data;
            console.log("item", item);
            if (item.id) {
                yield put(offerId.fetchOfferIdSuccess(item));
            } else {
                yield put(offerId.fetchOfferIdError(JSON.stringify(item)));
            }

        }
        catch (e) {
            console.log('do it tomorrow',
            JSON.stringify(e.response.data.message));
            yield put(offerId.fetchOfferIdError(JSON.stringify(e.response.data.message)))
        }
    }
}