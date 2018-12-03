import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1,
  },
});

const ErrorPage = (props) => {
  const {classes} = props;
  return (
    <Paper className={classes.root} elevation={1} style={{ margin: 30 }}>
      <Typography variant="h5" component="h3">
        {props.title}
      </Typography>
      <Typography component="p">
        {props.description}
      </Typography>
    </Paper>
  );
}

ErrorPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default withStyles(styles)(ErrorPage);
