import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Shuttle from './shuttle';
import RecentRides from './recentRides';
import './Tab.css'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
const styles = theme => ({
  root: {
    flexGrow: 1,
				backgroundColor: theme.palette.background.paper,
  },
});

class CenteredTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className = "tab-bar">
          <Tabs  value={value} onChange={this.handleChange} className = "parent-container" indicatorColor="primary" centered >
            <Tab label="Available Rides" />
            <Tab label="Shuttle Rides" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><RecentRides/></TabContainer>}
        {value === 1 && <TabContainer><Shuttle/></TabContainer>}
      </div>
    );
  }
}

export default withStyles(styles)(CenteredTabs);