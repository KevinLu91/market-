import React from 'react';
import { Typography, Box, LinearProgress } from '@material-ui/core';

const UploadBar = ({ value }) => {
  return (
    <>
      {value > 0 && (
        <Box display='flex' alignItems='center' style={{ marginTop: '0.5rem' }}>
          <Box width='100%' mr={1}>
            <LinearProgress variant='determinate' value={value} />
          </Box>
          <Box minWidth={35}>
            <Typography variant='body2' color='textSecondary'>{`${Math.round(
              value
            )}%`}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UploadBar;
