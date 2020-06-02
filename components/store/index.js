import React, { useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// Components
import BottomNavbar from './components/BottomNavbar';
import MenuDisplay from './components/MenuDisplay';
import CartDisplay from './components/CartDisplay';
import BillDisplay from './components/BillDisplay';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

const Menu = ({ placeFromId }) => {
  const storeMenuIndex = useSelector((state) => state.layout.storeMenuIndex);
  const action = useDispatch();
  const router = useRouter();

  useEffect(() => {
    placeFromId();
  }, []);

  return (
    <React.Fragment>
      {storeMenuIndex === 0 && <MenuDisplay />}
      {storeMenuIndex === 1 && <CartDisplay />}
      {storeMenuIndex === 2 && <BillDisplay placeFromId={placeFromId} />}
      <BottomNavbar />
    </React.Fragment>
  );
};

export default Menu;
