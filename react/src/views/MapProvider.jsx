// src/components/Map.js
import React from 'react';
import { useState,useEffect } from "react";
import { GoogleMap, Marker,InfoWindow , useJsApiLoader } from '@react-google-maps/api';

const Mappro = ({ locations }) => {

  const CustomMarkerContent = () => (
    <div style={{ backgroundColor: 'black', padding: '10px', borderRadius: '50%', color: 'white' }}>
      Hi
    </div>
  );



  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCwGS9fa9mlmR_JElTnO_2lKiNjBr4NFto',
  });

  const mapContainerStyle = {
    width: '100%',
    height: '800px',
  };

  const [center,setCenter] = useState ({
    lat: 37.9706921, // Set the initial center of the map
    lng: -99.3616876,
});
  const [zoom,setZoom] = useState (4.9);

  
  const [selectedMarker, setSelectedMarker] = useState(null);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom} // Set the initial zoom level
    >
      {locations.map((location, index) => (
        <Marker 
        
        key={index}
        position={{ lat: location.LAT, lng: location.LNG }}
        title={location.zip}
       onClick={() => {
        setSelectedMarker(location);
        setZoom(9);
        setCenter(location);
        
      }}
  
     
        />

      ))}
       {selectedMarker && (
       
    <InfoWindow
     
      position={{ lat: selectedMarker.LAT, lng: selectedMarker.LNG }}
      onCloseClick={() => setSelectedMarker(null)}
    >
      <div style={{ backgroundColor: 'green', padding: '10px' }}>
        <h4 style={{ color: 'white' }}>{selectedMarker.name}</h4>
        <p style={{ color: selectedMarker.reserved === 1 ? 'yellow' : 'white' }}>date: {selectedMarker.date}</p>
        <p style={{ color: 'white' }}>dims: {selectedMarker.dims}</p>
        <p style={{ color: 'white' }}>payload: {selectedMarker.payload}</p>
        <p style={{ color: 'white' }}>Phone: {selectedMarker.phone}</p>
        <p style={{ color: 'white' }}>ZipCode: {selectedMarker.zip}</p>
        <p style={{ color: 'white' }}>Address: {selectedMarker.location}</p>
      </div>
    </InfoWindow>
  )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Mappro;
