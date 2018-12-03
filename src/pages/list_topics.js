import React, { Component } from 'react';
import Title from './../components/title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class ListTopicsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount = () => {
    this.setState({loading: true, error: null});
    fetch('http://localhost:5000/topics')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('Data from service', data);
      this.setState({loading: false, error: null, data:data });
    })
    .catch((err) => {
      console.log('ERROR: Topics GET service returned error');
      console.log(err);
      this.setState({loading: false, error: err});
    });
  }

  /*
   All table related functions are here
   */




id = 0;
createData = (name, calories, fat, carbs, protein) => {
  this.id += 1;
  return { id: this.id, name, calories, fat, carbs, protein };
}

rows = [
  this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  this.createData('Eclair', 262, 16.0, 24, 6.0),
  this.createData('Cupcake', 305, 3.7, 67, 4.3),
  this.createData('Gingerbread', 356, 16.0, 49, 3.9),
];

  renderTable = () => {
    const {classes} = this.props;
    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Dessert (100g serving)</CustomTableCell>
            <CustomTableCell numeric>Calories</CustomTableCell>
            <CustomTableCell numeric>Fat (g)</CustomTableCell>
            <CustomTableCell numeric>Carbs (g)</CustomTableCell>
            <CustomTableCell numeric>Protein (g)</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.rows.map(row => {
            return (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell numeric>{row.calories}</CustomTableCell>
                <CustomTableCell numeric>{row.fat}</CustomTableCell>
                <CustomTableCell numeric>{row.carbs}</CustomTableCell>
                <CustomTableCell numeric>{row.protein}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    );
  }

/*
Done with table related functions
 */
  render() {
    // return (
    //   <Title heading="List of Topics" subheading="All topics are current and updated" />
    // );
    return this.renderTable();
  }

}

export default withStyles(styles)(ListTopicsPage);
