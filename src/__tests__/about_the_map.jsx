import React from 'react';
import {render} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import {LocationMap} from '../LocationMap';

describe ('Map will', () => {
  describe ('while location is unavaliable', () => {
    test ('display error message', () => {
      const {getByText} = renderWithLocation (null, null, false, false);

      getByText ('Your browser does not support Geolocation');
    });
  });
  describe ('while location is disabled', () => {
    test ('display error message', () => {
      const {getByText} = renderWithLocation (null, null, true, false);

      getByText ('Geolocation is not enabled');
    });
  });

  describe ('while location is loading', () => {
    test ('display a loading message', () => {
      const {getByText} = renderWithLocation (null, null, true, true);

      getByText ('Getting the location data…');
    });
  });

  describe ('while location is loaded', () => {
    test ('display a marker', () => {
      const {getByAltText} = renderWithLocation (10, 10);

      getByAltText ('Your location');
    });
  });
});

function renderWithLocation (
  long,
  lat,
  isGeolocationAvailable = true,
  isGeolocationEnabled = true
) {
  let geoProps = {
    coords: null,
    isGeolocationEnabled: isGeolocationEnabled,
    isGeolocationAvailable: isGeolocationAvailable,
    positionError: null,
  };

  if (long) {
    geoProps.coords = {
      accuracy: 130,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: long,
      longitude: lat,
      speed: null,
    };
  }

  return render (<LocationMap {...geoProps} />);
}