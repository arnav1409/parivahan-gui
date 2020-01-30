import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { finalPublish } from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function uploadDetails(API_Upload_Detail, publishDetails) {
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  return axios({
    url: API_Upload_Detail + '/ride?' + 'email' +'=' + user.email + '&showDetailsOnly' + '=' + 'false',
    method: 'POST',
    data: publishDetails,
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
  while (true) {
    const action = yield take(ACTIONS.SEND_REVIEWED_REQUEST);
    try {
      console.log("Trying to run");
      const API_URL = yield select((state) => state.app.API_URL);
      const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);
      console.log("response", response);
      const item = response && response.data;
      console.log("item", item);
      if (item) {
        yield put(finalPublish.fetchReviewedSuccess(item));
      } else {
        yield put(finalPublish.fetchReviewedError(JSON.stringify(item)));
      }

    }
    catch (e) {
      console.log("Do it tomorrow");
    }
  }
}