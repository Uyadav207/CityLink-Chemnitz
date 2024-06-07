import React from 'react';

const index = () => {
  return (
    <Map
      initialViewState={{
        latitude: 50.827847,
        longitude: 12.92137,
        zoom: 14,
      }}
      style={{ width: '100vw', height: '100vh', borderRadius: 10 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      ref={mapRef}
    >
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        <div className="flex p-2 justify-between space-x-4">
          <button
            className="flex-1 btn bg-white shadow-l"
            onClick={() => handleApiTrigger('schule')}
          >
            schule
          </button>
          <button
            className="flex-1 btn bg-white shadow-l"
            onClick={() => handleApiTrigger('Schulsozialarbeit')}
          >
            Schulsozialarbeit
          </button>
          <button
            className="flex-1 btn bg-white shadow-l"
            onClick={() => handleApiTrigger('Kindertageseinrichtungen')}
          >
            Kindertageseinrichtungen
          </button>
          <button
            className="flex-1 btn bg-white shadow-l"
            onClick={() => handleApiTrigger('Jugendberufshilfe')}
          >
            Jugendberufshilfe
          </button>
        </div>
      </div>
      {features.map((feature) => (
        <Marker
          longitude={feature.geometry.x}
          latitude={feature.geometry.y}
          onClick={() => handleFly(feature.geometry.x, feature.geometry.y)}
          color="red"
        />
        //  <AdvancedMarker
        //     key={feature.attributes.OBJECTID}
        //     position={{
        //       lat: feature.geometry.y,
        //       lng: feature.geometry.x,
        //     }}
        //     onClick={() => showInfoOnClick(feature.attributes)}
        //   ></AdvancedMarker>
      ))}
    </Map>
  );
};

export default index;
