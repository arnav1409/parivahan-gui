import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RideDetailsDisplay from './RideDetailsDisplay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import AppBar from 'material-ui/AppBar';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { bookRideActions } from './../actions';
import './BookARide.css';
import './OfferARide.css';
import Feedback from './feedback'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';


const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexBasis: '33.33%',
    },
    container: {
		display: 'flex',
		flexDirection: 'row',
   		// justifyContent: 'flex-end',
        flexWrap: 'wrap',
        padding: '10px',
	  },
    column: {
        flexBasis: '33.33%',
        padding: '1%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        flexBasis: '33.33%',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
});


class RideDetails extends Component {
    constructor(props) {
        super(props);

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
        const { classes } = this.props;
        const { fullScreen } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="PariVahan" />
                    <div className="Ride-List-Container">
                        <div classname={classes.root}>
                            <ExpansionPanel defaultExpanded>
                                <ExpansionPanelSummary>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
        							id="standard-textarea"
        							label="START POINT"
       								placeholder="START POINT"
        							className={classes.textField}
        							margin="normal"
                                  />
                                    <TextField
        							id="standard-textarea"
        							label="END POINT"
       								placeholder="END POINT"
        							className={classes.textField}
        							margin="normal"
                                  />
                                    <TextField
        							id="standard-textarea"
        							label="DATE & TIME"
       								placeholder="DATE & TIME"
        							className={classes.textField}
        							margin="normal"
                                  />
                                </form>
                                </ExpansionPanelSummary>
                                <RideDetailsDisplay  rideDetails = { this.props.availableRides }/>
                                
                            </ExpansionPanel>
                        </div>
                    </div>
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
const mapStateToProps = ( state ,ownProps )=>{
    console.log(state)
    return{
        ...ownProps,
    }
}
export default connect(mapStateToProps)((withStyles(styles)(RideDetails)));