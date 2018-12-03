import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TopicsPage from './topics';
import ListTopicsPage from './list_topics';

const styles = {
  root: {
    flexGrow: 1,
    margin: 20,
  },
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class TopicsTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="New" />
          <Tab label="Current Topics" />
        </Tabs>
      </Paper>
      {this.state.value === 0 && <TabContainer><TopicsPage /></TabContainer>}
      {this.state.value === 1 && <TabContainer><ListTopicsPage /></TabContainer>}
      </Fragment>
    );
  }
}

TopicsTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicsTab);
