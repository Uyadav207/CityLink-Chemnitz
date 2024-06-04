'use client';

import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapControl,
  ControlPosition,
  Pin,
} from '@vis.gl/react-google-maps';
import {
  schule,
  Schulsozialarbeit,
  Jugendberufshilfe,
  Kindertageseinrichtungen,
} from '../../api/apiConfig';
import calculateDistance from './Distance';
import Sidebar from '../../components/Sidebar';
import AddressDropDown from '../../components/Sidebar/AddressDropDown';
import convertHomeAddress from './ConvertAddress';
import useDataStore from '@/app/store/mapStore';
import mapApiUri from '../../api/mapApi';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Feature {
  geometry: { y: number; x: number };
  attributes: { [key: string]: any };
}

interface HomeAddress {
  id: number;
  name: string;
}

const userData: any = localStorage.getItem('user') || '';
const user = JSON.parse(userData);
const addresses = convertHomeAddress(user.addresses);
const homeAddress: HomeAddress[] = addresses;

const apiKey = 'AIzaSyBVXnBh_mZfwQDtubQkMtLOZJvw4GM5fnc';

const getGeocode = async (address: string, apiKey: string) => {
  const response = await fetch(mapApiUri(address, apiKey));
  const data = await response.json();
  if (data.status === 'OK') {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  } else {
    throw new Error('Geocoding failed');
  }
};

const App: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [api, setApi] = useState<string>(Jugendberufshilfe);
  const [info, setInfo] = useState<{ [key: string]: any }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>(homeAddress[0].name);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const { setData } = useDataStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setFeatures(data.features);
        setData(data.features);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    handleGeocode(address);
  }, [api, address]);

  // Call api from the external services
  // Add the api response to a new object
  // Add the distance calculated from the current location to the new Object
  // Store the new obj to the zustand store dataAPi and populate ever where

  const showInfoOnClick = (
    obj: { [key: string]: any },
    geometry: { [key: string]: any }
  ) => {
    const distance: any = calculateDistance(
      geometry.y,
      geometry.x,
      coordinates!.lat,
      coordinates!.lng
    ).toFixed(2);
    setInfo({ ...obj, distance });
    setIsModalOpen(true);
  };

  const handleApiTrigger = (requestedAPI: string) => {
    setApi(requestedAPI);
  };

  const handleGeocode = async (address: string) => {
    try {
      const coords: Coordinates = await getGeocode(address, apiKey);
      setCoordinates(coords);
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  const handleClickGeolocation = (addressName: string) => {
    setAddress(addressName);
  };

  return (
    <div className="flex">
      <Sidebar />
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: '100vw', height: '100vh', borderRadius: 10 }}
          defaultCenter={{ lat: 50.827847, lng: 12.92137 }}
          defaultZoom={12}
          gestureHandling="greedy"
          disableDefaultUI={true}
          mapId="bd61128fe6c5f1e5"
        >
          <MapControl position={ControlPosition.TOP_CENTER}>
            <div className="flex p-2 justify-between space-x-4">
              <button
                className="btn shadow-md"
                onClick={() => handleApiTrigger(schule)}
              >
                schule
              </button>
              <button
                className="btn shadow-md"
                onClick={() => handleApiTrigger(Schulsozialarbeit)}
              >
                Schulsozialarbeit
              </button>
              <button
                className="btn shadow-md"
                onClick={() => handleApiTrigger(Kindertageseinrichtungen)}
              >
                Kindertageseinrichtungen
              </button>
              <button
                className="btn shadow-md"
                onClick={() => handleApiTrigger(Jugendberufshilfe)}
              >
                Jugendberufshilfe
              </button>
            </div>
          </MapControl>

          <MapControl position={ControlPosition.BOTTOM_CENTER}>
            <div className="flex p-2 justify-between space-x-4">
              <AddressDropDown>
                {homeAddress.map((item) => (
                  <li key={item.id} className="menu-title">
                    <button
                      onClick={() => handleClickGeolocation(item.name)}
                      className="flex items-center space-x-2"
                    >
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </AddressDropDown>
            </div>
          </MapControl>

          {features.map((feature) => (
            <AdvancedMarker
              key={feature.attributes.OBJECTID}
              position={{
                lat: feature.geometry.y,
                lng: feature.geometry.x,
              }}
              onClick={() =>
                showInfoOnClick(feature.attributes, feature.geometry)
              }
            ></AdvancedMarker>
          ))}
          {coordinates && (
            <AdvancedMarker
              position={{
                lat: coordinates.lat,
                lng: coordinates.lng,
              }}
            >
              <Pin
                background={'#FBBC04'}
                glyphColor={'#000'}
                borderColor={'#000'}
              />
            </AdvancedMarker>
          )}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg">
                <h2>Attributes:</h2>
                {Object.entries(info).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
                <button className="btn" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default App;
