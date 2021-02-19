import React, { useState } from 'react';
import {
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Table,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';

import { useStyles } from '../style';
import DeleteProfileModal from './DeleteProfileModal';
import Success from '../../../utility/success';
import Error from '../../../utility/error';

const TabProfile = (props) => {
  const [modal, setModal] = useState(false);
  const [snackSuccess, setSnackSuccess] = useState(false);
  const [snackFailed, setSnackFailed] = useState(false);
  const classes = useStyles();
  const profileSummary = [
    { name: 'Your Id', value: props.userData.attributes.sub },
    { name: 'Username', value: props.userData.username },
    { name: 'Email', value: props.userData.attributes.email, action: 'edit' },
    { name: 'Phone Number', value: props.userData.attributes.phone_number },
    { name: 'Delete Profile', value: 'delete', action: 'delete' },
  ];

  return (
    <TableContainer className={classes.tableContainer}>
      <Success
        message='Profile Deleted!'
        snackSuccess={snackSuccess}
        setSnackSuccess={setSnackSuccess}
      />
      <Error
        message='Failed, try again!'
        snackFailed={snackFailed}
        setSnackFailed={setSnackFailed}
      />
      <DeleteProfileModal
        modal={modal}
        setModal={setModal}
        setSnackSuccess={setSnackSuccess}
        setSnackFailed={setSnackFailed}
      />
      <h3>PROFILE SUMMARY</h3>
      <Table>
        <TableBody>
          {profileSummary.map((row) => (
            <TableRow key={row.name}>
              <TableCell align='left'>{row.name}</TableCell>
              <TableCell align='left'>{row.value}</TableCell>
              {row.action ? (
                <TableCell align='right'>
                  <Button onClick={() => setModal(true)}>{row.action}</Button>
                </TableCell>
              ) : (
                <TableCell align='right'></TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
  };
};

export default connect(mapStateToProps)(TabProfile);
