import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsTabs from './settings_tab';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 30,
  },
});


class SettingsPage extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Settings Page.
        </Typography>
        <Typography component="p">
          This is SETTINGS page!
        </Typography>
      </Paper>
      <SettingsTabs />
    </div>
    );
  }

}

SettingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SettingsPage);
