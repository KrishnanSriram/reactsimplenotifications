import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 30,
  },
  gridList: {
    width: 300,
    height: 750,
  }
});


class AboutPage extends Component {

  constructor(props) {
    super(props);

  }

  renderCard = () => {
    const classes = this.props;
    return (
      <GridList cellHeight={340} style={{margin: 30, border: 0}} className={classes.gridList} cols={3}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="140"
              image="https://developers.google.com/web/fundamentals/images/web-comp.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Web Components
              </Typography>
              <Typography component="p">
                Web Components are a new set of standards which let you create your own HTML elements. You can use them to build anything, from simple UI elements, to entire applications.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>

        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="140"
              image="https://developers.google.com/web/fundamentals/images/pay-req.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Payment Request API
              </Typography>
              <Typography component="p">
                The Payment Request API is a W3C standard candidate meant to eliminate checkout forms. It improves the purchase process, provides a more consistent user experience and allows you to easily leverage different payment methods.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>

        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="140"
              image="https://developers.google.com/web/fundamentals/images/cred-mgt.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Credential Management API
              </Typography>
              <Typography component="p">
                The Credential Management API is a standards-based browser API that provides a programmatic interface between the site and the browser for seamless sign-in across devices.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </GridList>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{margin: 30}}>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          About Page.
        </Typography>
        <Typography component="p">
          This is a simple ABOUT page!
        </Typography>
      </Paper>
      <Typography variant="h5" component="h3">
        What's hot?
      </Typography>
      {this.renderCard()}
    </div>
    );
  }

}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutPage);
