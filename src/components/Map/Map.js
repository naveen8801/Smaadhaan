import React, { useState, useEffect } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import mapStyles from './mapStyles';
import axios from 'axios';
// var obj =[];

// const Data = () => {

//   axios
//     .get("https://smaadhaan-server-interested-eland-ls.eu-gb.mybluemix.net/api/all-data")
//     .then(res => {
//     // console.log(res.data.userLocations);

//         obj = res.data.userLocations;

//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// Data();

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [mapdata, setdatamap] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://smaadhaan-server-interested-eland-ls.eu-gb.mybluemix.net/api/all-data'
      )
      .then((res) => {
        const obj = res.data.userLocations;
        setdatamap(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedPark(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);
  return (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: 28.7041, lng: 77.1025 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {mapdata.map((data) => (
        <Marker
          // key={park.properties.PARK_ID}
          position={{
            lat: parseFloat(data.lat),
            lng: parseFloat(data.long),
          }}
          onClick={() => {
            setSelectedPark(data);
          }}
          icon={{
            url: `/image2.jpg`,
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      ))}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAiPFta9tA8MUawfQtZgCrqQRf84Mcqvl0`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
