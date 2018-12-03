import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ErrorPage from './../components/errorpage';
import Title from './../components/title';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1,
  },
});
const public_vapid_key = 'BIqpd1HLEYC2Q_R6vLLPMAL9BdnWNZuX2yD0dL_EdtObQSSSqiwlsQFEOesYQ8EoEUEqmnD25oVoGo0rm9EE9NA';
const private_vapid_key = 'zW4aOIkx-6RcO-ALhc5XrDJKpzqEKZtlu0bCW6ZLkOc';

class TopicsPage extends React.Component {
  state = {
    form: {
      title: null,
      topic: null,
      location: null
    },
    loading: false,
    loadingMessage: 'Loading.......',
    error: null
  };

   urlBase64ToUint8Array =(base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')
    ;
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  }

  textChange = (event) => {
    let { form } = this.state;
    form[event.target.id] = event.target.value;
    this.setState({form: form});
  }

  onSubmit = (event) => {
    event.preventDefault();
    const convertedVapidKey = this.urlBase64ToUint8Array(public_vapid_key);
    this.setState({loading: true, error: null});
    const url = 'http://localhost:5000/topics/add';
    navigator.serviceWorker.ready
    .then((registration) => {
      if (!registration.pushManager) {
        console.log('ERROR: Cannot do any PUSH')
        return;
      }
      registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: convertedVapidKey})
      .then ((subscription) => {
        const body = {title: this.state.form.title, topic: this.state.form.topic, location: this.state.form.location,subscription: subscription}
        console.log(body);
        fetch(url, {method: 'POST',
          headers: {'Content-Type':'application/json', 'Accept':'application/json'},
          body: JSON.stringify(body)})
          .then((response) => {
            console.log('Response from FETCH', response);
            this.setState({loading: false});
            return response.json();
          })
          .then((data) => {
            console.log('Final Data from response is', data);
          })
          .catch((err) => {
            console.log('[Fetch Error] Failed POST', err);
            this.setState({loading: false, error: err});
          });
      })
      .catch(err => { console.log('ERROR: Error with push notification')});
    })
    .catch((err) => {
      console.log('ERROR: Service worker is not ready yet for any PUSH notifications. Sit tight and try later');
      return;
    });

  }

  renderLoadingMessage = () => {
    if(this.state.loading === true) {
      return (
        <Typography variant="subheading" gutterBottom>
          {this.state.loadingMessage}
        </Typography>
      );
    } else {
      return (
        <div></div>
      )
    }
  }

  renderError = () => {
    if(this.state.error == null) {
      return (
        <div></div>
      )
    }
    console.log(this.state.error);
    return (
        <ErrorPage tite="Error in POST"
          description = "So many error, please check error logs for more information" />
    )
  }

  render() {
    const { classes } = this.props;

    return (
        <Paper className={classes.root} elevation={1} style={{ margin: 20 }}>
          <Title heading = "Add a new topic"
            subheading = "Feel free to add any new topic for our discussion(s)" />
          <form className={classes.container} noValidate autoComplete="off">
            <TextField style={{ margin: 8 }} fullWidth margin="normal"
                id="title" label="Title" onChange={this.textChange}/>
            <TextField style={{ margin: 8 }} fullWidth margin="normal"
                id="topic" label="Topic" onChange={this.textChange}/>
            <TextField style={{ margin: 8 }} fullWidth margin="normal"
                id="location" label="Location" onChange={this.textChange}/>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.onSubmit}>
              Add Topic
            </Button>
            <Grid container spacing={24} alignItems="flex-end">
              {this.renderLoadingMessage()}
            </Grid>
            <Grid container spacing={24} alignItems="flex-end">
              {this.renderError()}
            </Grid>
          </form>
        </Paper>
    );
  }
}

TopicsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicsPage);
