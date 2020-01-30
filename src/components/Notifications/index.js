import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { messageActions } from '../../actions';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { connect } from 'react-redux';

class Notifications extends Component {
	constructor(props){
		 super(props);
		 this.state = {
			showInline: true
		 }
	}

	exitInlineMessage = () => {
		let msgObj = {
			message:'',
			severity:'',
			show:false
		}
		this.props.hidemsg(msgObj)
	}

	render(){
		setTimeout(()=>{
			let msgObj = {
				message:'',
				severity:'',
				show:false
			}
			this.props.hidemsg(msgObj)
		},3000)

    return (
			<Snackbar
			anchorOrigin={{
			vertical: 'top',
			horizontal: 'center',
			}}
			// open={open}
			autoHideDuration={1000}
			// onClose={handleClose}
			>
				<SnackbarContent
				// onClose={handleClose}
				variant={this.props.theme}
				message={this.props.message}
				/>
			</Snackbar>
		 );
	}
}

Notifications.propTypes = {
	theme: PropTypes.string.isRequired,
	message: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		hidemsg: (msgObj) => dispatch(messageActions.hideMessage(msgObj))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);