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
import Snackbar from '@material-ui/core/Snackbar';
import './OfferARide.css';
import './spinners.css';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { publishActions, finalPublish } from './../actions';
import moment from "moment";
import Feedback from './feedback'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = theme => ({
  root: {
    maxWidth: 250,

  },
  slider: {
    padding: '10px 0px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  grown: {
    flexGrow: 120,
    marginTop: '14px',
    color: 'white',
    fontSize: '24px',
    fontWeight: '400',

  },
});
class PreviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapIsReady: false,
      startingPoint: { label: '', value: ' ' },
      endingPoint: { label: '', value: ' ' },
      showMessage: false,
			theme: '',
			message: ''
    }

  }
  submitRide = (e, Review) => {
    e.preventDefault()
    console.log('review', Review)
    this.props.sendReviewedRequest(Review)
  }
  goHomeScreen = (e) => {
    this.props.history.push('/home')
  }
  goToBackScreen = (e, Review) => {
    this.props.history.goBack();
  }
  logout = () => {
    // this.props.history.push('/')
    localStorage.clear();
    window.location.href = '/';
  }
  backButton = (e) => {
    this.props.history.push('/home')
  }

  /*Map Integration*/

  mapIniialize() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places,geometry&key=AIzaSyDMw93vd70BgI6Gp9RZV0HvLHxto4xbaHg`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      this.setState({ mapIsReady: true });
    });
  }
  initMap = (startLocation, endLocation, encodingPath) => {

    let vm = this;
    console.log('firstChild')
    let encodedPath = encodingPath;
    startLocation = startLocation;
    endLocation = endLocation;
    let flightPlanCoordinates = [];
    let polylinePaths = [];
    console.log('initMap', startLocation, endLocation, encodedPath);
    console.log('before map')
    var map = new window.google.maps.Map(document.getElementById('map2'), {
      zoom: 3,
      center: { lat: 18.56, lng: 73.77 },
    });
    console.log('after map');
    function zoomToObject(obj) {
      var bounds = new window.google.maps.LatLngBounds();
      var points = obj.getPath().getArray();
      for (var n = 0; n < points.length; n++) {
        bounds.extend(points[n]);
      }
      map.fitBounds(bounds);
    }
    console.log("before encoding");

    var rideLatLng = window.google.maps.geometry.encoding.decodePath(encodedPath);
    console.log('rideLatLng====>', rideLatLng, rideLatLng[0].lat(), rideLatLng[0].lng())
    var lat = rideLatLng[0].lat();
    var lng = rideLatLng[0].lng();

    let directionPath = this.props.ReviewData.selectedRidePath;
    console.log('selected path====>', directionPath)



    let flightPath = rideLatLng;
    console.log('rideLatLang', flightPath)
    var ridePolyline = new window.google.maps.Polyline({
      path: rideLatLng,
      geodesic: false,
      strokeColor: '#4B77BE',
      strokeWeight: 7,
      icons: [
        {
          icon: symbolOne,
          offset: '0%'
        }, {
          icon: symbolOne,
          offset: '100%'
        }
      ]
    });
    var ridePolylineInner = new window.google.maps.Polyline({
      path: rideLatLng,
      geodesic: false,
      strokeColor: '#00B5FF',
      strokeWeight: 4,
      icons: [
        {
          icon: symbolOne,
          offset: '0%'
        }, {
          icon: symbolOne,
          offset: '100%'
        }
      ]
    });
    var originInfo = new window.google.maps.InfoWindow({
      content: 'Origin'
    });

    var destinationInfo = new window.google.maps.InfoWindow({
      content: 'Destination'
    });
    ridePolyline.setMap(map);
    ridePolylineInner.setMap(map);


    zoomToObject(ridePolyline);
    console.log("After encoding");
    var originMarker = new window.google.maps.Marker({
      position: rideLatLng[0],
      map: map,
      opacity: 1,
      animation: window.google.maps.Animation.DROP
    });
    originInfo.open(map, originMarker);
    var destMarker = new window.google.maps.Marker({
      position: rideLatLng[(rideLatLng.length - 1)],
      map: map,
      opacity: 1,
      animation: window.google.maps.Animation.DROP
    });
    destinationInfo.open(map, destMarker);

    var symbolOne = {
      path: window.google.maps.SymbolPath.CIRCLE,
      strokeColor: '#000',
      strokeWeight: 2,
      fillColor: '#fff',
      fillOpacity: 1,
      scale: 4
    };
    function setDistancePopup(ridePolyline, rideLatLng) {
      // to get disatnce
      let flightPath = rideLatLng.map((position) => {
        return {
          lat: position.lat(),
          lng: position.lng()
        }
      })
      console.log('flightPath =====>>>>>>.', flightPath)

      let distanceInfoPosition = flightPath[Math.round(flightPath.length / 2)];
      console.log('latlng', distanceInfoPosition)

      let distanceInMeters = window.google.maps.geometry.spherical.computeLength(ridePolyline.getPath().getArray());
      let distanceInKm = Math.round(distanceInMeters / 10) / 100 + ' km';
      console.log('distanceInKm', distanceInKm)


      // to get duration
      var directionsService = new window.google.maps.DirectionsService();
      var breakPoint = Math.round(flightPath.length / 20);
      console.log("breakPoint", breakPoint)
      var request = {
        origin: flightPath[0], // LatLng|string
        destination: flightPath[(flightPath.length - 1)], // LatLng|string
        travelMode: window.google.maps.DirectionsTravelMode.DRIVING,
        waypoints: flightPath.filter((latLng, index) => {
          return index % breakPoint === 0;
        }).map((latLng) => {
          return {
            location: latLng,
            stopover: false
          }
        })
      };

      directionsService.route(request, function (response, status) {
        console.log('response', response);
        var point = '';
        if (status === 'OK') {
          var point = response.routes[0].legs[0];
          // console.log('point.distance.text', point.distance.text);
        }
        var duration = point && point.duration ? point.duration.text : '';
        var durationBlock = duration ?
          `<div class='duration-block'>
                                <img src="/assets/clock.svg" alt="loading" className="login-loading" />
                                <div class='duration-info'>`+ duration + `</div>
                              </div>` : '';
        var infoHtml = `<section class='info-section'>
                            `+ durationBlock + `
                            <div class='distance-info'>`+ distanceInKm + `</div>
                          <section>`;

        var distanceInfo = new window.google.maps.InfoWindow({
          content: infoHtml,
          position: distanceInfoPosition
        });
        distanceInfo.open(map);
      });
    }
    setDistancePopup(ridePolyline, rideLatLng);

    function handelPolyClick(eventArgs, polyLine) {
      // now you can access the polyLine
      vm.setState({
        selectedPath: polyLine.get("id"),
        showButton: true
      })
      polyLine.setOptions({ strokeColor: '#003399' });
      polyLine.setOptions({ strokeWeight: 6 });
      resetNonSelectedPolylines(polyLine, polyLine.get("id"));
    };

    function resetNonSelectedPolylines(polyLine, pathSummary) {
      if (flightPlanCoordinates != undefined) {
        for (var i = 0; i < polylinePaths.length; i++) {
          if (polylinePaths[i].get("id") == pathSummary) {
            continue;
          } else {
            polylinePaths[i].setOptions({ strokeColor: '#009999' });
            polylinePaths[i].setOptions({ strokeWeight: 4 });
          }
        }
      }
    };
  }


  componentDidUpdate(prevProps, prevState) {
    let Sp = this.props.ReviewData.startLocation;
    let Ep = this.props.ReviewData.endLocation;
    let encodingPath = this.props.ReviewData.encodedPath
    if (this.state.mapIsReady !== prevState.mapIsReady || encodingPath != undefined) {
      try {
        this.initMap(Sp, Ep, encodingPath);
      } catch (e) {

      }
    }
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
    const { fullScreen } = this.props;
    if (this.state.showMessage) {
			setTimeout(() => {
				this.setState({
          showMessage: false,
        })
      }, 5000);
      setTimeout(() => {
        this.props.history.push('/offerride');
      },5000)
		}

    const { classes } = this.props;
    let PublishArray = localStorage.getItem('Review') ? JSON.parse(localStorage.getItem('Review')) : [];
    localStorage.setItem('Publish', JSON.stringify(PublishArray));
    let OfferReview = JSON.parse(localStorage.getItem('Publish'));
    if (this.props.successMsg) {
      if (!this.props.submitting) {
        this.props.clearOfferRideNotification();
        this.props.history.push('/success');
      }
    }
    if (this.props.errorMsgPublishing) {
      this.setState({
        showMessage: true,
        theme: 'error',
        message: this.props.errorMsgPublishing
      })
      this.props.clearOfferRideNotification();
    }
    
    if (this.props.submitting) {
      return (
        <div class="loader"></div>
      )
    }
    console.log("offerError", this.props.errorMsgPublishing)
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
          <AppBar>
            <Typography variant="h6" color="white" className={classes.grown} > <span className="cursor" onClick={(e) => this.goHomeScreen(e)}>PariVahan </span></Typography>

            <Typography variant="h6" color="white" className="App-bar-name">
              Welcome: {this.props.location.state.data.user.name}
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
            <form className='FormStyle' onSubmit={(e) => this.submitRide(e, this.props.ReviewData)}>
              <fieldset>
                <legend>Review Details</legend>
                <div >
              
                  <b>Starting Point</b> : {this.props.ReviewData.startLocation}
                  {/* </Typography> */}
                </div>

                <br />
                <div >
              
                  <b>Ending Point</b> : {this.props.ReviewData.endLocation}
                  {/* </Typography> */}
                </div>
                <br />
                <div >
              

                  <b>Date</b>: {moment(this.props.date, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}
                  {/* </Typography> */}
                </div>
                <br />
                <div >
              
                  <b>Selected Path</b> : {this.props.ReviewData.selectedRidePath}
                  {/* </Typography> */}
                </div>
                <br />
                <div >
              
                  <b>Available Seats</b> : {this.props.ReviewData.availableSeats}
                  {/* </Typography> */}
                </div>
                <br />
                <div >
              
                  <b>Vehicle</b> : {this.props.ReviewData.vehicle}
                  {/* </Typography> */}
                </div>
                <br />
                <div>
              
                  <b>You'll Get</b> :{'₹'} {this.props.isOfferFetching ?
                    <span>
                      <img src="/assets/loading.svg" alt="loading" className="login-loading" />
                    </span>
                    : <span>{this.props.ReviewData.charges}</span>
                  }
                 
                </div>
                <br />
                <Button type='Submit'
                  variant="contained" color="primary">
                  Submit
                </Button>
                <Button
                  variant="contained" className={classes.button}
                  onClick={(e) => this.goToBackScreen(e, this.props.ReviewData)}>
                  Back
               </Button>
              </fieldset>
            </form>
            <Grid item xs={6}>
              <div className="full-height-map">
                <div id='map2' ></div>
              </div>
            </Grid>
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
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.data) {
      console.log('this.props.location.state.data', this.props.location.state.data);
      let formData = this.props.location.state.data;
      this.setState({
        finalData: formData
      }, () => this.mapIniialize.bind(this));

      this.props.sendPublishRequest(this.props.location.state.data);
    }
  }
  componentWillUnmount() {
    this.props.ClearPublishData();
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    ...ownProps,
    // name: state.finalPublish.user.name,
    errorMsgPublishing: state.publishOffer.errorMsg,
    offerData: state.finalPublish.offerData,
    isOfferFetching: state.publishOffer.isOfferFetching,
    successMsg: state.finalPublish.successMsg,
    errMsg: state.finalPublish.errMsg,
    PreviewData: state.finalPublish.PreviewData,
    ReviewData: state.publishOffer,
    date: state.publishOffer.departureDate,
    submitting: state.finalPublish.isOfferFetching,
    encodedPath: state.publishOffer.encodedPath,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendPublishRequest: (publishDetails) => dispatch(publishActions.sendPublishRequest(publishDetails)),
    sendReviewedRequest: (publishDetails) => dispatch(finalPublish.sendReviewedRequest(publishDetails)),
    ClearPublishData: () => dispatch({ type: 'CLEAR_BACK_LOG' }),
    clearOfferRideNotification: () => dispatch({ type: 'CLEAR_PUBLISH_NOTIFICATION' })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(PreviewScreen)));  