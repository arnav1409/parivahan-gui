import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'date-fns';
import './OfferARide.css'
import './spinners.css'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import { confirmBookRequestActions } from './../actions';
import Snackbar from '@material-ui/core/Snackbar';
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

class BookRidePreviewScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapIsReady: false,
			startingPoint: { label: '', value: ' ' },
			endingPoint: { label: '', value: ' ' },
			searchLocation: '',
			showMessage: false,
			theme: '',
			message: ''
		}
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	componentDidMount() {
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?libraries=places,geometry&key=AIzaSyDMw93vd70BgI6Gp9RZV0HvLHxto4xbaHg`;
		script.async = true;
		script.defer = true;
		script.addEventListener('load', () => {
			this.setState({ mapIsReady: true });
		});

		document.body.appendChild(script);
	}
	logout = () => {
		localStorage.clear();
		window.location.href = '/';
	}
	goToBackScreen = (e) => {
		this.props.history.push('/home')
	}

	initMap = (startLocation, endLocation) => {
		console.log('initMap', startLocation, endLocation);
		let vm = this;
		console.log('firstChild')
		startLocation = startLocation;
		endLocation = endLocation;
		let flightPlanCoordinates = [];
		let polylinePaths = [];
		console.log('before map')
		let id = 'map';

		var map = new window.google.maps.Map(document.getElementById(id), {
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
		// console.log("this.props.location.state.data.ride.encodedPath", (this.state.encodingPath))

		var encodedPath = this.props.location.state.data.ride == undefined ? this.props.location.state.data.encodedPath : this.props.location.state.data.ride.encodedPath;
		console.log("this.props.location.state.data.ride.encodedPath", encodedPath)
		var rideLatLng = window.google.maps.geometry.encoding.decodePath(encodedPath);
		console.log('rideLatLng====>', rideLatLng, rideLatLng[0].lat(), rideLatLng[0].lng())
		var lat = rideLatLng[0].lat();
		var lng = rideLatLng[0].lng();

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
		var joinPoints = this.state.joiningPoints == undefined ? this.props.location.state.data.startLatLng : this.state.joiningPoints;
		console.log('joinPoints', joinPoints)

		if (this.state.joiningPoints != undefined) {
			lat = joinPoints.lat;
			lng = joinPoints.lng;
		}
		else {
			lat = joinPoints.lat;
			lng = joinPoints.lng;
		}

		// else{
		// lat = lat;
		// lng = lng;
		// }
		var startP = this.state.userFinalData == undefined ? this.props.location.state.data.startLocation : this.state.userFinalData.startingPoint;
		var startL = this.state.finalData == undefined ? this.props.location.state.data.startLocation : this.state.finalData.ride.startLocation;
		console.log('before inside if ======>>>', startP, startL)
		var originInfo = new window.google.maps.InfoWindow({
			content: 'Origin'
		});
		var destinationInfo = new window.google.maps.InfoWindow({
			content: 'Destination'
		});
		ridePolyline.setMap(map);
		ridePolylineInner.setMap(map);

		zoomToObject(ridePolyline);

		var jointPointInfo = new window.google.maps.InfoWindow({
			content: 'Joining Point'
		})
		if (startP === startL) {
			var originMarker = new window.google.maps.Marker({
				position: rideLatLng[0],
				map: map,
				opacity: 1,
				animation: window.google.maps.Animation.DROP
			});
			originInfo.open(map, originMarker);
			console.log('inside if')
		}
		else {
			var originMarker = new window.google.maps.Marker({
				position: rideLatLng[0],
				map: map,
				opacity: 1,
				animation: window.google.maps.Animation.DROP
			});
			originInfo.open(map, originMarker);
			var joinPoints = new window.google.maps.Marker({
				position: { lat, lng },
				map: map,
				opacity: 1,
				animation: window.google.maps.Animation.DROP
			});
			jointPointInfo.open(map, joinPoints);
			console.log('inside else')
		}
		console.log('rideLatLng[0]', rideLatLng[0])


		console.log('joinPoints1', joinPoints)
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
		console.log("After encoding");
		console.log('rideLatLng[0]', rideLatLng[0])
		console.log('this.props.location.state.data.riderJoiningPointCoordinate,', this.state.joiningPoints)

		console.log('before set distance popup');
		console.log('Before set Distance ', ridePolyline, rideLatLng)
		function setDistancePopup(ridePolyline, rideLatLng) {
			console.log("hi")
			// to get disatnce
			let flightPath = rideLatLng.map((position) => {
				return {
					lat: position.lat(),
					lng: position.lng()
				}
			})
			console.log('flightPath =====>>>>>>.', flightPath)
			console.log('in set distance popup');
			let distanceInfoPosition = flightPath[Math.round(flightPath.length / 2)];
			console.log('latlng', distanceInfoPosition)

			let distanceInMeters = window.google.maps.geometry.spherical.computeLength(ridePolyline.getPath().getArray());
			let distanceInKm = Math.round(distanceInMeters / 10) / 100 + ' km';
			console.log('distance', distanceInKm)

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
				console.log('duration')
				var durationBlock = duration ?
					`<div class='duration-block'>
																<img src="/assets/clock.svg" alt="loading" className="login-loading" />
																<div class='duration-info'>`+ duration + `</div>
															</div>` : '';
				console.log('durationBlock', durationBlock)
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
		console.log("set distance", setDistancePopup)
		console.log('after set distance popup')

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

		let Sp, Ep;
		if (this.state.finalData != undefined) {
			Sp = this.state.finalData.ride.startLocation;
			Ep = this.state.finalData.ride.endLocation;
		}
		else {
			Sp = this.props.location.state.data.startLocation;
			Ep = this.props.location.state.data.endLocation;
		}

		if (this.state.mapIsReady !== prevState.mapIsReady || (Sp !== prevState.startingPoint.value && Ep) || (Ep !== prevState.endingPoint.value && Sp)) {
			try {
				this.initMap(Sp, Ep);
			} catch (e) {

			}

		}
	}

	acceptOffer(e, review, userData, bookingReview) {
		e.preventDefault();
		console.log('review', review, userData, bookingReview);
		if (review && userData !== undefined) {
			let data = {
				"startLocation": userData.startingPoint,
				"endLocation": userData.endingPoint,
				"rideId": review.ride.id,
				"userEmail": this.user.email
			}
			this.props.confirmBookRequest(data)
		}

		else {
			let data = {
					"startLocation": bookingReview.startLocation,
				"endLocation": bookingReview.endLocation,
				"rideId": bookingReview.id,
				"userEmail":	bookingReview.user.email
			}
			this.props.confirmBookRequest(data)
		}
	}
	backButton = () => {
		this.props.history.push({
			pathname: '/findrides',
			state: {
				data: this.props.location.state.userData
			}
		});
		console.log("this.props.location.state.userData", this.props.location.state.userData)
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
		console.log("userFInal DATAT++++++++>>>>", this.state.userFinalData)
		let username = JSON.parse(localStorage.getItem('user'))
		console.log('username',username.name)
		  const { fullScreen } = this.props;
		if (this.state.showMessage) {
			console.log('i was here')
			setTimeout(() => {
				this.setState({
					showMessage: false,
				})
			}, 5000);
		}
		const { classes } = this.props;
		let PublishArray = localStorage.getItem('review') ? JSON.parse(localStorage.getItem('review')) : [];
		localStorage.setItem('Publish', JSON.stringify(PublishArray));
		let bookReview = JSON.parse(localStorage.getItem('Booked'));
		if (this.props.bookingErrMsg) {
			console.log('noononnnono')
			this.setState({
				showMessage: true,
				theme: 'error',
				message: this.props.bookingErrMsg
			})
			console.log('byebyebye')
			this.props.ClearBookingNotification();
		}
		console.log('successMsg', this.props.successMsg)
		console.log('isBookingFetching', this.props.isBookingFetching)
		if (this.props.successMsg) {
			console.log('this.props.successMsg', this.props.successMsg)
			this.props.ClearBookingNotification();
			this.props.history.push('/success');
		}
		if (this.props.isBookingFetching) {
			return (
				<div class="loader"></div>
			)
		}
		let bookingReview = this.props.location.state && this.props.location.state.data;
		let userData = this.props.location.state && this.props.location.state.userData;

		console.log('bookingReview', bookingReview, userData);

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
					<AppBar ><Typography variant="h6" color="white" className={classes.grown} > <span className="cursor" onClick={(e) => this.goToBackScreen(e)}>PariVahan </span></Typography>
						<Typography variant="h6" color="white" className="App-bar-name">
							Welcome: {username.name}
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
						{bookingReview || userData ?
							<form className='FormStyle' onSubmit={(e) => this.acceptOffer(e, this.state.finalData, this.state.userFinalData, bookingReview)}>
								<fieldset>
									<legend>Booking Details</legend>
									<div className={classes.column}>
										<Typography className={classes.heading}><b> Origin</b> : {this.state.userFinalData == undefined ? this.props.location.state.data.startLocation : this.state.userFinalData.startingPoint} </Typography>
									</div>

									<br />
									<div className={classes.column}>
										<Typography className={classes.heading}><b> Destination</b> : {this.state.userFinalData == undefined ? this.props.location.state.data.endLocation : this.state.userFinalData.endingPoint}</Typography>
									</div>
									<br />
									<div className={classes.column}>
										<Typography className={classes.heading}><b>You'll Pay</b>: ₹ {this.state.userFinalData == undefined ? this.props.location.state.data.charges : this.state.finalData.totalChargesForRide}</Typography>
									</div>
									<br />

								</fieldset>
								<fieldset>
									<legend>Offerer Details</legend>
									<div className={classes.column}>
										<Typography className={classes.heading}><b>Origin</b> : {bookingReview.ride == undefined ? bookingReview.startLocation : bookingReview.ride.startLocation} </Typography>
									</div>

									<br />
									<div className={classes.column}>
										<Typography className={classes.heading}><b>Destination</b> : {bookingReview.ride == undefined ? bookingReview.endLocation : bookingReview.ride.endLocation}</Typography>
									</div>
									<br />
									<div className={classes.column}>
										<Typography className={classes.heading}><b>Name</b> : {bookingReview.ride == undefined ? bookingReview.user.name : bookingReview.ride.user.name}</Typography>
									</div>
									<br />
									<div className={classes.column}>
										<Typography className={classes.heading}><b>Gender</b> : {bookingReview.ride == undefined ? bookingReview.user.gender : bookingReview.ride.user.gender}</Typography>
									</div>
									<br />
									<div className={classes.column}>
										<Typography className={classes.heading}><b>Email</b> : {bookingReview.ride == undefined ? bookingReview.user.email : bookingReview.ride.user.email}</Typography>
									</div>
									<br />
									<div className={classes.column}>
										<Typography className={classes.heading}><b>Mobile</b> : {bookingReview.ride == undefined ? bookingReview.user.mobileNumber : bookingReview.ride.user.mobileNumber}</Typography>
									</div>
									<br />

									<div className={classes.column}>
										<Typography className={classes.heading}><b>Date</b>: {moment(bookingReview.ride == undefined ? bookingReview.departureDate : bookingReview.ride.departureDate, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}</Typography>
									</div>
									<br />
									<div className={classes.column}>
										<Typography className={classes.heading}><b>Available Seats</b>: {bookingReview.ride == undefined ? bookingReview.availableSeats : bookingReview.ride.availableSeats}</Typography>
									</div>
									<br />

								</fieldset>
								<br />
								<Button type='Submit'
									variant="contained" color="primary"
								>
									BOOK RIDE
          							</Button>
								<Button type='Submit'
									variant="contained"
									className="back-button"
									onClick={this.backButton}>
									BACK
          							</Button>
							</form>
							:
							<img src="/assets/loading.svg" alt="loading" className="login-loading" />
						}
						<Grid item xs={6}>
							<div className="full-height-map">
								<div id='map'></div>
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
	componentWillMount() {
		if (this.props.location.state && this.props.location.state.data && this.props.location.state.userData) {

			console.log('this.props.location.state.data', this.props.location.state.data);
			let formData = this.props.location.state.data;
			let userFormData = this.props.location.state.userData;
			let encodedCheck

			this.setState({
				encodingPath: encodedCheck,
				joiningPoints: this.props.location.state.data.riderJoiningPointCoordinate,
				finalData: formData,
				userFinalData: userFormData
			});
		}
		console.log('this.props.location.state.userData', this.props.location.state.userData
		)
		console.log("this.state.finalData", this.state.finalData)
	}
	componentWillUnmount() {
		this.props.ClearBookingData();
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return {
		...ownProps,
		bookingErrMsg: state.confirmBookRequestReducer.bookingErrMsg,
		successMsg: state.confirmBookRequestReducer.successMsg,
		isBookingFetching: state.confirmBookRequestReducer.isBookingFetching
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		confirmBookRequest: (bookRequest) => dispatch(confirmBookRequestActions.confirmBookRequest(bookRequest)),
		confirmBookRequestSuccess: (bookRequestSuccess) => dispatch(confirmBookRequestActions.confirmBookRequestSuccess(bookRequestSuccess)),
		confirmBookRequestError: (bookingErrMsg) => dispatch(confirmBookRequestActions.confirmBookRequestError(bookingErrMsg)),
		ClearBookingData: () => dispatch({ type: 'CLEAR_BACK_LOG' }),
		ClearBookingNotification: () => dispatch({ type: 'CLEAR_BOOKING_NOTIFICATION' })
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(BookRidePreviewScreen)));  