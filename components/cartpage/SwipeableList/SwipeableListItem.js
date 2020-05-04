import React, { useEffect, useRef, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Redux
import { useDispatch } from 'react-redux';
import { deleteUserCart } from '../../../redux/actions/userActions';

// Next
import Head from 'next/head';
import route from 'next/router';

// MUI
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_DELETECART } from '../../../apollo/mutation';
import { QUERY_USER } from '../../../apollo/query';

const SwipeableListItem = ({
  background,
  children,
  onSwipe,
  threshold,
  cartItemId,
}) => {
  let listElement;
  const wrapper = useRef();
  let background1;

  let dragStartX = 0;
  let left = 0;
  let dragged = false;

  let startTime;
  let fpsInterval = 1000 / 60;

  useEffect(() => {
    window.addEventListener('mouseup', onDragEndMouse);
    window.addEventListener('touchend', onDragEndTouch);

    return () => {
      window.removeEventListener('mouseup', onDragEndMouse);
      window.removeEventListener('touchend', onDragEndTouch);
    };
  }, []);
  const action = useDispatch();
  const [deleteCart, { loading, error }] = useMutation(MUTATION_DELETECART, {
    onCompleted: (data) => {
      action(deleteUserCart(data.deleteCart.cartItemId));
      route.reload();
    },
  });

  const handleDelete = async () => {
    try {
      await deleteCart({
        variables: {
          id: cartItemId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDragStartMouse = (evt) => {
    onDragStart(evt.clientX);
    window.addEventListener('mousemove', onMouseMove);
  };

  const onDragStartTouch = (evt) => {
    const touch = evt.targetTouches[0];
    onDragStart(touch.clientX);
    window.addEventListener('touchmove', onTouchMove);
  };

  const onDragStart = (clientX) => {
    dragged = true;
    dragStartX = clientX;
    listElement.className = 'ListItem';
    startTime = Date.now();
    requestAnimationFrame(updatePosition);
  };

  const onDragEndMouse = (evt) => {
    window.removeEventListener('mousemove', onMouseMove);
    onDragEnd();
  };

  const onDragEndTouch = (evt) => {
    window.removeEventListener('touchmove', onTouchMove);
    onDragEnd();
  };

  const onDragEnd = () => {
    if (dragged) {
      dragged = false;

      const threshold1 = threshold || 0.5;

      if (left < listElement.offsetWidth * threshold1 * -1) {
        left = -listElement.offsetWidth * 2;
        wrapper.current.style.maxHeight = 0;
        listElement.className = 'BouncingListItem';
        listElement.style.transform = `translateX(${left}px)`;
        onSwiped();
        handleDelete();
      } else {
        left = 0;
        listElement.className = 'BouncingListItem';
        listElement.style.transform = `translateX(${left}px)`;
      }
    }
  };

  const onMouseMove = (evt) => {
    const left1 = evt.clientX - dragStartX;
    if (left1 < 0) {
      left = left1;
    }
  };

  const onTouchMove = (evt) => {
    const touch = evt.targetTouches[0];
    const left1 = touch.clientX - dragStartX;
    if (left1 < 0) {
      left = left1;
    }
  };

  const updatePosition = () => {
    if (dragged) requestAnimationFrame(updatePosition);

    const now = Date.now();
    const elapsed = now - startTime;

    if (dragged && elapsed > fpsInterval) {
      listElement.style.transform = `translateX(${left}px)`;

      const opacity = (Math.abs(left) / 100).toFixed(2);
      if (opacity < 1 && opacity.toString() !== background1.style.opacity) {
        background1.style.opacity = opacity.toString();
      }
      if (opacity >= 1) {
        background1.style.opacity = '1';
      }

      startTime = Date.now();
    }
  };

  const onClicked = () => {
    if (onSwipe) {
      onSwipe();
    }
  };

  const onSwiped = () => {
    if (onSwipe) {
      onSwipe();
    }
  };

  const BouncingListItem = {
    transition: 'transform 0.5s ease-out',
    width: '100%',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
  };

  const ListItem = {
    width: '100%',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="/styles/SwipeableListItem.css"
        />
      </Head>
      <div
        className="Wrapper"
        ref={wrapper}
        style={{
          position: 'relative',
          transition: 'max-height 0.5s ease',
          maxHeight: '1000px',
          transformOrigin: 'top',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div
          ref={(div) => (background1 = div)}
          className="Background"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: -1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',

            paddingRight: '16px',
            color: 'white',
            backgroundColor: '#c21414',
            boxSizing: 'border-box',
          }}
        >
          {background ? (
            background
          ) : (
            <ListItemIcon>
              <DeleteIcon style={{ color: '#fff' }} />
            </ListItemIcon>
          )}
        </div>
        <div
          onClick={onClicked}
          ref={(div) => (listElement = div)}
          onMouseDown={onDragStartMouse}
          onTouchStart={onDragStartTouch}
          className="ListItem"
          style={dragged ? ListItem : BouncingListItem}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SwipeableListItem;
