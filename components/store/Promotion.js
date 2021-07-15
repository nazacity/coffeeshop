import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Promotion = () => {
  return (
    <AutoPlaySwipeableViews enableMouseEvents>
      <div style={{ backgroundColor: 'tomato', height: '100vh' }}>
        <img
          src="./images/promotion/1.jpg"
          alt="1"
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      <div style={{ backgroundColor: 'orange', height: '100vh' }}>
        <img
          src="./images/promotion/2.jpg"
          alt="1"
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      <div style={{ backgroundColor: 'orchid', height: '100vh' }}>
        <img
          src="./images/promotion/3.jpg"
          alt="1"
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </AutoPlaySwipeableViews>
  );
};

export default Promotion;
