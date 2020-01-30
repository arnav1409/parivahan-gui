import React, { Component } from 'react';
import './RideDetailsDisplay.css';
import './loader.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Validator from './validator';
import { locationSearchActions } from './../actions'
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import DateFnsUtils from '@date-io/date-fns';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import AppBar from 'material-ui/AppBar';
import { bookRideActions } from './../actions';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { Async } from 'react-select';
import './OfferARide.css';
import Feedback from './feedback'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
const minDate = new Date(Date.now());
let suggesstionsArray = []
const styles = theme => ({
	heading: {
		fontSize: theme.typography.pxToRem(13),
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

const filterOptions = (inputValue) => {
	let suggestionsDict = []
	if (suggesstionsArray !== undefined) {
		suggestionsDict = suggesstionsArray.map(suggestion => ({

			value: suggestion,
			label: suggestion,
		}));

	}
	return suggestionsDict
};

const loadOptions = (inputValue, callback) => {
	setTimeout(() => {
		callback(filterOptions(inputValue));
	}, 1000);
};

class RideDetailsDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formCredentials: {
				startingPoint: ' ',
				endingPoint: ' ',
				radius: '2000',
				date: new Date()
			},
			startingPoint: { label: '', value: ' ' },
			endingPoint: { label: '', value: ' ' },
			mapIsReady: false,
			suggestions: [],
			searchLocation: ''
		}
		this.validators = new Validator();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.isValid = false;
		let userName = localStorage.getItem('user');
		let userEmail = JSON.parse(userName)
		console.log(userEmail.email)
		
		console.log('userName', userName);
		this.autoAccept = this.autoAccept.bind(this);

	}

	handleInputChange(event, inputProps) {
		this.updateValidator(event, inputProps);
	}

	updateValidatorLocation(event, inputProps) {
		const fieldVd = this.validators[inputProps];
		fieldVd.errorMsg = '';
		fieldVd.state = event.value;
		fieldVd.valid = true;
		fieldVd.value = event.value;
		fieldVd.touched = true;
		const rules = fieldVd.rules;
		for (let i = 0; i < rules.length; i++) {
			console.log('start point validator', rules[i].test(event.value), rules[i], event.value)
			if (!rules[i].test(event.value)) {
				fieldVd.errorMsg = rules[i].message;
				fieldVd.valid = false;
				this.isValid = false;

				console.log('error')
				break;
			}
			else {
				let formData = { ...this.state.formCredentials };
				formData[inputProps] = fieldVd.value;
				this.setState({
					formCredentials: formData
				}, () => { console.log(this.state) });
			}
		}
	}

	updateValidator(event, inputProps) {
		const fieldVd = this.validators[inputProps];
		fieldVd.errorMsg = '';
		fieldVd.state = event.target.value;
		fieldVd.valid = true;
		fieldVd.value = event.target.value;
		fieldVd.touched = true;
		const rules = fieldVd.rules;
		for (let i = 0; i < rules.length; i++) {
			if (!rules[i].test(event.target.value)) {
				fieldVd.errorMsg = rules[i].message;
				fieldVd.valid = false;
				this.isValid = false;

				console.log('error')
				break;
			}
			else {
				let formData = { ...this.state.formCredentials };
				formData[inputProps] = fieldVd.value;
				this.setState({
					formCredentials: formData
				}, () => { console.log(this.state) });
			}
		}
	}

	onChange = (date) => {
		let formData = { ...this.state.formCredentials };
		formData.date = date;
		this.setState({
			formCredentials: formData
		});
	}

	applyFilter(e) {
		e.preventDefault();
		if (this.isFormValid()) {
			console.log('submit')
			let user = localStorage.getItem('user');
		let userEmail = JSON.parse(user)
    let userName = JSON.parse(user)
		console.log(userName.name)
		console.log(userEmail.email)
			console.log('this.state.formCredentials', this.state.formCredentials);
			let formData = {
				...this.state.formCredentials
			}
			let data = {
				"startLocation": formData.startingPoint,
				"endLocation": formData.endingPoint,
				"date": (moment(formData.date).format('YYYY-MM-DDTHH:mm:ss:SSS')) + 'Z',
				"email": userEmail.email,
				"userName": userName.name,
				"radius": formData.radius,
			}
			console.log('finalData', data);
			this.props.fetchBookRideDetails(data);
		}
	}
	backButton = () => {
		this.props.history.push({
			pathname: '/bookride',
			state: {
				userData: this.props.location.state.data
			}
		});
		console.log('this.props.location.state.data', this.props.location.state.data)
	}

	logout = () => {
		localStorage.clear();
		window.location.href = '/';
	}

	goToBackScreen = (e) => {
		this.props.history.push('/home')
	}

	bookRequest(e, rideDetails) {
		e.preventDefault();
		console.log('RideDetails', rideDetails.ride)
		console.log('cost', rideDetails.totalChargesForRide)
		this.props.history.push({
			pathname: '/bookingpreviewscreen',
			state: {
				data: rideDetails,
				userData: this.state.formCredentials
			}
		});
	}


	isFormValid() {
		let fieldNames;
		fieldNames = ['startingPoint', 'endingPoint'];
		this.isValid = true;
		console.log('Reachd')
		console.log('isValid', this.isValid)
		return this.isValid;
	}


	autoAccept = (value, inputProps) => {
		console.log(value)
		if (value.trim()) {
			this.setState({
				searchLocation: value
			}, () => {
				this.props.autocompletesearchapi(this.state.searchLocation)

			})
		}

	}

	onChange = (date) => {
		let formData = { ...this.state.formCredentials };
		formData.date = date;
		this.setState({
			formCredentials: formData
		});
	}

	NoOptionsMessage = (props) => {
		return (
			<Typography
				color="textSecondary"
				className={props.selectProps.classes.noOptionsMessage}
				{...props.innerProps}
			>
				{props.children}
			</Typography>
		);
	}

	inputComponent = ({ inputRef, ...props }) => {
		return <div ref={inputRef} {...props} />;
	}

	Option = (props) => {
		console.log(props)
		return (
			<MenuItem
				buttonRef={props.innerRef}
				selected={props.isFocused}
				component="div"
				style={{
					fontWeight: props.isSelected ? 500 : 400,
				}}
				{...props.innerProps}
			>
				{props.children}
			</MenuItem>
		);
	}

	Placeholder = (props) => {
		return (
			<Typography
				color="textSecondary"
				className={props.selectProps.classes.placeholder}
				{...props.innerProps}
			>
				{props.children}
			</Typography>
		);
	}

	SingleValue = (props) => {
		return (
			<Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
				{props.children}
			</Typography>
		);
	}

	ValueContainer = (props) => {
		return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
	}
	Menu = (props) => {
		return (
			<Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
				{props.children}
			</Paper>
		);
	}
	inputLocation(e, inputProps) {
		this.updateValidatorLocation(e, inputProps);
		if (inputProps === 'startingPoint') {
			let startingPointNew = { ...this.state[inputProps] }
			startingPointNew.label = e.value;
			startingPointNew.value = e.value;
			this.setState({ startingPoint: startingPointNew })
		}
		else if (inputProps === 'endingPoint') {
			let endingPointNew = { ...this.state[inputProps] }
			endingPointNew.label = e.value;
			endingPointNew.value = e.value;
			this.setState({ endingPoint: endingPointNew })

		}
		let formData = { ...this.state.formCredentials };
		formData[inputProps] = e.value;
		this.setState({
			formCredentials: formData,
		})
	};
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

		const useStyles = makeStyles(theme => ({
			root: {
				flexGrow: 1,
				height: 250,
			},
			input: {
				display: 'flex',
				padding: 0,
			},
			valueContainer: {
				display: 'flex',
				flexWrap: 'wrap',
				flex: 1,
				alignItems: 'center',
				overflow: 'hidden',
			},

			singleValue: {
				fontSize: 16,
			},
			placeholder: {
				position: 'absolute',
				left: 2,
				fontSize: 16,
			},
			paper: {
				position: 'absolute',
				zIndex: 1,
				left: 0,
				right: 0,
			},
			divider: {
			},
		}));
		const components = {
			Option,
		};

		suggesstionsArray = this.props.locationSearchSuggestion;
		let user = localStorage.getItem('user');
		let userName = JSON.parse(user)
		console.log(userName.name)
		let { classes, availableRides } = this.props;
		availableRides = availableRides ? availableRides : [];
		let rideDetails = [];
		if (this.props.bookingSuccessMsg && this.props.requestData && this.props.requestData.length) {
			console.log('requestDetails', this.props.requestData[0]);
			localStorage.setItem('user', this.props.requestData[0]);
			console.log('huhuhuhuhuhuhu',localStorage.setItem('user', this.props.requestData[0]))
			this.props.history.push({
				pathname: '/previewscreen',
				state: {
					data: this.props.requestData[0]
				}
			});
		}
		console.log('ridelist', availableRides);
		let value = this.state.formCredentials.startingPoint;
		let vm = this;
		console.log('value', value);
		return (
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar ><Typography variant="h6" color="white" className={classes.grown} > <span className="cursor" onClick={(e) => this.goToBackScreen(e)}>PariVahan </span></Typography>
						<Typography variant="h6" color="white" className="App-bar-name">
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

					<div className="root">
						<fieldset>
							<legend>Filter Search</legend>
							<form className={classes.container}>

								<NoSsr>
									<label className="location-label">
										<b>STARTING POINT:</b>
									</label>
									<div className="search-bar">
										<Async
											className="location-select"
											loadOptions={loadOptions}
											value={this.state.startingPoint}
											onChange={(e) => this.inputLocation(e, 'startingPoint')}
											onInputChange={(e) => this.autoAccept(e, 'startingPoint')}

											placeholder="Starting Point"
										/></div>
									{console.log('startingPoint', this.validators.startingPoint.errorMsg)}
									<br />
									<label className="location-label">
										<b>ENDING POINT:</b>
									</label>
									<div className="search-bar">
										<Async
											className="location-select"
											loadOptions={loadOptions}
											onChange={(e) => this.inputLocation(e, 'endingPoint')}
											onInputChange={(e) => this.autoAccept(e, 'endingPoint')}
											placeholder="Ending Point"
											value={this.state.endingPoint}
										/></div>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<DateTimePicker
											hintText="Check-n" minDate={minDate}
											label="DATE & TIME"
											onChange={this.onChange}
											value={this.state.formCredentials.date}
											className="red-border date-filter"
											isClearable={true}
										/>
									</MuiPickersUtilsProvider>
								</NoSsr>
							</form>
							<section className="apply-filter">
								<Button
									variant="contained" color="primary"
									onClick={(event) => this.applyFilter(event)}
									className="apply-filter" >
									APPLY FILTER
        </Button>
								<Button
									variant="contained"
									onClick={this.backButton}
									className="back-button-find-ride-list" >
									BACK
        </Button>
							</section>
						</fieldset>

						{this.props.isRideFetchingResults
							?
							<div id="loader"></div> :

							(availableRides && availableRides.length) ?

								availableRides.map((details, index) => {

									console.log('details', details.ride.endLocation, details.ride.user);
									let seats = details.ride.availableSeats;
									console.log(seats, 'seats')
									console.log('response.data.message')
									console.log('this.props.isRideFetchingResults', this.props.isRideFetchingResults)
									return (
										<div className="results">
											{details && details.ride && details.ride.user &&
												<ExpansionPanel >
													<ExpansionPanelSummary className={classes.panelSummary} expandIcon={<ExpandMoreIcon />}>
														<div className={classes.column}>
															<Typography className={classes.heading}><b>Start Point:</b> {details.ride.startLocation}</Typography></div>
														<div className={classes.column}>
															<Typography className={classes.heading}><b>End Point:</b> {details.ride.endLocation}</Typography></div>
														<div className={classes.column}>
															<Typography className={classes.heading}><b>Leaving On:</b> {moment(details.ride.departureDate, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}</Typography></div>
														<div className={classes.column}>
															<Typography className={classes.heading}><b>Name:</b> {details.ride.user.name}</Typography></div>
													</ExpansionPanelSummary>
													<ExpansionPanelActions>
														<div className={classes.column}>
															<Typography className={classes.heading}><b>Gender:</b> {details.ride.user.gender}</Typography></div>
														<div className={classes.column}>
															<Typography className={classes.heading}><b>Email:</b> {details.ride.user.email}</Typography></div>
														<div className={classes.column}>
															<Typography className={classes.heading}><b>Mobile:</b> {details.ride.user.mobileNumber}</Typography></div>
														<div className={classes.column}>
															<Typography className={classes.heading}><b>You'll Pay:</b> ₹ {details.totalChargesForRide}</Typography></div>
													</ExpansionPanelActions>
													<ExpansionPanelActions>
														<div className={classes.column}>
															<Tooltip title="Origin Walking Distance">
																<Typography className={classes.heading}><b>Origin Walking Distance:</b> {details.originWalkingDistance}</Typography>
															</Tooltip></div>
														<div className={classes.column}>
															<Tooltip title="Destination Walking Distance">
																<Typography className={classes.heading}><b>Destination Walking Distance:</b> {details.destinationWalkingDistance}</Typography>
															</Tooltip></div>
														<div className={classes.column}>
															<Tooltip title="Total Destination Distance">
																<Typography className={classes.heading}><b>Total Ride Distance</b> {details.totalRideDistance}</Typography></Tooltip></div>
														<div className={classes.column}>
															<Typography className={classes.heading}><b>Available Seats:</b> {details.ride.availableSeats}</Typography></div>
													</ExpansionPanelActions>
													{seats !== 0 ?
														<ExpansionPanelActions>
															<Button
																size="small"
																color="primary"
																variant="contained"
																onClick={(event) => this.bookRequest(event, details)}
															>
																REQUEST RIDE
															  </Button>
														</ExpansionPanelActions> : 'Ride is Full'}
													<Divider />
												</ExpansionPanel>
											}
										</div>

									)
								})
								:
								<div className="no-rides">
									<h3>No Rides Found</h3>
								</div>


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
				</React.Fragment>
			</MuiThemeProvider>
		)
	}


	componentWillMount() {
		if (this.props.location.state && this.props.location.state.data) {
			console.log('this.props.location.state.data', this.props.location.state.data);
			console.log('this.props.location.state.cost', this.props.location.state.cost);
			let formData = { ...this.props.location.state.data };

			let data = {
				"startLocation": formData.startingPoint,
				"endLocation": formData.endingPoint,
				"date": (moment(formData.date).format('YYYY-MM-DDTHH:mm:ss:SSS')) + 'Z',
				"email": formData.userEmail,
				"userName": formData.userName
			}
			let finalData = this.props.location.state.data;
			this.setState({
				formCredentials: finalData,
				startingPoint: {
					label: formData.startingPoint,
					value: formData.startingPoint
				},
				endingPoint: {
					label: formData.endingPoint,
					value: formData.endingPoint
				}
			});
			console.log('finalData', data)
			this.props.fetchBookRideDetails(data);
		}
	}

}
const mapStateToProps = (state, ownProps) => {
	console.log(state)
	return {
		...ownProps,
		availableRides: state.bookRideReducer.availableRides,
		requestData: state.bookRideReducer.requestData,
		isOfferFetching: state.bookRideReducer.isOfferFetching,
		successMsg: state.bookRideReducer.successMsg,
		errMsg: state.bookRideReducer.errMsg,
		isRideFetchingResults: state.bookRideReducer.isBookingFetching,
		locationSearchSuggestion: state.locationSearchReducer.locationSearch,
		isLocationFetching: state.locationSearchReducer.locationSearch
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBookRideDetails: (bookRideDetails) => dispatch(bookRideActions.fetchBookRideDetails(bookRideDetails)),
		fetchBookRideListSuccess: (bookRideSuccess) => dispatch(bookRideActions.fetchBookRideListSuccess(bookRideSuccess)),
		autocompletesearchapi: (location) => dispatch(locationSearchActions.locationSearchRequest(location))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RideDetailsDisplay));