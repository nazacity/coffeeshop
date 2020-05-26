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
}) => {
  const { isLoaded } = useLoadScript({
    id: 'script-loader',
    version: 'weekly',
    googleMapsApiKey: 'AIzaSyD6UW4vd1s7ag_bOxbb6UjdbRpxQUN8ws8',
    language: 'th',
    region: 'th',
  });

  const matches1024down = useMediaQuery('(max-width:1024px)');

  const [center, setCenter] = useState();
  const [position, setPosition] = useState();
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
                setDistance(response.rows[0].elements[0].distance);
                setMove(false);
              }
            }}
          />
        }
      </GoogleMap>
    );
  };

  return isLoaded ? <div>{renderMap()}</div> : 'loading';
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GoogleMapComponent);
