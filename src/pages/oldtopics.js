import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 30,
  },
});


class TopicsPage extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          About Page.
        </Typography>
        <Typography component="p">
          This is a simple TOPICS page!
        </Typography>
      </Paper>
    </div>
    );
  }

}

TopicsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicsPage);
