import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
  DistanceMatrixService,
} from '@react-google-maps/api';
import { geolocated } from 'react-geolocated';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.primary.dark,
    position: 'absolute',
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
  },
}));

const options = {
  streetViewControl: false,
  rotateControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

const BranchCircle = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.1,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 10000,
  zIndex: 1,
};

const GoogleMapComponent = ({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
  branchPosition,
  setDistance,
  setCenter,
  center,
}) => {
  const { isLoaded } = useLoadScript({
    id: 'script-loader',
    version: 'weekly',
    googleMapsApiKey: 'AIzaSyD6UW4vd1s7ag_bOxbb6UjdbRpxQUN8ws8',
    language: 'th',
    region: 'th',
  });
  const classes = useStyles();
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const matches600down = useMediaQuery('(max-width:600px)');

  const [position, setPosition] = useState({
    lat: 100,
    lng: 100,
  });
  const [move, setMove] = useState(false);

  useEffect(() => {
    if (isGeolocationAvailable) {
      if (isGeolocationEnabled) {
        if (coords) {
          setCenter({
            lat: coords.latitude,
            lng: coords.longitude,
          });
          setPosition({
            lat: coords.latitude,
            lng: coords.longitude,
          });
        }
      }
    }
  }, [coords]);

  useEffect(() => {
    setMove(true);
  }, [branchPosition]);

  const renderMap = () => {
    return (
      <GoogleMap
        options={options}
        mapContainerStyle={{
          height: matches1024down ? '200px' : '300px',
          width: '100%',
        }}
        zoom={15}
        center={center}
      >
        {
          <Marker
            position={{ lat: +branchPosition?.lat, lng: +branchPosition?.lng }}
            icon="./icons/location.png"
            zIndex={1}
          />
        }
        {
          <Marker
            draggable={true}
            position={position}
            onDragEnd={(e) => {
              setPosition({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              });
              setMove(true);
            }}
            zIndex={2}
          />
        }
        {
          <Circle
            center={{ lat: +branchPosition?.lat, lng: +branchPosition?.lng }}
            options={BranchCircle}
          />
        }
        {
          <DistanceMatrixService
            options={{
              origins: [
                { lat: +branchPosition?.lat, lng: +branchPosition?.lng },
              ],
              destinations: [position],
              travelMode: 'DRIVING',
              region: 'th',
            }}
            callback={(response, status) => {
              if (move) {
                if (response?.rows[0]?.elements[0]?.distance) {
                  setDistance(response.rows[0].elements[0].distance);
                }
                setMove(false);
              }
            }}
          />
        }
      </GoogleMap>
    );
  };

  return isLoaded ? (
    <div>{renderMap()}</div>
  ) : (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={matches600down ? 60 : 120}
        thickness={4}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={matches600down ? 60 : 120}
        thickness={4}
      />
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GoogleMapComponent);
