import React from 'react';

// Components
import BillDisplay from './components/BillDisplay';

const Bill = ({ placeFromId }) => {
  return (
    <React.Fragment>
      <BillDisplay placeFromId={placeFromId} />
    </React.Fragment>
  );
};

export default Bill;
