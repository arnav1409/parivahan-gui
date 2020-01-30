import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OfferARide.css';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './OfferARide.css';
import './spinners.css';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Hidden } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import { acceptOffer, rejectOffer, deleteOffer, offerId } from './../actions';
import { de } from 'date-fns/esm/locale';
import Feedback from './feedback'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  column: {
    flexBasis: '60%',
    padding: '1%',
  },
  panelSummary: {
    marginLeft: '19px',
    padding: '0px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  date: {
    marginTop: '15px',
  },
  grown: {
    flexGrow: 120,
    marginTop: '14px',
    color: 'white',
    fontSize: '24px',
    fontWeight: '400',

  },
  });
class OfferId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptSuccess: '',
      bookingId: '',
      rideRequestProcessingRow: 0
    }
  }
  accept_Offer(event, acceptOfferData, index) {
    if(this.props.offerIdData.availableSeats>0){
      this.setState({
        rideRequestProcessingRow: index,
      })
      this.props.sendOffer(acceptOfferData);
    }
  }
  logout = () => {
		// this.props.history.push('/')
		localStorage.clear(); 
		window.location.href = '/';
  }
  reject_Offer(event, rejectOfferData, index) {
    this.setState({
      rideRequestProcessingRow: index
    })
    this.props.rejectOffer(rejectOfferData);
  }
  deleteRide(event, deleteOfferData) {
    this.props.deleteRide(deleteOfferData);
  }
  goHomeScreen = (e) => {
    this.props.history.push('/home')
  }
  //   componentWillReceiveProps(nextProps) {
  //       console.log("details",this.props.acceptOffer)
  //     // if (this.props.acceptOffer.status !== nextProps.params.hikeId) {
  //     //     this.props.fetchHikeById(nextProps.params.hikeId)
  //     // }
  //  }
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
    //console.log('offerDetails',OfferDetails)
    let OfferDetails = this.props.offerIdData;
    console.log('date issues', OfferDetails)
    console.log('successDeleteMsg', this.props.successDeleteMsg);
    if(this.props.acceptOfferSuccess) {
      OfferDetails.availableSeats = OfferDetails.availableSeats - 1;
      this.props.clearNotification(); 
    }
    // if(this.props.rejectOfferSuccess){
    //   OfferDetails.availableSeats = OfferDetails.availableSeats;
    
    // }
    if (this.props.isDeletingSuccess) {
      return (
        <div>
          <MuiThemeProvider>
            <React.Fragment>
              <AppBar>
                <Typography variant="h6" color="white" className={classes.grown} > <span  className="cursor" onClick={(e) => this.goHomeScreen(e)}>PariVahan </span></Typography>
                <Typography variant="h6" color="white" className="App-bar-name">
                </Typography>

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
              <div class="loader"></div>
              </Grid>
            </React.Fragment></MuiThemeProvider>
        </div>
      )
    }
    if (this.props.successDeleteMsg) {
      this.props.clearDeleteSuccessNotifications();
      this.props.history.push('/home')
    }
    
    // if(this.props.acceptOfferSuccess){
    //   this.setState({
    //     showLoader : false
    //   })s
    // }

    return (<div>
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar >
            <Typography variant="h6" color="white" className={classes.grown} > <span onClick={(e) => this.goHomeScreen(e)}>PariVahan </span></Typography>
            <Typography variant="h6" color="white" className="App-bar-name">
              Welcome: {this.props.offerIdData.user.name}
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
						type="submit"
						variant="contained"
						color="secondary"
						className="log-out"
						onClick={this.logout}>
						Logout
						</Button>
          </AppBar>
          <form className={classes.container} >
            <legend> Your Details</legend>

            <Grid container spacing={12}>
              <Grid item xs={3}>
                <TextField
                  disabled
                  id="standard-textarea"
                  label="Starting Point"
                  value={OfferDetails.startLocation}
                  placeholder="starting  point"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled
                  id="standard-textarea"
                  label="Ending point"
                  value={OfferDetails.endLocation}
                  placeholder="Ending point"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                {/* {console.log(moment(OfferDetails.departureDate,'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMM DD YYYY HH:mm'))} */}
                <TextField
                  disabled
                  id="standard-textarea"
                  label="Date & Time"
                  value={moment(OfferDetails.departureDate, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}
                  placeholder="Date & Time"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled
                  id="standard-textarea"
                  label="Available Seats"
                  placeholder="Available Seats"
                  value={OfferDetails.availableSeats}
                  className={classes.textField}
                  margin="normal"
                /></Grid>
              {/* <Grid item xs={3}>
                <TextField
                  disabled
                  id="standard-textarea"
                  label="Vehicle"
                  placeholder="Vehicle"
                  value = {OfferDetails.ride.departureDateTime}
                  className={classes.textField}
                  margin="normal"
                /> */}
              {/* </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled
                  id="standard-textarea"
                  label="You'll Get"
                  placeholder="You'll Get"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid> */}
              <Button
                variant="contained" color="secondary" className={classes.button}
                onClick={(e) => this.deleteRide(e, this.props.offerCode)}>
                Delete Offer
               </Button>
              <span className='Button-spaces'>
                <Button
                  variant="contained" className={classes.button}
                  onClick={(e) => this.goHomeScreen(e)}>
                  Back
               </Button>
              </span>

            </Grid>
          </form>
        </React.Fragment></MuiThemeProvider>
      <hr />
      
      {console.log('OfferDetails', OfferDetails)}
      {OfferDetails.rideRequests.length === 0 ?  
        <legend>
          No Requests Yet!
          </legend>
      :    (OfferDetails.rideRequests && OfferDetails.rideRequests.map((details, index) => {
        return (
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary className={classes.panelSummary} expandIcon={<ExpandMoreIcon />}>
              <div className={classes.column}>
                <Typography className={classes.heading}><b>Start Point:</b> {details.startLocation}</Typography></div>
              <div className={classes.column}>
                <Typography className={classes.heading}><b>End Point:</b> {details.endLocation}</Typography></div>
              <div className={classes.column}>
                {(this.props.acceptshowLoader || this.props.rejectshowLoader) && this.state.rideRequestProcessingRow === index ?
                  <div>
                    <span>
                      <img src="/assets/loading.svg" alt="loading" className="login-loading" />
                    </span>
                  </div>
                  :
                  details.status == 'PENDING' ?
                    <div className={classes.column}>
                      <span className='btn-accept'>
                        <Button size="small" color="primary" variant="contained" disabled = {OfferDetails.availableSeats ?false:true}
                          onClick={(event) => this.accept_Offer(event, details, index)}>
                          Accept Offer
                </Button>
                      </span>
                      <span>
                        <Button size="small" color="primary" variant="contained"
                          onClick={(event) => this.reject_Offer(event, details, index)}>
                          Reject Offer
          </Button>
                      </span>
                    </div> : ('')

                }
              </div>


            </ExpansionPanelSummary>

            <ExpansionPanelActions>
              <div className={classes.column}>
                <Typography className={classes.heading}><b>Name:</b> {details.user.name}</Typography></div>
              <div className={classes.column}>
                <Typography className={classes.heading}><b>Email:</b> {details.user.email}</Typography></div>
              <div className={classes.column}>
                <Typography className={classes.heading}><b>Mobile:</b> {details.user.mobileNumber}</Typography></div>
            </ExpansionPanelActions>

            <ExpansionPanelActions>
              <div className={classes.column}>
                <Typography className={classes.heading}><b>You'll Get:</b> {'₹'} <span>{details.rideCharges}</span></Typography></div>
              <div className={classes.column}>
                <Typography className={classes.heading}><b>Gender:</b> {details.user.gender}</Typography></div>
              <div className={classes.column}>
                <Typography className={classes.heading}><b>Status:</b> {details.status}</Typography></div>
            </ExpansionPanelActions>
            {/* {details.status == 'PENDING' ?
          //   <ExpansionPanelActions>

          //     <Button size="small" color="primary" variant="contained"
          //       onClick={(event) => this.accept_Offer(event, details)}>
          //       Accept Offer
          // </Button>
          //     <Button size="small" color="primary" variant="contained"
          //       onClick={(event) => this.reject_Offer(event, details)}>
          //       Reject Offer
          // </Button>
          //   </ExpansionPanelActions> : 'No Requests Found'
          } */}
            <Divider />
          </ExpansionPanel>)
      }))
         
      
    }
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
    
        
    </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log('offerData', state)
  return {
    ...ownProps,
    offerCode: state.offerIdCheck,
    offerIdData: state.offerIdCheck.offerIdData,
    acceptshowLoader: state.acceptOfferById.showLoader,
    acceptOffer: state.acceptOfferById.loginData,
    acceptOfferSuccess: state.acceptOfferById.successMsg,
    rejectshowLoader: state.rejectOfferById.showLoader,
    rejectOffer: state.rejectOfferById.loginData,
    rejectOfferSuccess: state.rejectOfferById.successMsg,
    successDeleteMsg: state.deleteOfferedRide.successMsg,
    isDeletingSuccess: state.deleteOfferedRide.isDeleting,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendOffer: (accepting) => dispatch(acceptOffer.accpetingOfferRequest(accepting)),
    rejectOffer: (reject) => dispatch(rejectOffer.rejectingOfferRequest(reject)),
    deleteRide: (deleteOffers) => dispatch(deleteOffer.deletingOfferRequest(deleteOffers)),
    sendOfferIdRequest: (publishDetails) => dispatch(offerId.sendOfferIdRequest(publishDetails)),
    clearDeleteSuccessNotifications: () => dispatch(deleteOffer.clearDeleteSuccessNotifications()),
    clearNotification: () => dispatch({ type: 'CLEAR_NOTIFICATINS' })
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(OfferId)));  