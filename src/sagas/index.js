import { fork } from "redux-saga/effects";
import { all } from 'redux-saga/effects';
import signUpSaga from './signUpSaga';
import bookRideSaga from './bookRrideSaga';
import publishOffer from './publishOffer';
import loginSaga from './loginSaga';
import confirmBookRequestSaga from './confirmBookRequestSaga';
import acceptOffer from "./acceptOffer";
import finalReviewedSaga from "./finalReviewSaga";
import offerIdSaga from "./offerIdSaga";
import rejectOfferSaga from "./rejectOfferSaga";
import  deleteOfferSaga  from "./deleteOfferSaga";
import bookingIdSaga from "./bookingIdSaga";
import locationSearchSaga from "./locationSearchSaga";
import recentRidesSaga from './recentRidesSaga';
import cancelBookedRideSaga from "./cancelBookedRideSaga";
import sendFeedBackSaga from "./sendFeedbackSaga";
import shuttleRideSaga from './shuttleRideSaga';
import maxCountSaga from './maxCountSaga';

export default function* rootSaga() {
	yield all([
		fork(signUpSaga),
		fork(bookRideSaga),
		fork(publishOffer),
		fork(loginSaga),
		fork(confirmBookRequestSaga),
		fork(acceptOffer),
		fork(finalReviewedSaga),
		fork(offerIdSaga),
		fork(rejectOfferSaga),
		fork(deleteOfferSaga),
		fork(bookingIdSaga),
		fork(locationSearchSaga),
		fork(recentRidesSaga),
		fork(cancelBookedRideSaga),
		fork(sendFeedBackSaga),
		fork(shuttleRideSaga),
    fork(maxCountSaga),
	]);
}