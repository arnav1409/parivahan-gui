import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Typography, Divider } from '@material-ui/core';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { withStyles } from '@material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { makeStyles, useTheme } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './recentRides.css';
import { shuttleRideActions, recentRidesActions } from './../actions';
import Button from '@material-ui/core/Button';
import IconAvatars from './topArrow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DaysTab from './daysTab';



const styles = theme => ({
  heading: {
    fontSize: '15px',
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'stretch',
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


class Shuttle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMorePage: false,
      pagination: 5,
      index: 1,
      showTerms: false,
      showCancelTerms: false,
      isCanceled: false,
      isLoading: false,
      isBooked: false,
      hasError: false,
      isLoading: false,
      date: new Date(),
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  bookRequest = (e, id) => {
    e.preventDefault();
    this.setState(prevState => ({
      showTerms: true,
      id: id,
    }), console.log('bookrequest', this.state.showTerms))
  };

  cancelRequest = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      showCancelTerms: true
    }), console.log('cancelrequest', this.state.showTerms))
  };

  handleClose = (e) => {
    this.setState({
      showTerms: false,
      showCancelTerms: false,
    }, console.log('not booking a seat'))
  }
  handleCheck = (e) => {
    this.setState({
      showTerms: false,
      showCancelTerms: false,
      isBooked: true,
    }, console.log('ride booked'))
  }
  handleCancelcheck = (e) => {
    this.setState({
      showCancelTerms: false,
      isBooked: false
    }, console.log('ride canceled'))
  }

  handleScroll() {
    let user = localStorage.getItem('user');
    let userEmail = JSON.parse(user)
    console.log('handlescroll', userEmail.email)
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({
        index: this.state.index + 5
      }, () => {
        // this.props.fetchShuttleRides()
      }, console.log('index', this.state.index))
    }
  }

  scrollToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  render() {
    let { classes, shuttleRides, fullScreen } = this.props;
    shuttleRides = shuttleRides ? shuttleRides : [];
    let user = localStorage.getItem('user');
    let userEmail = JSON.parse(user)
    console.log(userEmail.email)
    return (
      <section>
        <div className="grand-container" >
          <span onClick={this.scrollToTop}><IconAvatars /></span>
        </div>
        <div >
          <h3 >Shuttle Rides Weekely Schedule Mon (April 15th, 2019) - Fri (April 19th, 2019)</h3>
          <hr />
          <div>
            <DaysTab />
          </div>
        </div>
        {
          (shuttleRides && shuttleRides.length)
          ?
          shuttleRides.map((item, index) => {
            console.log(shuttleRides, 'items')
            console.log('jnjnjnjjjjj')
            return (
              <div >
                <ExpansionPanel defaultExpanded>
                  <ExpansionPanelSummary
                    className={classes.panelSummary} expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.column}>
                      <Typography className={classes.heading}><b>Start Point:</b> {item.startLocation}
                      </Typography>
                    </div>
                    <div className={classes.column}>
                      <Typography className={classes.heading}><b>End Point:</b> {item.endLocation}
                      </Typography>
                    </div>
                    <div className={classes.column}>
                      <Typography className={classes.heading}><b>Leaving On:</b> {moment(item.departureDate, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}
                      </Typography>
                    </div>
                    <div className={classes.column}>
                      <Typography className={classes.heading}><b>Available Seats:</b> {item.availableSeats}
                      </Typography>
                    </div>
                  </ExpansionPanelSummary>
                  {
                    <ExpansionPanelActions>
                      {this.state.isBooked ?
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={(e) => this.cancelRequest(e, item)}
                        >
                          CANCEL RIDE
                      </Button> :
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => this.bookRequest(e, item.id)}
                        >
                          REQUEST RIDE
											</Button>
                      }
                    </ExpansionPanelActions>
                  }
                </ExpansionPanel>
                <Divider />
              </div>
            )
          }) :
          this.props.isShuttleBookingFetching
          ?
           <div id="loader"></div> :
            <div>
              <h3>No Shuttle Rides Available</h3>
            </div>
        }
        
        <Dialog
          fullScreen={fullScreen}
          open={this.state.showTerms}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">
            {<h2>Confirmation!</h2>}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to book a seat for this shuttle?
					</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => this.handleClose(e)}
              color="primary">
              NO
					</Button>
            <Button onClick={(e) => this.handleCheck(e)}
              color="primary">
              YES
					</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.showCancelTerms}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">
            {<h2>Confirmation!</h2>}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to cancel your booking for this shuttle?
					</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => this.handleClose(e)}
              color="primary">
              NO
					</Button>
            <Button onClick={(e) => this.handleCancelcheck(e)}
              color="primary">
              YES
					</Button>
          </DialogActions>
        </Dialog>
      </section>
    )
  }
  componentDidMount() {
    let user = localStorage.getItem('user');
    let userEmail = JSON.parse(user)
    let date = new Date
    let newDate = (moment(date).format('YYYY-MM-DDTHH:mm:ss:SSS')) + 'Z';
    console.log('newDate',newDate)
    console.log('date',date)
    console.log('in componentdidmount', userEmail.email)
    this.props.fetchShuttleRides(newDate)
    this.props.clearRecentRidesReducer();
    console.log('this.props.fetchShuttleRides',newDate)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    ...ownProps,
    shuttleBookingErrMsg: state.shuttleRideReducer.shuttleBookingErrMsg,
    isShuttleBookingFetching: state.shuttleRideReducer.isShuttleBookingFetching,
    shuttleBookingSuccessMsg: state.shuttleRideReducer.shuttleBookingSuccessMsg,
    shuttleRides: state.shuttleRideReducer.shuttleRides,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchShuttleRides: (data) => dispatch(shuttleRideActions.fetchShuttleRides(data)),
    fetchShuttleRidesSuccess: (data) => dispatch(shuttleRideActions.fetchShuttleRidesSuccess(data)),
    fetchShuttleRidesListError: (data) => dispatch(shuttleRideActions.fetchShuttleRidesListError(data)),
    clearRecentRidesReducer: () => dispatch(recentRidesActions.clearRecentRidesReducer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Shuttle)));