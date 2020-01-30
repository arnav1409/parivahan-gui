import React, { Component } from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import './OfferARide.css';
import './BookARide.css';
import Button from '@material-ui/core/Button';
import { eventChannel } from 'redux-saga';
import Validator from './validator';
import { bookRideActions } from './../actions';
import { GoogleComponent } from 'react-google-location';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { publishActions } from './../actions';
import {locationSearchActions} from './../actions'
import moment from 'moment';
import { makeStyles, useTheme, createStyles } from '@material-ui/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select, {Async} from 'react-select';
import { timeout } from 'q';
import { getTime } from 'date-fns/esm';
import Feedback from './feedback'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const minDate = new Date(Date.now());
let suggesstionsArray = []
const styles = theme => ({
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
	        if (suggesstionsArray !== undefined){
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

class BookARide extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formCredentials: {
				startingPoint: '',
				endingPoint: '',
				userEmail: '',
				userName: '',
				radius: '2000',
				date: new Date()
			},
			suggestions: [],
			searchLocation: ''
		}

		this.validators = new Validator();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.isValid = false;
		this.user = JSON.parse(localStorage.getItem('user'));
		this.autoAccept = this.autoAccept.bind(this);
		console.log('this.user', this.user);
		let userName = this.user.name;
		console.log('userName', userName);
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

	bookRideSubmit(e) {
		e.preventDefault();
		if (this.isFormValid()) {
			console.log('submit')
			console.log('this.state.formCredentials', this.state.formCredentials);
			let userConfig = {
				...this.state.formCredentials
			};
			console.log('userConfig', userConfig)
			userConfig.userEmail = this.user.email;
			userConfig.userName = this.user.name;
			userConfig.radius = '2000';
			this.props.history.push({
				pathname: '/findrides',
				state: {
					data: userConfig,
					start: this.state.startingPoint,
					end: this.state.endingPoint

				}
			});
		}
	}


	isFormValid() {
		let fieldNames;
		fieldNames = ['startingPoint', 'endingPoint'];
		this.isValid = true;
		console.log('Reachd')
		this.isValid = this.validators.isFormValid(fieldNames);
		console.log('isValid', this.isValid)
		return this.isValid;
	}


	onChange = (date) => {
		let formData = { ...this.state.formCredentials };
	
		formData.date = date;
	
		this.setState({
			formCredentials: formData
		
		});
	}
	goToBackScreen = (e) => {
		this.props.history.push('/home')
	}

	logout = () => {
	
		localStorage.clear(); 
		window.location.href = '/';
	}

	backButton = () => {
		this.props.history.push({
			pathname: '/home',
		});
	}

	autoAccept = (value, inputProps) => {
		console.log(value)
		if(value.trim()){
		this.setState({
			searchLocation: value
		}, () => {
			const l = this.state.searchLocation
			this.props.autocompletesearchapi(this.state.searchLocation)

		})
	}
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
		const { classes } = this.props;
		
		suggesstionsArray = this.props.locationSearchSuggestion;
  // let suggestions = []
		// if (this.props.locationSearchSuggestion !== undefined){
		// 	console.log("this.state.suggestions===>", this.props.locationSearchSuggestion)
		// suggestions = this.props.locationSearchSuggestion.map(suggestion => ({

		// 	value: suggestion,
		// 	label: suggestion,
		// }));

		// }
		// const loadOptions = (inputValue, callback) => {
		// 	callback(suggestions);
		// };
//   const otherOption = [
// 			{ value: "GS Lab, Baner Road, Baner, Pune, Maharashtra, India", label: "GS Lab, Baner Road, Baner, Pune, Maharashtra, India" },
// 			{ value: "Adisa Icon, Adisa Icon house, Service Road, Ram Nagar, Bavdhan, Pune, Maharashtra, India", label: "Adisa Icon, Adisa Icon house, Service Road, Ram Nagar, Bavdhan, Pune, Maharashtra, India" },
// 			{ value: "kPoint Technologies, Baner Road, Lalit Estate, Baner, Pune, Maharashtra, India", label: "kPoint Technologies, Baner Road, Lalit Estate, Baner, Pune, Maharashtra, India" }
// 		]

// 		let finalArray = [...otherOption];
// 		if (this.props.locationSearchSuggestion !== undefined){
// 			console.log("this.state.suggestions===>", this.props.locationSearchSuggestion)
// 		const suggestions = this.props.locationSearchSuggestion.map(suggestion => ({

// 			value: suggestion,
// 			label: suggestion,
// 		}));

// 		finalArray = [...otherOption, ...suggestions];
// 		}
		
// 		console.log("finalArray===>", finalArray)
		// const suggestions = this.state.suggestions.map(suggestion => ({
		// 	value: suggestion,
		// 	label: suggestion,
		// }));
		return (
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar >	
					<Typography variant="h6" color="white" className={classes.grown} > <span className="cursor" 	onClick={(e) => this.goToBackScreen(e)}>PariVahan </span></Typography>
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
						<form className='FormStyle' onSubmit={(event) => this.bookRideSubmit(event)}>
							<fieldset className='FieldSet'>
								<legend>Book Details</legend>
								<NoSsr>
									<label>
										Starting Point:
								</label>
									<Async
							
										loadOptions={loadOptions}
										onChange={(e) => this.inputLocation(e, 'startingPoint')}
									
										onInputChange={(e) => this.autoAccept(e, 'startingPoint')}
										value={this.state.startingPoint}
										placeholder="Starting Point"
										error={this.validators.startingPoint.errorMsg !== ''}
									/>
									{console.log('startingPoint', this.validators.startingPoint.errorMsg)}
									<div>{this.validators.startingPoint.errorMsg}</div>
									<br />
									<label>
										Ending Point:
								</label>
									<Async
										
										loadOptions={loadOptions}
										onChange={(e) => this.inputLocation(e, 'endingPoint')}
									
										value={this.state.endingpoint}
										onInputChange={(e) => this.autoAccept(e, 'endingPoint')}
										placeholder="Ending Point"
										error={this.validators.endingPoint.errorMsg !== ''}
									/>
									<div>{this.validators.endingPoint.errorMsg}</div>
									<br />
									<br />
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<FormLabel >Date </FormLabel><br />
										<DateTimePicker
											hintText="Check-n" minDate={minDate}
										
											onChange={this.onChange}
											value={this.state.formCredentials.date}
											className="red-border"
											isClearable={true}
										/>
									</MuiPickersUtilsProvider><br /><br />
								</NoSsr>
								<br />
								<Button
									type='Submit'
									variant="contained" color="primary" onSubmit={(event) => this.bookRideSubmit(event)}>
									SEARCH
                				</Button>
								<Button
									type="submit"
									variant="contained"
									className="back-button"
									onClick={this.backButton}>
									BACK
								</Button>
							</fieldset>
						</form>
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
		)
	}
}
const mapStateToProps = (state, ownProps) => {
 return{
  ...ownProps,
  isBookingFetching : state.bookRideReducer.isBookingFetching,
  locationSearchSuggestion : state.locationSearchReducer.locationSearch,
		isLocationFetching : state.locationSearchReducer.locationSearch
 }
}
const mapDispatchToProps = (dispatch) => {
	return {
		fetchBookRideDetails: (bookRideDetails) => dispatch(bookRideActions.fetchBookRideDetails(bookRideDetails)),
  fetchBookRideListSuccess: (bookRideSuccess) => dispatch(bookRideActions.fetchBookRideListSuccess(bookRideSuccess)),
  autocompletesearchapi : (location) => dispatch (locationSearchActions.locationSearchRequest(location)) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(BookARide)));