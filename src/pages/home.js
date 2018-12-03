import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Jumbotron from './../components/jumbotron';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 30,
  },
});


class HomePage extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Jumbotron />
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            Home Page.
          </Typography>
          <Typography component="p">
            This is a simple Home page!
          </Typography>
        </Paper>
      </div>
    );
  }

}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
