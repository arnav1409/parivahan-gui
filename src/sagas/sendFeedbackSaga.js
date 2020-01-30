import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { feedbackAction } from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function uploadDetails (API_URL, feedback) {
   let LOGIN_URL = API_URL + '/feedback';
   console.log('saga call========>',feedback)
	 return axios({
    url: LOGIN_URL,
    data:feedback,
    params: feedback, 
    method: 'POST', 
    headers: {
        // 'Accept': 'application/json',
        'Content-Type':'application/json'
    }
    })
}
export default function* feedBack() {
  while(true){
		const action = yield take(ACTIONS.SEND_FEEDBACK_REQUEST);
    try{
      console.log("Trying to run");	
      
            const API_URL = yield select((state) => state.app.API_URL);
            const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);
            console.log("response", response);
            
            const item = response && response.data;
            console.log("item", item);
            if (item ) {
              yield put(feedbackAction.fetchFeedbackSuccess(item));
          } else {
              yield put(feedbackAction.fetchFeedbackError(JSON.stringify(item)));
          }

		}
		catch(e){
			yield put(feedbackAction.fetchFeedbackError('Server Error'))
		}
  }
}