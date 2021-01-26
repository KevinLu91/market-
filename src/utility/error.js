import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Error = ({ errors, open, setOpen }) => {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        {errors.map((err, i) => (
          <Alert key={i} severity='error' onClose={() => setOpen(false)}>
            {err.message}
          </Alert>
        ))}
      </Snackbar>
    </>
  );
};

export default Error;
