import React, { useEffect } from 'react';

// MUI
import Typography from '@material-ui/core/Typography';

// Redux
import { useSelector } from 'react-redux';

// Components
import BillDisplay from './components/BillDisplay';

const Bill = ({ setShouldRefresh, placeFromId }) => {
  useEffect(() => {
    setShouldRefresh(true);
  }, []);
  return (
    <React.Fragment>
      <BillDisplay placeFromId={placeFromId} />
    </React.Fragment>
  );
};

export default Bill;
