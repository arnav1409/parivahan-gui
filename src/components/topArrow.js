import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
  blueAvatar: {
    margin: 10,
    marinBottom: 10,
    color: '#fff',
    backgroundColor: blue[600],
  },
};

class IconAvatars extends Component {
render(){
  const { classes } = this.props;
  return (
    <Grid  justify="left">
      <Avatar className={classes.blueAvatar}>
      <img src="/assets/topArrow.svg" alt="loading" />
      </Avatar>
    </Grid>
  );
}
}

IconAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconAvatars);