import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
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

class DaysTab extends React.Component {
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
            <Tab label="Mon" />
            <Tab label="Tue" />
            <Tab label="Wed" />
            <Tab label="Thur" />
            <Tab label="Fri" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><span><b>MONDAY</b>
        </span>
        </TabContainer>}
        {value === 1 && <TabContainer><span><b>TUESDAY</b>
        </span></TabContainer>}
        {value === 2 && <TabContainer><span><b>WEDNESDAY</b>
        </span></TabContainer>}
        {value === 3 && <TabContainer><span><b>THURSDAY</b>
        </span></TabContainer>}
        {value === 4 && <TabContainer><span><b>FRIDAY</b>
        </span></TabContainer>}
      </div>
    );
  }
}

export default withStyles(styles)(DaysTab);