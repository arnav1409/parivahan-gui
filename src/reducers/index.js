import { combineReducers } from 'redux';
import submit from './submit';
import bookRideReducer from './bookRideReducer';
import publishOffer from './publishOffer';
import loginReducer from './loginReducer';
import appReducer from './appReducer';
import messageReducer from './messageReducer';
import finalReviewReducer from './finalReviewReducer';
import offerCheckId from './offerCheckId';
import acceptOfferById from './acceptOfferById';
import confirmBookRequestReducer from './confirmBookRequestReducer';
import rejectOfferById from './rejectOfferById';
import deleteOfferReducer from './deleteOfferReducer';
import bookingIdReducer from './bookingIdReducer';
import cancelBookedRideReducer from './cancelBookedRideReducer';
import locationSearchReducer from './locationSearchReducer';    
import recentRidesReducer from './recentRidesReducer';
import feedbackReducer from './feedbackReducer';
import shuttleRideReducer from './shuttleRideReducer';
import maxCountReducer from './maxCountReducer';


export default combineReducers({
    submitUserData: submit,
    bookingIdReducer:bookingIdReducer,
    bookRideReducer: bookRideReducer,
    publishOffer: publishOffer,
    loginReducer: loginReducer,
    app: appReducer,
    message: messageReducer,
    finalPublish: finalReviewReducer,
    offerIdCheck: offerCheckId,
    acceptOfferById: acceptOfferById,
    rejectOfferById: rejectOfferById,
    deleteOfferedRide: deleteOfferReducer,
    confirmBookRequestReducer: confirmBookRequestReducer,
    cancelBookedRideReducer: cancelBookedRideReducer,
    locationSearchReducer: locationSearchReducer,
    recentRidesReducer: recentRidesReducer,
    feedbackReducer: feedbackReducer,
    shuttleRideReducer: shuttleRideReducer,
    maxCountReducer: maxCountReducer
});
