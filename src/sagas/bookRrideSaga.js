import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { bookRideActions } from './../actions';
import axios from 'axios';

function bookRideDetails (API_URL,bookRideDetails) {
    bookRideDetails.radius = "2000";
    let LOGIN_URL = API_URL + '/ride/find';
    console.log('login-url', LOGIN_URL)
	 return axios({
    url: LOGIN_URL,
    method: 'GET',
    data: {},
    params: bookRideDetails,    
    headers: {
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json'
    }
    })
    .catch(err => {
        console.log(err);
        // if(err && err.response && err.response.data)
        //     alert(err.response.data.message);
    });
}

export default function* bookRide() {
    while(true){
      const action = yield take(ACTIONS.FETCH_BOOKRIDE_LISTS);
      try{
              console.log("Trying to run");
              const API_URL = yield select((state) => state.app.API_URL);
              console.log('actionPayload for preview',action.payload)
              const [response] = yield all([call(bookRideDetails,API_URL,action.payload)]);
              console.log(response);

              const items = response.data;
              if(typeof items === 'undefined'){
                    console.log("bug")
              }
              else {
                  console.log(items);
                 yield put(bookRideActions.fetchBookRideListSuccess(items));
              }
      }
          catch(e){
            yield put(bookRideActions.fetchBookRideListError());
        }
    }
    }
  