import React from 'react';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';

// Components
import BottomNavbar from './components/BottomNavbar';
import MenuDisplay from './components/MenuDisplay';
import CartDisplay from './components/CartDisplay';
import BillDisplay from './components/BillDisplay';

// Reduxt
import { useSelector } from 'react-redux';

const Menu = () => {
  const storeMenuIndex = useSelector((state) => state.layout.storeMenuIndex);
  return (
    <React.Fragment>
      {storeMenuIndex === 0 && <MenuDisplay />}
      {storeMenuIndex === 1 && <CartDisplay />}
      {storeMenuIndex === 2 && <BillDisplay />}
      <BottomNavbar />
    </React.Fragment>
  );
};

export default Menu;
