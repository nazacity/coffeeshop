import React from 'react';
import Carousel from 're-carousel';

const Promotion = (state) => {
  return (
    <div style={{ height: '100vh', zIndex: -1 }}>
      {state === 'Open' && (
        <Carousel loop auto>
          <div style={{ backgroundColor: 'tomato', height: '100%' }}>
            <img
              src="./images/promotion/1.jpg"
              alt="1"
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <div style={{ backgroundColor: 'orange', height: '100%' }}>
            <img
              src="./images/promotion/2.jpg"
              alt="1"
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <div style={{ backgroundColor: 'orchid', height: '100%' }}>
            <img
              src="./images/promotion/3.jpg"
              alt="1"
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default Promotion;
