import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OfferARide.css';
import './bookingId.css';
import './spinners.css';
import 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {bookingIdActions} from './../actions';
import moment from 'moment';
import {cancelBookedRideActions} from './../actions';
import Feedback from './feedback'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
const styles = theme => ({
  root: {
    maxWidth: 250,

  },
  slider: {
    padding: '10px 0px',
  },
  grown: {
		flexGrow: 120,
		marginTop: '14px',
		color: 'white',
		fontSize: '24px',
		fontWeight: '400',
	},

});

class BookingId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status:'',
      bookingId:'',
      showMessage: false,
			theme: '',
      message: '',
      cancel_button: false
    }
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  cancelButton = (e,bookingIdData) => {
    e.preventDefault();
    
    this.props.sendCancelBookedRideRequest(bookingIdData);
    console.log('this.props.cancelRide',this.props.cancelRide);
    console.log('cancel button',this.props.sendCancelBookedRideRequest);
    console.log('this.props.bookingIdData.bookingId',this.props.bookingIdData.bookingId)
  }
  logout = () => {
		// this.props.history.push('/')
		localStorage.clear(); 
		window.location.href = '/';
  }

  goToBackScreen = (e) => {
		this.props.history.push('/home')
	}

  backButton = () => {
    this.props.history.push('/home');
    console.log("back button pressed")
  }
  feeback = () => {
		
		this.setState({
			showFeedback: true
		})
	}
	closePopUp = () =>{
		this.setState({showFeedback:false})
	}

  render() {
    const { classes } = this.props;
    const { fullScreen } = this.props;
    let bookingDetails = this.props.bookingIdData ;
    return (<div>
      <MuiThemeProvider>
        <React.Fragment>
        <AppBar>
							<Typography variant="h6" color="white" className={classes.grown} > <span className="cursor" onClick={(e) => this.goToBackScreen(e)}>PariVahan </span></Typography>
           <Typography variant="h6" color="white" className="App-bar-name">
                Welcome: {this.user.name}
         			 </Typography>
                <Button
							type="button"
							variant="contained"
							color="primary"
							className="log-out"
							onClick={this.feeback}
						><span>
								Feedback
						</span>
						</Button>
                <Button 
						type="button"
						variant="contained"
						color="secondary"
						className="log-out"
						onClick={this.logout}
						><span>
						Logout
						</span>
						</Button>
     				 </AppBar>
          <Grid container spacing={12}>
          {bookingDetails?
            <form className='FormStyle' >
              <fieldset>
                <legend>Booked Details</legend>
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Your Starting Point</b> : {bookingDetails.startLocation}</Typography>
                </div>
                <br />
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Your Ending Point</b> : {bookingDetails.endLocation}</Typography>
                </div>
                <br />  
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Host Starting Point</b> : {bookingDetails.ride.startLocation}</Typography>
                </div>
                <br />
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Host Ending Point</b> : {bookingDetails.ride.endLocation}</Typography>
                </div>
                <br /> 
                <div className={classes.column}>
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Name</b> : {bookingDetails.ride.user.name}</Typography>
                </div>
                <br />
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Email</b> : {bookingDetails.ride.user.email}</Typography>
                </div>
                <br /> 
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Mobile</b> : {bookingDetails.ride.user.mobileNumber}</Typography>
                </div>
                <br />
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Gender</b> : {bookingDetails.ride.user.gender}</Typography>
                </div>
                <br /> 
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Available Seats</b> : {bookingDetails.ride.availableSeats}</Typography>
                </div>
                <br />
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Date</b> : {moment(bookingDetails.ride.departureDate, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}</Typography>
                </div>
                <br /> 
                  <Typography className={classes.heading}><b>You'll Pay</b> :₹ {bookingDetails.rideCharges}</Typography>
                </div>
                <br />
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Status</b> : {bookingDetails.status}</Typography>
                </div>
                <br />
                {this.props.showLoader ?
                <div>
                <span>
                  <img src="/assets/loading.svg" alt="loading" className="login-loading" />
                </span>
              </div> :
              this.props.bookingIdData.status === 'PENDING' ? 
              <span>
                <Button
                type="button"
                variant="contained"
                color="secondary" 
                className="cancel-button"
                onClick={(e)=>this.cancelButton(e,this.props.bookingIdData)}>CANCEL
                </Button>
                </span>
                : ('')
              }
              <span>
                <Button
                  variant="contained" 
                  className="back-button-1"
                  onClick={this.backButton}>
                  BACK
                </Button>
                </span>
                
              </fieldset>
            </form>
            :
            <div className="loader">
            </div>}
          </Grid>
          <div className='feedBack-popover'>
						{this.state.showFeedback ? <Dialog
						fullScreen={fullScreen}
						open={this.state.showFeedback}
						onClose={this.handleClose}
						>
							<DialogContent>
								<DialogContentText>
									<Feedback 
									basePage = {'appBar'}
									closePopUp = {this.closePopUp}
									/>
								</DialogContentText>
							</DialogContent>
						</Dialog> : ''}
					</div>
        </React.Fragment>
      </MuiThemeProvider>
    </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
    bookingIdData: state.bookingIdReducer.bookingIdData,
    showLoader: state.cancelBookedRideReducer.showLoader,
    errMsg: state.cancelBookedRideReducer.errMsg,
    successMsg: state.cancelBookedRideReducer.successMsg,
    isFetching: state.cancelBookedRideReducer.isFetching,
    cancelRide: state.cancelBookedRideReducer.cancelRide

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		sendBookingIdRequest: (bookinLoginDetails) => dispatch(bookingIdActions.sendBookingIdRequest(bookinLoginDetails)),
    fetchBookingIdSuccess: (bookingLoginData) => dispatch(bookingIdActions.fetchBookingIdSuccess(bookingLoginData)),
    sendCancelBookedRideRequest: (cancelling) => dispatch(cancelBookedRideActions.sendCancelBookedRideRequest(cancelling)),
    fetchCancelBookedRideSuccess: (cancelBookedRideDetails) => dispatch(cancelBookedRideActions.fetchCancelBookedRideSuccess(cancelBookedRideDetails)),
    fetchCancelBookedRideError: (cancelBookedRideErrMsg) => dispatch(cancelBookedRideActions.fetchCancelBookedRideError(cancelBookedRideErrMsg)),
    clearNotification: () => dispatch({ type: 'CLEAR_NOTIFICATIONS' })

	}
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withRouter(BookingId)));  