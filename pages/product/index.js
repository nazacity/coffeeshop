import React from 'react';
import Container from '@material-ui/core/Container';

// Components
import DtProducts from '../../components/productpage/DtProducts';

// MUI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import MbProducts from '../../components/productpage/MbProduct';

const ProductPage = () => {
  const beverageObject = [
    {
      id: 1,
      price: 120,
      name: 'อเมริกาโน่ร้อน',
      pictureUrl: './images/product/drink/1.png',
    },
    {
      id: 2,
      price: 140,
      name: 'เอสเพสโซ่ร้อน',
      pictureUrl: './images/product/drink/2.png',
    },
    {
      id: 3,
      price: 150,
      name: 'ลาเต้เย็น',
      pictureUrl: './images/product/drink/3.png',
    },
    {
      id: 4,
      price: 150,
      name: 'มัทชะลาเต้เย็น',
      pictureUrl: './images/product/drink/4.png',
    },
    {
      id: 5,
      price: '130',
      name: 'อิตาเลียนโซดา ผลไม้รวม',
      pictureUrl: './images/product/drink/5.png',
    },
    {
      id: 6,
      price: '130',
      name: 'อิตลาเลียนโซดา บลูฮาวาย',
      pictureUrl: './images/product/drink/6.png',
    },
  ];

  const foodObject = [
    {
      id: 1,
      price: 120,
      name: 'เบอร์เกอร์เนื้อ',
      pictureUrl: './images/product/food/1.png',
    },
    {
      id: 2,
      price: 140,
      name: 'เบอร์เกอร์ชีทเนื้อ',
      pictureUrl: './images/product/food/2.png',
    },
    {
      id: 3,
      price: 150,
      name: 'แซนวิท',
      pictureUrl: './images/product/food/3.png',
    },
    {
      id: 4,
      price: 150,
      name: 'แซนวิท',
      pictureUrl: './images/product/food/4.png',
    },
    {
      id: 5,
      price: '130',
      name: 'พายแซนวิท',
      pictureUrl: './images/product/food/5.png',
    },
    {
      id: 6,
      price: '130',
      name: 'สเต็กปลา',
      pictureUrl: './images/product/food/6.png',
    },
    {
      id: 7,
      price: '130',
      name: 'สเต็กไก่',
      pictureUrl: './images/product/food/7.png',
    },
  ];

  const sweetObject = [
    {
      id: 1,
      price: 150,
      name: 'เค้กช๊อตโก้',
      pictureUrl: './images/product/sweet/1.png',
    },
    {
      id: 2,
      price: 150,
      name: 'เค้กช๊อตโรส',
      pictureUrl: './images/product/sweet/2.png',
    },
    {
      id: 3,
      price: 150,
      name: 'บิงซูสตอเบอร์รี่',
      pictureUrl: './images/product/sweet/3.png',
    },
    {
      id: 4,
      price: 150,
      name: 'บิงซูมะม่วง',
      pictureUrl: './images/product/sweet/4.png',
    },
  ];

  return (
    <Container maxWidth={false}>
      <Hidden smDown>
        <DtProducts
          beverageObject={beverageObject}
          foodObject={foodObject}
          sweetObject={sweetObject}
        />
      </Hidden>
      <Hidden mdUp>
        <MbProducts
          beverageObject={beverageObject}
          foodObject={foodObject}
          sweetObject={sweetObject}
        />
      </Hidden>
    </Container>
  );
};

export default ProductPage;
