import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './OfferARide.css'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { bookRideActions } from './../actions';
import { withRouter } from 'react-router-dom';
import { publishActions, finalPublish } from './../actions';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import StarRatingComponent from 'react-star-rating-component';
import Feedback  from './feedback';



const styles = theme => ({
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

});

export class Success extends Component {
	constructor() {
		super();

		this.state = {
			rating: 1,
			rating_half_star:3
		};
	}
	// onStarClick(nextValue, prevValue, name) {
  //   this.setState({rating_half_star: nextValue});
  // }

	// onStarClickHalfStar(nextValue, prevValue, name, e) {
  //   const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

  //   if (xPos <= 0.5) {
  //     nextValue -= 0.5;
  //   }

  //   console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
  //   // console.log(e);
  //   this.setState({rating_half_star: nextValue});
  // }
	// handleFeedBack(e,rating_half_star,comment){
	// 	e.preventDefault()
	// 	console.log(e,rating_half_star,comment)
	// 	// this.props.sendFeedback()
	// }
	// handleComment(e){
	// 	e.preventDefault()
	// 	this.setState({comment:e.target.value})
	// 	console.log(e.target.value)
	// }
	// gotoMainPage(e) {
	// 	this.props.history.push('/home')
	// }
	// backButton = () => {
	// 	this.props.history.push('/home')
	// }

	logout = () => {
		// this.props.history.push('/')
		localStorage.clear();
		window.location.href = '/';
	}

	goToBackScreen = (e) => {
		this.props.history.push('/home')
	}

	render() {
		const { rating } = this.state;
		const { classes } = this.props;
		let user = localStorage.getItem('user');
		let userEmail = JSON.parse(user)
		console.log(userEmail.email)
		let userName = JSON.parse(user)
		console.log('userName.name', userName.name)
		return (
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar> <Typography variant="h6" color="white" className={classes.grown} > <span className="cursor" onClick={(e) => this.goToBackScreen(e)}>PariVahan </span></Typography>
						<Typography variant="h6" color="white" className={classes.grow}>
							Welcome: {userName.name}
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
					<div className='success-msg'>
					<h1>Thank You For Your Submission</h1>
					<p>You will get an email and sms with further instructions</p>				
					<Feedback
					basePage = {'success'}
					/>
					</div>
				</React.Fragment>
			</MuiThemeProvider>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return {
		...ownProps,
		userName: state.bookRideReducer.userName,
	}
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendFeedback: (feedback) => dispatch(feedback.accpetingOfferRequest(feedback))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Success)));  
