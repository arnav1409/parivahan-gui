import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './OfferARide.css';
import { offerId } from './../actions';
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { bookingIdActions } from './../actions';
import Validator from './validator';
import Feedback from './feedback'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CenteredTabs from './Tab';
import './Tab.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  column: {
    flexBasis: '60%',
    padding: '1%',
  },
  grown: {
    flexGrow: 120,
    marginTop: '14px',
    color: 'white',
    fontSize: '24px',
    fontWeight: '400',

  },
  grow: {
    marginTop: '15px',
    color: 'white'
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: '50px',
    width: 200,
  },
  gridList: {
    width: '90%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  panelSummary: {
    marginLeft: '19px',
    padding: '0px',
  },
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      bookingId: '',
      booking_check_button: false,
      offer_check_button: false,
      showMessage: false,
      theme: '',
      message: '',
      showFeedback: false
    }
    this.validators = new Validator();

  }
  goHomePage = () => {

    this.props.history.push('/home')
  }
  closePopUp = () => {
    this.setState({ showFeedback: false })
  }
  logout = () => {
    // this.props.history.push('/')
    localStorage.clear();
    window.location.href = '/';
  }
  feeback = () => {

    this.setState({
      showFeedback: true
    })
  }
  backButton = () => {
    this.props.history.push('/home')
  }
  goToRide = () => {
    this.props.history.push('/offerride')
  }
  goToBookRide = () => {
    this.props.history.push('/bookride')
  }
  OnCheckIdChange = (e) => {
    this.setState({ id: e.target.value });
    if (e.target.value !== "")
      this.setState({ offer_check_button: true })
    else
      this.setState({ offer_check_button: false })
    console.log('id', this.state.id)
  }
  CheckoutOfferId = (e, auth) => {
    e.preventDefault();
    let offerID = {
      ...this.state,
      userEmail: auth
    };
    this.props.sendOfferIdRequest(offerID);
  }
  isOfferCodeValid() {
    let fieldNames;
    fieldNames = ['offerCode']
    this.isValid = true;
    console.log('Reachd')
    this.isValid = this.validators.isFormValid(fieldNames);
    return this.isValid;
  }


  checkOutBookingId = (e) => {
    e.preventDefault();
    let bookingId = {
      ...this.state
    }
    this.props.sendBookingIdRequest(bookingId);

  }
  isBookingCodeValid() {
    let fieldNames;
    fieldNames = ['bookingCode']
    this.isValid = true;
    console.log('Reachd')
    this.isValid = this.validators.isFormValid(fieldNames);
    return this.isValid;
  }
  onCheckBookingIdChange = (e) => {
    this.setState({ bookingId: e.target.value });
    if (e.target.value !== "")
      this.setState({ booking_check_button: true })
    else
      this.setState({ booking_check_button: false })
    console.log('bookingId', this.state.bookingId);
  }
  handleClose = (e) => {
    this.setState({
      showFeedback: false
    })
  }
  render() {
    const { fullScreen } = this.props;
    if (this.state.showMessage) {
      console.log('i was here')
      setTimeout(() => {
        this.setState({
          showMessage: false,
        })
      }, 5000);
    }
    console.log('i am this.props.bookingErrMsg', this.props.bookingErrMsg)
    const { classes } = this.props;
    console.log('this.props.bookingSuccessMsg', this.props.bookingSuccessMsg, this.props.bookingIdData);
    let user = localStorage.getItem('user');
    let userEmail = JSON.parse(user)
    console.log(userEmail.email)
    let userName = JSON.parse(user)
    console.log('userName.name', userName.name)
    let check_button = (
      <Button type='Submit'
        variant="contained"
        color="primary"
        className="side-button">
        Check
			</Button>
    );
    if (this.props.successMsg) {
      console.log('this.props.offerIdData', this.props.offerIdData);
      if (this.props.offerIdData && this.props.offerIdData.id) {
        localStorage.setItem('OfferId', JSON.stringify(this.props.offerIdData, this.state.id));
        this.props.clearOfferIdSuccessNotifications();
        this.props.history.push({
          pathname: '/offerCode',
          state: {
            data: this.state,
            userEmail: userEmail
          }
        });
      }
    }
    if (this.props.errMsg) {
      this.setState({
        showMessage: true,
        theme: 'error',
        message: this.props.errMsg
      })
      this.props.clearOfferIdSuccessNotifications();
    }
    if (this.props.bookingSuccessMsg) {
      if (this.props.bookingIdData) {
        localStorage.setItem('BookingId', JSON.stringify(this.props.bookingIdData));
        this.props.clearBookingIdSuccessNotifications();
        console.log('inside success')
        this.props.history.push({
          pathname: '/bookingstatus',
          state: {
            data: userName
          }
        });
      }
    }
    if (this.props.bookingErrMsg) {
      this.setState({
        showMessage: true,
        theme: 'error',
        message: this.props.bookingErrMsg
      })
      console.log("failed");
      this.props.clearBookingIdSuccessNotifications();
    }
    return (<div>
      <MuiThemeProvider>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.showMessage}
          variant={this.state.theme}
          message={this.state.message}
        >
        </Snackbar>
        <React.Fragment>
          {/* <PersistentDrawerLeft/> */}
          <AppBar className="App">
            <Typography variant="h6" color="white" className={classes.grown} onclick={(e) => this.goHomePage(e)}> PariVahan </Typography>
            <Typography variant="h6" color="white" className={classes.grow}>
              Welcome: {userName.name}
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
          <div >
            <Grid container className={classes.root} direction="row" spacing={10} justify="center"  >
              <Grid item xs={7} sm={6}   >
                <form className='FormStyle-home' onSubmit={(event) => this.CheckoutOfferId(event, userEmail.email)}>
                  <p>
                    <Button
                      variant="contained" color="primary"
                      onClick={this.goToRide}
                    >
                      Offer Ride
												</Button>
                  </p>
                  <br />
                  <fieldset >
                    <legend>
                      Check Offer Details:
											</legend>
                    <Grid xs={12} container spacing={10} direction="row" justify="space-between" alignItems="center">
                      <Grid item xm={9}  >
                        <TextField
                          required
                          id="standard-textarea"
                          label="Offer Code"
                          placeholder="Enter offer code to see details"
                          className={classes.textField}
                          margin="normal"
                          onChange={(event) => this.OnCheckIdChange(event, 'offerCode')}
                          inputProps={{
                            maxLength: 5,
                            minLength: 5
                          }}
                          error={this.validators.offerCode.errorMsg !== ''}
                        />
                        <span className='OfferCode_Error'>{this.validators.offerCode.errorMsg}</span>
                      </Grid>
                      <Grid item sm={3} >
                        {this.state.offer_check_button ? check_button : null}
                      </Grid>
                    </Grid>
                  </fieldset>
                </form>
              </Grid>

              <Grid item xs={7} sm={6}  >
                <form className='FormStyle-home' onSubmit={(e) => this.checkOutBookingId(e)}>
                  <p>
                    <Button type='Submit'
                      variant="contained"
                      color="primary"
                      onClick={this.goToBookRide} >
                      Book Ride
											</Button>
                  </p>
                  <br />
                  <fieldset >
                    <legend>
                      Check Booking Details:
											</legend>
                    <Grid xs={12} container spacing={10} direction="row" justify="space-between" alignItems="center">
                      <Grid item xm={9}  >
                        <TextField
                          required
                          id="standard-textarea"
                          label="Booking Code"
                          placeholder="Enter booking code to see details"
                          className={classes.textField}
                          margin="normal"
                          onChange={(e) => this.onCheckBookingIdChange(e, 'bookingCode')}
                          inputProps={{
                            maxLength: 5,
                            minLength: 5
                          }}
                          error={this.validators.bookingCode.errorMsg !== ''}
                        />
                        <span className='BookingCode_Error'>{this.validators.bookingCode.errorMsg}</span>
                      </Grid>
                      <Grid item xs={3} >
                        {this.state.booking_check_button ? check_button : null}
                      </Grid>
                    </Grid>
                  </fieldset>
                </form>
              </Grid>
            </Grid >
          </div>
          <div className='feedBack-popover'>
            {this.state.showFeedback ? <Dialog
              fullScreen={fullScreen}
              open={this.state.showFeedback}
              onClose={this.handleClose}
            >
              <DialogContent>
                <DialogContentText>
                  <Feedback
                    basePage={'appBar'}
                    closePopUp={this.closePopUp}
                  />
                </DialogContentText>
              </DialogContent>
            </Dialog> : ''}
          </div>
          <div className="tab-container" >
            <CenteredTabs />
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    ...ownProps,
    offerIdData: state.offerIdCheck.offerIdData,
    isOfferIdFetching: state.offerIdCheck.isOfferIdFetching,
    idDoesNotExist: state.offerIdCheck.idDoesNotExist,
    successMsg: state.offerIdCheck.successMsg,
    errMsg: state.offerIdCheck.errMsg,
    userEmail: state.loginReducer.email,
    bookingIdData: state.bookingIdReducer.bookingIdData,
    isBookingIdFetching: state.bookingIdReducer.isBookingIdFetching,
    bookingIdDoesNotExist: state.bookingIdReducer.bookingIdDoesNotExist,
    bookingSuccessMsg: state.bookingIdReducer.bookingSuccessMsg,
    bookingErrMsg: state.bookingIdReducer.bookingErrMsg,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    sendOfferIdRequest: (publishDetails) => dispatch(offerId.sendOfferIdRequest(publishDetails)),
    clearOfferIdNotifications: (signup) => dispatch(offerId.clearOfferIdNotifications()),
    clearOfferIdSuccessNotifications: () => dispatch({ type: 'CLEAR_OFFERID_NOTIFICATIONS' }),
    sendBookingIdRequest: (bookingLoginDetails) => dispatch(bookingIdActions.sendBookingIdRequest(bookingLoginDetails)),
    clearBookingIdSuccessNotifications: () => dispatch({ type: 'CLEAR_BOOKINGID_NOTIFICATIONS' }),
    fetchBookingIdError: (bookingErrMsg) => dispatch(bookingIdActions.fetchBookingIdError(bookingErrMsg))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Main)));