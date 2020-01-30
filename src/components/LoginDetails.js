import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import main from './main';
import Button from '@material-ui/core/Button';
import './OfferARide.css'
import Grid from '@material-ui/core/Grid';
import Validator from './validator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InlineMessages from './inlineMessages';
import { submitActions } from './../actions';
import { loginAction } from './../actions';
import InputAdornment from '@material-ui/core/InputAdornment';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formCreational: {
				firstName: ' ',
				lastName: ' ',
				email: ' ',
				phoneNumber: ' ',
				gender: ' '
			},
			Login: {
				email: ''
			},
			show: 'false'
		}
		this.validators = new Validator();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.isValid = false;
	}
	handleLogin(event, inputProps) {
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
				console.log(fieldVd.errorMsg)
				break;
			}
			else {
				const formData = { ...this.state.Login };
				formData[inputProps] = fieldVd.value;
				this.setState({
					Login: formData
				}, () => { console.log(this.state) });
			}
		}
	}
	handleInputChange(event, inputProps) {
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

				console.log(fieldVd.errorMsg)
				break;
			}
			else {
				const formData = { ...this.state.Login };
				formData[inputProps] = fieldVd.value;
				this.setState({
					Login: formData
				}, () => { console.log(this.state) });
			}
		}
	}
	logIn(e) {
		e.preventDefault();
		this.isLoginValid();
		if (this.isValid) {
			console.log('this.isValid', this.isValid);
			let userLogin = {
				...this.state.Login
			};
			this.props.sendLoginRequest(userLogin);

		}
	}
	signUp(e) {
		e.preventDefault();
		this.isFormValid();
		if (this.isValid) {
			let userConfig = {
				...this.state.formCreational
			};
			this.props.sendSignupRequest(userConfig);

		}
	}
	isFormValid() {
		let fieldNames;
		fieldNames = ['firstName', 'lastName', 'email', 'phoneNumber']
		this.isValid = true;
		console.log('Reachd')
		this.isValid = this.validators.isFormValid(fieldNames);
		return this.isValid;
	}
	isLoginValid() {
		let fieldNames;
		fieldNames = ['email']
		this.isValid = true;
		console.log('Reachd')
		this.isValid = this.validators.isFormValid(fieldNames);
		return this.isValid;
	}

	render() {
		console.log('this.props.isFetching',this.props.isFetching)
		return (
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar title="PariVahan" />
					<Grid container spacing={24}>
						<form className='FormStyle' onSubmit={(event) => this.signUp(event)} >
							<fieldset className='FieldSet'><legend>Registration</legend>

								<TextField
									id="firstName"
									name="firstName"
									label="firstName"
									autoComplete="firstName"
									value={this.state.formCreational.FirstName}
									onChange={(event) => { this.handleInputChange(event, 'firstName') }}
									error={this.validators.firstName.errorMsg !== ''}
								/>
								<div>
									{this.validators.firstName.errorMsg}</div>
								<br />
								<TextField
									id="lastName"
									name="lastName"
									label="lastName"
									autoComplete="LastName"
									onChange={(event) => { this.handleInputChange(event, 'lastName') }}
									error={this.validators.lastName.errorMsg !== ''}
								/>
								<div>{this.validators.lastName.errorMsg}</div>
								<br />
								<TextField
									id="phoneNumber"
									name="phoneNumber"
									label="phoneNumber"
									autoComplete="phoneNumber"
									onChange={(event) => { this.handleInputChange(event, 'phoneNumber') }}
									error={this.validators.phoneNumber.errorMsg !== ''}
								/>
								<div>{this.validators.phoneNumber.errorMsg}</div>
								<br />
								<FormControl>
									<FormLabel component="legend">Gender</FormLabel>
									<RadioGroup
										aria-label="Gender"
										name="gender"
										onChange={(event) => { this.handleInputChange(event, 'gender') }}
										error={this.validators.gender.errorMsg !== ''}
									>
										<FormControlLabel value="female" control={<Radio />} label="Female" />
										<FormControlLabel value="male" control={<Radio />} label="Male" />
									</RadioGroup>
								</FormControl><br />
								
								{this.props.isFetching ?

									<span>
										<img src="/assets/loading.svg" alt="loading" className="login-loading" />
									</span>
									:
									<section className="login-button">
										<Button type='submit'
											variant="contained" color="primary" >
											Register</Button>
									</section>
								}

							</fieldset>

						</form></Grid></React.Fragment></MuiThemeProvider>
		)
	}
}
const styles = {
	button: {
		margin: 15
	}
};
const mapStateToProps = (state, ownProps) => {
	console.log('state', state);
	return {
		...ownProps,
		error1: state.loginReducer.error,
		isFetching: state.submitUserData.isFetching,
		isLoginFetching: state.loginReducer.isLoginFetching,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		sendSignupRequest: (signupDetails) => dispatch(submitActions.sendSignupRequest(signupDetails)),
		sendLoginRequest: (loginDetails) => dispatch(loginAction.sendLoginRequest(loginDetails))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));
