import React from 'react';

// MUI
import Typography from '@material-ui/core/Typography';

// Redux
import { useSelector } from 'react-redux';

const Bill = () => {
  return (
    <React.Fragment>
      <div>
        <Typography variant="h4" align="center">
          รายการอาหาร
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default Bill;
