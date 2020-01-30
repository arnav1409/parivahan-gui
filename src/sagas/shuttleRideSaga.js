import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { shuttleRideActions } from './../actions';
import axios from 'axios';

function shuttleRides(API_Upload_Detail, date) {
  console.log('date', date);
  let API_URL = API_Upload_Detail + '/shuttle/find/' + date;
    return axios({
        url: API_URL,
        method: 'GET',
        data: {},
        headers: {
            'Content-Type': 'application/json'
        }
    })
        
}
export default function* shuttleRidesList() {
    while (true) {
        const action = yield take(ACTIONS.FETCH_SHUTTLE_LISTS);
        try {
            
            console.log("Trying to run");	
            const API_URL = yield select((state) => state.app.API_URL);
            console.log(action.payload);

            const [response] = yield all([call(shuttleRides, API_URL, action.payload)]);
            console.log("response", response);
            
            const item = response && response.data;
            console.log("item", item);
            if (item) {
             
                yield put(shuttleRideActions.fetchShuttleRidesSuccess (item));
            } else {
                yield put(shuttleRideActions.fetchShuttleRidesListError(JSON.stringify(item)));
            }
         
        }
        catch (e) {
            yield put(shuttleRideActions.fetchShuttleRidesListError(JSON.stringify(e.response.data.message)));
        }
    }
}