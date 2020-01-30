import React, { Component } from 'react';
import './OfferARide.css'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { feedbackAction } from './../actions';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import StarRatingComponent from 'react-star-rating-component';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },

});

export class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      rating: 1,
      rating_half_star: 0,
      option:'application'
    };
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating_half_star: nextValue });
  }

  onStarClickHalfStar(nextValue, prevValue, name, e) {
    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }

    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    // console.log(e);
    this.setState({ rating_half_star: nextValue });
  }
  handleFeedBack(e, userObject, rating_half_star, comment,option, basePage) {
    e.preventDefault()
    console.log('basePage=====>', basePage)
    let user_feedback = {
      rating: rating_half_star,
      comment: comment,
      userEmail: userObject.email,
      operation: option
    }
    console.log(user_feedback)
    this.props.sendFeedback(user_feedback)
  }
  gotoMainPage = (e) => {
    this.props.history.push('/home')
  }
  cancelPopUp = (e) => {
    this.props.closePopUp();
  }
  

  handleComment(e) {
    e.preventDefault()
    this.setState({ comment: e.target.value })
    console.log(e.target.value)
  }
  handleOptionChange(event){
    this.setState({
      option:event.target.value
    })
    console.log('drop down',event.target.value)
  }
  render() {
    const basePage = this.props.basePage;
    const { rating } = this.state;
    const { classes } = this.props;
    let user = localStorage.getItem('user');
    let userObject = JSON.parse(user)
    console.log(userObject.email)
    let userName = JSON.parse(user)
    console.log('userName.name', userName.name)
    if (this.props.successFeedbackSubmit) {
      if (basePage === 'appBar') {
        this.cancelPopUp();
      }
      else {
        this.gotoMainPage();
      }
      this.props.clearFeedbackNotification()
    }
    return (
      < form className='feedback-form' onSubmit={(e) => this.handleFeedBack(e, userObject, this.state.rating_half_star, this.state.comment,this.state.option, basePage)
      }>
        <fieldset className>
          <legend style={{ fontWeight: 1000, color: '#000000' }}>Feedback</legend>
          <div style={{ fontSize: 24,padding: '1px',marginBottom: '9px' }}>
            <InputLabel htmlFor="option-simple">Feedback for:- </InputLabel>
            <Select
              value={this.state.option}
              onChange={(event)=>this.handleOptionChange(event)}
              inputProps={{
                name: 'Feedback on:-',
                id: 'option-simple',
              }}
            >             
              <MenuItem value={'application'}>Application</MenuItem>
              <MenuItem value={'offerride'}>Offer Ride</MenuItem>
              <MenuItem value={'bookride'}>Book Ride</MenuItem>
            </Select>
            <br/>
            </div>
            <div style={{ fontSize: 24, padding: '1px'}}>
            <StarRatingComponent
              name="feedback"
              starColor="#ffb400"
              emptyStarColor="#ffb400"
              value={this.state.rating_half_star}
              onStarClick={this.onStarClickHalfStar.bind(this)}
              renderStarIcon={(index, value) => {
                return (
                  <span>
                    <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                  </span>
                );
              }}
              renderStarIconHalf={() => {
                return (
                  <span>
                    <span style={{ position: 'absolute' }}><i className="far fa-star" /></span>
                    <span><i className="fas fa-star-half" /></span>
                  </span>
                );
              }} />
          </div >
          <TextField
            id="outlined-multiline-static"
            label="Comments"
            multiline
            rows="8"
            onChange={(e) => this.handleComment(e)}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          /><br />
          <Button
            type='Submit'
            variant="contained" color="primary"

          >
            Send
    </Button>
          {basePage === 'success' ?
            <span className='feedback-button'>
              <Button

                variant="contained"
                onClick={(e) => this.gotoMainPage(e)}>
                Back
   </Button>

            </span> :
            <span className='feedback-button'>
              <Button

                variant="contained"
                onClick={(e) => this.cancelPopUp(e)}>
                Cancel
  </Button>

            </span>
          }
        </fieldset>
      </form >
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    ...ownProps,
    userName: state.bookRideReducer.userName,
    successFeedbackSubmit: state.feedbackReducer.successMsg
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendFeedback: (user_feedback) => dispatch(feedbackAction.sendFeedback(user_feedback)),
    clearFeedbackNotification: () => dispatch(feedbackAction.clearFeedbackSuccessNotifications())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Feedback)));  