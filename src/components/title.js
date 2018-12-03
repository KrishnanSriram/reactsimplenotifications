import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';

const Title =  (props) => {
  return (
    <Fragment>
      <Typography variant="h5" component="h3">
        {props.heading}
      </Typography>
      <Typography component="p">
        {props.subheading}
      </Typography>
    </Fragment>
  );
}

Title.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired
};

export default Title;
