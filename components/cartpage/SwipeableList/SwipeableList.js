import React from 'react';

const SwipeableList = ({ children, background }) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!child.props.background) {
      return React.cloneElement(child, { background: background });
    }
    return <>{child}</>;
  });
  return (
    <>
      <div className="List" style={{ flex: 1, width: '100%', height: '100%' }}>
        {childrenWithProps}
      </div>
    </>
  );
};

export default SwipeableList;
