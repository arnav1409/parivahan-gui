import React, { Component } from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './OfferARide.css';
import moment from 'moment';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Validator from './validator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {Async} from 'react-select';
import {locationSearchActions} from './../actions'
import Tooltip from '@material-ui/core/Tooltip';
import Feedback from './feedback'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
const minDate = new Date(Date.now());

// let google = window.google;

let suggesstionsArray = []

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

const filterOptions = (inputValue) => {
	    let suggestionsDict = []
	        if (suggesstionsArray !== undefined){
	            // console.log("this.state.suggestions===>", this.props.locationSearchSuggestion)
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

class OfferARide extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formCredentials: {
				startingPoint: ' ',
				endingPoint: ' ',
				vehicle: 'CAR',
				numberOfSeats: 1,
				date: new Date(),
				selectPath: ''
			},
			startingPoint: { label: '', value: ' ' },
			endingPoint: { label: '', value: ' ' },
			mapIsReady: false,
			showButton: false,
			sliderShow: true,
			searchLocation: '',
			suggestions: [],
			maxSeats: 3,
		
		}
		this.validators = new Validator();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.autoAccept = this.autoAccept.bind(this);
		this.isValid = false;
		this.user = JSON.parse(localStorage.getItem('user'));
	//	this.handleChange = this.handleChange.bind(this);
	}
	handleInputChange(event, inputProps) {
		if(inputProps === 'vehicle'){
			let {formCredentials} = this.state;
			if(event.target.value === 'BIKE'){
				formCredentials.numberOfSeats = 1;
				this.setState({ 
					maxSeats: 1, 
					formCredentials 
				},() =>(console.log('byk', this.state.maxSeats)));
			} else {
				this.setState({ maxSeats: 3 },() => (console.log('CAR', this.state.maxSeats)));
			}
		}
		this.updateValidator(event, inputProps);
	}
	logout = () => {
		console.log("logging out ")
		localStorage.clear(); 
		window.location.href = '/';
	}
	componentDidMount() {
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDMw93vd70BgI6Gp9RZV0HvLHxto4xbaHg&libraries=geometry`;
		script.async = true;
		script.defer = true;
		script.addEventListener('load', () => {
			this.setState({ mapIsReady: true });
		});

		document.body.appendChild(script);
	}

	initMap = (startLocation, endLocation) => {
		console.log('initMap')
		let vm = this;
		startLocation = startLocation;
		endLocation = endLocation;
		let flightPlanCoordinates = [];
		let polylinePaths = [];
		var map = new window.google.maps.Map(document.getElementById('map'), {
			zoom: 3,
			center: { lat: 18.56, lng: 73.77 },
		});


		function zoomToObject(obj) {
			var bounds = new window.google.maps.LatLngBounds();
			var points = obj.getPath().getArray();
			for (var n = 0; n < points.length; n++) {
				bounds.extend(points[n]);
			}
			map.fitBounds(bounds);
		}


		function handelPolyClick(eventArgs, polyLine, polyLineOuter) {
			// now you can access the polyLine
			vm.setState({
				selectedPath: polyLine.get("id"),
				showButton: true
			})
			polyLine.setOptions({ strokeColor: '#00B5FF' });
			polyLine.setOptions({ strokeWeight: 4 });
			polyLine.setOptions({ zIndex: 2});

			resetNonSelectedPolylines(polyLine, polyLine.get("id"));
		};

		function resetNonSelectedPolylines(polyLine, pathSummary) {
			if (flightPlanCoordinates !== undefined) {
				for (var i = 0; i < polylinePaths.length; i += 2) {
					if (polylinePaths[i].get("id") === pathSummary) {
						polylinePaths[i].setOptions({ strokeColor: '#4B77BE' });
						polylinePaths[i].setOptions({ strokeWeight: 7 });
						polylinePaths[i].setOptions({ zIndex: 2});
						continue;
					} else {
						polylinePaths[i].setOptions({ strokeColor: '#A9A9A9' });
						polylinePaths[i].setOptions({ strokeWeight: 7 });
						polylinePaths[i].setOptions({ zIndex: 1 });

						polylinePaths[i+1].setOptions({ strokeColor: '#CCCCCC' });
						polylinePaths[i+1].setOptions({ strokeWeight: 4 });
						polylinePaths[i+1].setOptions({ zIndex: 1 });
					}
				}
			}
		};


		var request = new XMLHttpRequest();
		request.open('GET', this.props.api_url+"/direction?startLocation=" + startLocation + "&endLocation=" + endLocation, true)

		request.onload = function () {
			flightPlanCoordinates = JSON.parse(this.response);		
			if (flightPlanCoordinates && flightPlanCoordinates.length) {
				vm.setState({
					selectedPath: flightPlanCoordinates[0].summary,
					showButton: true
				})

				var originInfo = new window.google.maps.InfoWindow({
					content: 'Origin'
				});
				
				var destinationInfo = new window.google.maps.InfoWindow({
					content: 'Destination'
        });
				
				var originMarker = new window.google.maps.Marker({
					position: flightPlanCoordinates[0].paths[0],
					map: map,
					opacity: 1,
					animation: window.google.maps.Animation.DROP
				});
				originInfo.open(map, originMarker);

				var destMarker = new window.google.maps.Marker({
					position: flightPlanCoordinates[0].paths[(flightPlanCoordinates[0].paths.length - 1)],
					map: map,
					opacity: 1,
					animation: window.google.maps.Animation.DROP
				});
				destinationInfo.open(map, destMarker);

			}

			var symbolOne = {
				path: window.google.maps.SymbolPath.CIRCLE,
				strokeColor: '#000',
				strokeWeight: 2,
				fillColor: '#fff',
				fillOpacity: 1,
				scale: 4
			};

			function setDistancePopup(flightPath, directionPath) {
				// to get disatnce
				let distanceInfoPosition = directionPath.paths[Math.round(directionPath.paths.length/2)];
				console.log('distanceInfoPosition =====>>>>>>.',flightPath.getPath().getArray()	)
				let distanceInMeters = window.google.maps.geometry.spherical.computeLength(flightPath.getPath().getArray());
				let distanceInKm = Math.round(distanceInMeters/10)/100 + ' km';

				// to get duration
				var directionsService = new window.google.maps.DirectionsService();
				console.log('flightPlanCoordinates',directionPath)
				var breakPoint = Math.round(directionPath.paths.length/20);
				console.log('breakPoint',breakPoint)
				var request = {
						origin: flightPlanCoordinates[0].paths[0], // LatLng|string
						destination: flightPlanCoordinates[0].paths[(flightPlanCoordinates[0].paths.length - 1)], // LatLng|string
						travelMode: window.google.maps.DirectionsTravelMode.DRIVING,
						waypoints: directionPath.paths.filter((latLng, index) => {
							return index % breakPoint === 0;
						}).map((latLng) => {
							return {
								location: latLng,
								stopover: false
							}
						})
				};

				directionsService.route( request, function( response, status ) {
						console.log('response', response);
					  var point='';
						if ( status === 'OK' ) {
								point = response.routes[ 0 ].legs[ 0 ];
								// console.log('point.distance.text', point.distance.text);
						}
						var duration = point && point.duration ? point.duration.text : '';
						var durationBlock = duration ? 
																`<div class='duration-block'>
																	<img src="/assets/clock.svg" alt="loading" className="login-loading" />
																	<div class='duration-info'>`+duration+`</div>
																</div>` : '';
						var infoHtml = `<section class='info-section'>
															`+durationBlock+`
															<div class='distance-info'>`+distanceInKm+`</div>
														<section>`;

						var distanceInfo = new window.google.maps.InfoWindow({
							content: infoHtml,
							position: distanceInfoPosition
						});
						distanceInfo.open(map);
				} );
			}
			
			for(var i=0;i<flightPlanCoordinates.length;i++){
				var directionPath=flightPlanCoordinates[i]; //4B77BE
				var flightPath = new window.google.maps.Polyline({
				path: directionPath.paths,
				geodesic: false,
				strokeColor: '#A9A9A9',
				strokeWeight: 7,
				zIndex: 1,
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
				var flightPathInner = new window.google.maps.Polyline({
					path: directionPath.paths,
					geodesic: false,
					strokeColor: '#CCCCCC',
					strokeWeight: 4,
					zIndex: 1,
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
				//new code
				if(i===0) {
					flightPath.setOptions({strokeColor: '#4B77BE'});
					flightPath.setOptions({strokeWeight: 7});
					flightPath.setOptions({zIndex: 2});

					flightPathInner.setOptions({strokeColor: '#00B5FF'});
					flightPathInner.setOptions({strokeWeight: 4});
					flightPathInner.setOptions({zIndex: 2});
				}
				//New code end	
				flightPath.set("id",directionPath.summary);
				flightPathInner.set("id",directionPath.summary);
			
				polylinePaths.push(flightPath);
				polylinePaths.push(flightPathInner);

				// window.google.maps.event.addListener(flightPath, 'click', function (e) {
				// 	handelPolyClick(e, this);
				// });

				window.google.maps.event.addListener(flightPathInner, 'click', function (e) {
					handelPolyClick(e, this, flightPath);
				});

				flightPath.setMap(map);
				flightPathInner.setMap(map);

				// popup for duration
				setDistancePopup(flightPath, directionPath);

				if (i === flightPlanCoordinates.length - 1) {
					zoomToObject(flightPath);
				}
			}			
		}

		request.send();
	}
	
	componentDidUpdate(prevProps, prevState) {
		let Sp = this.state.startingPoint.value;
		let Ep = this.state.endingPoint.value;
		if (this.state.mapIsReady !== prevState.mapIsReady || (Sp !== prevState.startingPoint.value && Ep) || (Ep !== prevState.endingPoint.value && Sp)) {
			this.initMap(Sp, Ep);
			// // Display the map
			// const uluru = {lat:18.56, lng: 73.77};
			// const map = new window.google.maps.Map(document.getElementById('map'), {
			//   zoom: 3,
			//   center: { lat: 18.56, lng: 73.77 },
			// });
			// const marker = new window.google.maps.Marker({
			//   position: uluru,
			//   map: map
			// });
			// You also can add markers on the map below
		}
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
				console.log('error', fieldVd.errorMsg)
				break;
			}
			else {
				let formData = { ...this.state.formCredentials };
				formData[inputProps] = fieldVd.value;
				this.setState({
					formCredentials: formData,

				})
			};
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
				})
			};
		}
	}

	publishOffer(e) {
		e.preventDefault();

		this.isFormValid();


		if (this.isValid) {
			let publishInfo = {
				...this.state.formCredentials

			}
			let finalData = {
				"startLocation": publishInfo.startingPoint,
				"endLocation": publishInfo.endingPoint,
				"availableSeats": publishInfo.numberOfSeats,
				"selectedRidePath": this.state.selectedPath,
				"vehicle":  publishInfo.vehicle,
				"departureDate": (moment(publishInfo.date).format('YYYY-MM-DDTHH:mm:ss:SSS')) + 'Z',
				"departureHours": "0000",
				"user": { ...this.user }
			}
			console.log('finalData', finalData);
			this.props.history.push({
				pathname: '/offerpreviewScreen',
				state: {
					data: finalData
				}
			});
			// this.props.sendPublishRequest(finalData);
			localStorage.setItem('Review', JSON.stringify(finalData));
			// this.props.history.push('/previewScreen')

		}

		console.log('submit')
	}

	isFormValid() {
		let fieldNames;
		fieldNames = ['startingPoint', 'endingPoint']
		this.isValid = true;
		console.log('Reachd')
		this.isValid = this.validators.isFormValid(fieldNames);
		console.log('isValid', this.isValid)
		return this.isValid;

	}
	goToBackScreen = (e) => {
		this.props.history.push('/home')
	}

	goHomePage = () => {
		this.props.history.push({
			pathname: '/home',
		});
	}
	feeback = () => {
		
		this.setState({
			showFeedback: true
		})
	}
	closePopUp = () =>{
		this.setState({showFeedback:false})
	}

	onChange = (date) => {
		let formData = { ...this.state.formCredentials };
		formData.date = date;
		this.setState({
			formCredentials: formData
		});
	}
	
	handleChange = (event, numberOfSeats) => {
		const {vehicle} = this.state.formCredentials;
		if (vehicle === 'BIKE') {
			this.setState(prevSeats => ({
				formCredentials: {
					...prevSeats.formCredentials,
					numberOfSeats: 1,
				}
			}), () => console.log('hndlechnge chnge byk', this.state))
		}
		else if (vehicle === 'CAR') {
		
			this.setState(prevSeats => ({
				formCredentials: {
					...prevSeats.formCredentials,
					numberOfSeats: prevSeats.formCredentials.numberOfSeats + 1
				},
				sliderShow: true,
				maxSeats:3
			}),  () => console.log('hndleChnge chnge byk', this.state))
		}
		 else {
			this.setState(prevSeats => ({
				formCredentials: {
					...prevSeats.formCredentials,
					numberOfSeats:  prevSeats.formCredentials.numberOfSeats
				},
				sliderShow: true,
				maxSeats:3
			}),  () => console.log('hndleChnge chng else', this.state))
		} 

	}
	/* handleChange = (event, numberOfSeats) => {

		if (event.target.value === 'bike') {
			this.setState(prevSeats => ({
				formCredentials: {
					...prevSeats.formCredentials,
					numberOfSeats: 1,
				}
			}), () => console.log('hndlechnge chnge byk', this.state))
		}
		else if (event.target.value === 'car') {
			this.setState(prevSeats => ({
				formCredentials: {
					...prevSeats.formCredentials,
					numberOfSeats: 1
				},
				sliderShow: true
			}),  () => console.log('hndleChnge chnge byk', this.state))
		}
		else {
			this.setState(prevSeats => ({
				formCredentials: {
					...prevSeats.formCredentials,
					numberOfSeats: numberOfSeats	
				},
				sliderShow: true
			}),  () => console.log('hndleChnge chng else', this.state))
		}

	} */
	autoAccept = (value, inputProps) => {
		if(value.trim()) {
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
			// showButton: true
		}
		)
	};

	render() {
		const { fullScreen } = this.props;
		console.log('this.state',this.props.api_url)

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
		}));

		const components = {
			Option,
		};
		const { classes } = this.props;
		console.log('slider Number seats',this.state.formCredentials.numberOfSeats)

		suggesstionsArray = this.props.locationSearchSuggestion
		//const maxSeats = this.state.formCredentials.vehicle === 'car' ? 3 : 1;
		const maxSeats = this.state.maxSeats;
		if (this.props.successMsg && this.props.offerData && this.props.offerData.length) {
			console.log('OfferDetails', this.props.offerData[0]);
			localStorage.setItem('user', this.props.offerData[0]);
			this.props.history.push({
				pathname: '/previewscreen',
				state: {
					data: this.props.offerData[0]
				}
			});
		}
		return (
			<section>
				<MuiThemeProvider>
					<React.Fragment>
						<AppBar >
							<Typography variant="h6" color="white" className={classes.grown} > <span className="cursor"	onClick={(e) => this.goToBackScreen(e)}>PariVahan </span></Typography>
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
						<Grid container spacing={12} className="root">
							<form className='FormStyle' onSubmit={(event) => this.publishOffer(event)}>
								<fieldset className='FieldSet'>
									<legend>Offer Details</legend>
									<NoSsr>
										<label>
											Starting Point:
									</label>
										<Async
										
										loadOptions={loadOptions}
										onChange={(e) => this.inputLocation(e, 'startingPoint')}
										onInputChange={(e) => this.autoAccept(e, 'startingPoint')}
										placeholder="Starting Point"
										error={this.validators.startingPoint.errorMsg !== ''}
									/>
										<div>{this.validators.startingPoint.errorMsg}</div>
										<br />
										<label>
											Ending Point:
									</label>
										<Async
										
										loadOptions={loadOptions}
											onChange={(e) => this.inputLocation(e, 'endingPoint')}
											onInputChange={(e) => this.autoAccept(e, 'endingPoint')}
											placeholder="Ending Point"
											error={this.validators.endingPoint.errorMsg !== ''}
										/>
										<div>{this.validators.endingPoint.errorMsg}</div>
								
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
									
										<FormLabel>Select route from map</FormLabel>
										<Tooltip title="-->" placement="right-start">
										<TextField
											id="selected Path"
											name="selected Path"
											autoComplete="SelectPath"
											value={this.state.selectedPath}
											disabled
											onChange={(event) => { this.handleInputChange(event, 'selectedPath') }}
											error={this.validators.endingPoint.errorMsg !== ''}

										/></Tooltip>

										<br />
										<FormControl>
											<FormLabel component="legend">Vehicle </FormLabel>
											<RadioGroup
												aria-label="Vehicle"
												name="Vehicle"
												value={this.state.formCredentials.vehicle}
												onChange={(event) => { this.handleInputChange(event, 'vehicle') }}
											>
												<FormControlLabel value="BIKE"  control={<Radio /> } label="Bike" />
												<FormControlLabel value="CAR" control={<Radio />} label="Car" />

											</RadioGroup>
								
										</FormControl><br />
										<div className={classes.root}>
											Number of Seats:
        						<Slider
												id="Slider"
												className="Slider"
												classes={{ container: classes.slider }}
												value={this.state.formCredentials.numberOfSeats}
												max={maxSeats}
												defaultValue={1}
												min={1}
												step={1}
												onChange={this.handleChange}
											/>{this.state.formCredentials.numberOfSeats}
										</div>
									</NoSsr>
									<br />
									{this.state.showButton ? (<Button
										type='Submit'
										variant="contained" color="primary" >
										Publish
								</Button>) : (
											<Button
												type='Submit'
												disabled
												variant="contained" color="primary" >
												Publish
								</Button>)
									}

									<Button
										variant="contained" className={classes.button}
										onClick={(e) => this.goToBackScreen(e)}>
										Back
               </Button>



								</fieldset>
							</form>


							<Grid item xs={6}>
								<div className="full-height">
									<div id="map"></div>
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

			</section>

		)

	}


}

const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return {
		...ownProps,
		api_url : state.app.API_URL,
		offerData: state.publishOffer.offerData,
		isOfferFetching: state.publishOffer.isOfferFetching,
		successMsg: state.publishOffer.successMsg,
		errMsg: state.publishOffer.errMsg,	
		maintainOffer: state.publishOffer,
		locationSearchSuggestion : state.locationSearchReducer.locationSearch,
		isLocationFetching : state.locationSearchReducer.locationSearch
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		autocompletesearchapi : (location) => dispatch (locationSearchActions.locationSearchRequest(location)) 
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withRouter(OfferARide)));
