import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Typography, Divider } from '@material-ui/core';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './recentRides.css';
import { recentRidesActions, maxCountActions } from './../actions';
import Button from '@material-ui/core/Button';
import IconAvatars from './topArrow';

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


class RecentRides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMorePage: false,
      pagination: 5,
      index: 0,
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  bookRequest = (e, recentRidesList) => {
    e.preventDefault();
    this.props.history.push({

      pathname: '/bookingpreviewscreen',
      state: {
        data: recentRidesList
      }
    });
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
        this.props.fetchRecentRides(this.state.pagination, this.state.index, userEmail.email)
      }, console.log('index', this.state.index))
    }
  }

  scrollToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  render() {
    let { classes, recentRides } = this.props;
    let count = this.props.maxCount;
    console.log('in render =====>',count )
    recentRides = recentRides ? recentRides : [];
    let user = localStorage.getItem('user');
    let userEmail = JSON.parse(user)
    console.log(userEmail.email)
    return (
      <section>
        <div className="grand-container" >
          <span onClick={this.scrollToTop}><IconAvatars /></span>
        </div>
        <div >
          <h3 >Available Rides  </h3>
          <hr />
        </div>
        {
          (recentRides && recentRides.length)
            ?
            recentRides.map((recentRidesList, index) => {
              return (
                <div>
                  <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary
                      className={classes.panelSummary} expandIcon={<ExpandMoreIcon />}>
                      <div className={classes.column}>
                        <Typography className={classes.heading}><b>Start Point:</b> {recentRidesList.startLocation}
                        </Typography>
                      </div>
                      <div className={classes.column}>
                        <Typography className={classes.heading}><b>End Point:</b> {recentRidesList.endLocation}
                        </Typography>
                      </div>
                      <div className={classes.column}>
                        <Typography className={classes.heading}><b>Leaving On:</b> {moment(recentRidesList.departureDate, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}
                        </Typography>
                      </div>
                      <div className={classes.column}>
                        <Typography className={classes.heading}><b>Available Seats:</b> {recentRidesList.availableSeats}
                        </Typography>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelActions>
                      <div className={classes.column}>
                        <Typography className={classes.heading}><b>Name:</b> {recentRidesList.user.name}
                        </Typography>
                      </div>
                      <div className={classes.column}>
                        <Typography className={classes.heading}><b>Email:</b> {recentRidesList.user.email}
                        </Typography>
                      </div>
                      <div className={classes.column}>
                        <Typography className={classes.heading}><b>Mobile:</b> {recentRidesList.user.mobileNumber}
                        </Typography>
                      </div>
                      <div className={classes.column}>
                        <Typography className={classes.heading}><b>Gender:</b> {recentRidesList.user.gender}
                        </Typography>
                      </div>
                      <div className={classes.column}>
                        <Typography className={classes.heading}><b>You'll Pay:</b> ₹ {recentRidesList.charges}</Typography>
                      </div>
                    </ExpansionPanelActions>
                    {recentRidesList.availableSeats !== 0 ?
                      <ExpansionPanelActions>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(event) => this.bookRequest(event, recentRidesList)}
                        >
                          REQUEST RIDE
													</Button>
                      </ExpansionPanelActions> : 'Ride is Full'}

                  </ExpansionPanel>
                  <Divider />
                </div>
              )
            }) :
            this.props.isRecentBookingFetching
              ?
              <div id="loader"></div> :
              <div>
                <h3>No Available Rides</h3>
              </div>
        }
      </section>
    )
  }
  componentDidMount() {
    let user = localStorage.getItem('user');
    let userEmail = JSON.parse(user)
    window.addEventListener("scroll", this.handleScroll);
    console.log('this.handleScroll', this.handleScroll);
    this.props.fetchRecentRides(this.state.pagination, this.state.index, userEmail.email);
    this.props.fetchCount();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    recentBookingErrMsg: state.recentRidesReducer.recentBookingErrMsg,
    isRecentBookingFetching: state.recentRidesReducer.isRecentBookingFetching,
    recentBookingSuccessMsg: state.recentRidesReducer.recentBookingSuccessMsg,
    recentRides: state.recentRidesReducer.recentRides,
    isCountFetching: state.maxCountReducer.isCountFetching,
    countErrMsg: state.maxCountReducer.countErrMsg,
    countSuccessMsg: state.maxCountReducer.countSuccessMsg,
    maxCount: state.maxCountReducer.maxCount,

  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecentRides: (data, startIndex, emailId) => dispatch(recentRidesActions.fetchRecentRides(data, startIndex, emailId)),
    fetchCount: () => dispatch(maxCountActions.fetchCount()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(RecentRides)));