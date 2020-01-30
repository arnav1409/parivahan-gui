import ACTIONS from '../constants/actions';
import { call, put, select, all, takeLatest } from 'redux-saga/effects';
import { locationSearchActions } from './../actions';
import axios from 'axios';

function uploadDetails(API_Upload_Detail, searchLocation) {
    return axios({
        url: API_Upload_Detail + '/places?'+'query='+searchLocation,
        method: 'GET',
        data: {},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .catch(err => {
            console.log(err);
        });
}

export default function* signUp() {
  yield takeLatest(ACTIONS.LOCATION_SEARCH_REQUEST, signUpSaga);
}

function* signUpSaga(action) {
    try {
        console.log("Trying to run");
        const API_URL = yield select((state) => state.app.API_URL);
        const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);
        console.log("response", response);
        const item = response && response.data;
        console.log("item", item);
        if (item) {
            yield put(locationSearchActions.locationSearchSuccess(item));
        } else {
            yield put(locationSearchActions.locationSearchError(JSON.stringify(item)));
        }

    }
    catch (e) {
        console.log("Do it tomorrow");
    }
}