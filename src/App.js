import React, { Component } from 'react';
import './App.css';
import Demo from './location';
import Map from './Map';

class App extends Component {
  state = {
    markersData: [
      { latLng: { lat: 49.8419, lng: 24.0315 }, title: 1 }
    ]
  };
  addMarker = () => {
    const { markersData } = this.state;
    const lastMarker = markersData[markersData.length - 1];

    this.setState({
      markersData: [
        ...markersData,
        {
          title: +lastMarker.title + 1,
          latLng: {
            lat: lastMarker.latLng.lat + 0.0001,
            lng: lastMarker.latLng.lng + 0.0001,
          }
        }
      ]
    });
  };
  render() {
    const { markersData } = this.state;
    return (
      <div>
        <Map markersData={markersData} />
        <button
          onClick={this.addMarker}
        >
          Add marker
        </button>
        <ul>Markers data:
          {markersData.map(marker => (
            <li key={marker.title}>
              {marker.title},
              lat: {marker.latLng.lat},
              lng: {marker.latLng.lng},
            </li>
          ))}
        </ul>
        <Demo />
      </div>
    );
  }
}

export default App;