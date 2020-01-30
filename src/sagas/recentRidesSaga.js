import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { recentRidesActions } from './../actions';
import axios from 'axios';

function recentRides(API_Upload_Detail, pageSize, startIndex, email ) {
    return axios({
        url: API_Upload_Detail + '/ride/recent', 
        method: 'GET',
        data: {},
        params:{ pageSize, startIndex, email},
        headers: {
            'Content-Type': 'application/json'
        }
    })
        
}
export default function* recentRidesList() {
    while (true) {
        const action = yield take(ACTIONS.FETCH_RECENTRIDE_LISTS);
        try {
            
            console.log("Trying to run");	
            const API_URL = yield select((state) => state.app.API_URL);
            console.log(action.payload)
            let pageSize = action.payload.data;
            let startIndex = action.payload.startIndex;
            let emailId = action.payload.emailId;

            const [response] = yield all([call(recentRides, API_URL, pageSize, startIndex, emailId)]);
            console.log("response", response);
            
            const item = response && response.data;
            console.log("item", item);
            if (item) {
             
                yield put(recentRidesActions.fetchRecentRidesSuccess(item));
            } else {
                yield put(recentRidesActions.fetchRecentRidesListError(JSON.stringify(item)));
            }
         
        }
        catch (e) {
            yield put(recentRidesActions.fetchRecentRidesListError(JSON.stringify(e.response.data.message)));
        }
    }
}