import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { maxCountActions } from './../actions';
import axios from 'axios';

function maxCount(API_Upload_Detail) {
  console.log('API_Upload_Detail',API_Upload_Detail)
  let API_URL = API_Upload_Detail + '/ride/count';
    return axios({
        url: API_URL,
        method: 'GET',
        data: {},
        params:'',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        
}
export default function* maxCountNumber() {
    while (true) {
        const action = yield take(ACTIONS.FETCH_COUNT);
        try {
            
            console.log("Trying to run");	
            const API_URL = yield select((state) => state.app.API_URL);
            console.log(action.payload);

            const [response] = yield all([call(maxCount, API_URL, action.payload)]);
            console.log("response", response);
            
            const item = response && response.data;
            console.log("item", item);
            if (item) {
             
                yield put(maxCountActions.fetchCountSuccess (item));
            } else {
                yield put(maxCountActions.fetchCountError(JSON.stringify(item)));
            }
         
        }
        catch (e) {
            yield put(maxCountActions.fetchCountError(JSON.stringify(e.response.data.message)));
        }
    }
}