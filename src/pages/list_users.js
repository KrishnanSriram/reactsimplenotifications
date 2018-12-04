import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    align: 'center',
  },
  table: {
    minWidth: 600,
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

class ListUsersPage extends Component {

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
    fetch('http://localhost:5000/users')
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

  renderTable = (rows) => {
    const {classes} = this.props;
    return (
      <Paper className={classes.root} style={{margin: 30}}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>ID</CustomTableCell>
              <CustomTableCell>First Name</CustomTableCell>
              <CustomTableCell>Last Name</CustomTableCell>
              <CustomTableCell>DOB</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.id}
                  </CustomTableCell>
                  <CustomTableCell>{row.first_name}</CustomTableCell>
                  <CustomTableCell>{row.last_name}</CustomTableCell>
                  <CustomTableCell>{row.dob}</CustomTableCell>
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
    const rows = this.state.data;
    if(rows.length <= 0) {
      return (
        <div style={{margin: 30}}>
          <Typography variant="h5" component="h3" style={{margin: 10}}>
            Getting list of USERS
          </Typography>
          <Typography component="p" style={{margin: 10}}>
            Loading.......
          </Typography>
        </div>
      )
    }
    return this.renderTable(rows);
  }

}

export default withStyles(styles)(ListUsersPage);
