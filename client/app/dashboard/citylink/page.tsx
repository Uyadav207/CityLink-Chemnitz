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
import Sidebar from '../../components/Sidebar';
import AddressDropDown from '../../components/Sidebar/AddressDropDown';
import convertHomeAddress from './ConvertAddress';
import useDataStore from '@/app/store/mapStore';
import mapApiUri from '../../api/mapApi';
import useUserStore from '@/app/store/userStore';

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

const App: React.FC = () => {
  const { userData, currentCategory, setCurrentCategory } = useUserStore();

  // const addresses = convertHomeAddress(userData?.addresses) || '';
  let homeAddress: HomeAddress[] = [];

  const [features, setFeatures] = useState<Feature[]>([]);
  const [api, setApi] = useState<string>('');
  const [info, setInfo] = useState<{ [key: string]: any }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [addressList, setAddressList] = useState<HomeAddress[]>([]);

  const apiKey = 'AIzaSyBVXnBh_mZfwQDtubQkMtLOZJvw4GM5fnc';

  const getGeocode = async (address: string, apiKey: string) => {
    try {
      const response = await fetch(mapApiUri(address, apiKey));
      const data = await response.json();
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error('Geocoding failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { setHomeCoords, setData } = useDataStore();

  useEffect(() => {
    if (userData) {
      const addresses = convertHomeAddress(userData?.addresses) || '';
      setAddressList(addresses);
      setAddress(addresses[0]?.name);
      if (currentCategory === 'SCHULE') {
        setApi(schule);
      } else if (currentCategory === 'SCHULSOZIALARBEIT') {
        setApi(Schulsozialarbeit);
      } else if (currentCategory === 'KINDERTAGESEINRICHTUNGEN') {
        setApi(currentCategory);
      } else {
        setApi(currentCategory);
      }
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      if (api) {
        try {
          const response = await fetch(api);
          const data = await response.json();

          setFeatures(data.features);
          setData(data.features);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
    if (address) handleGeocode(address);
  }, [api, address]);

  const showInfoOnClick = (obj: { [key: string]: any }) => {
    setInfo(obj);
    setIsModalOpen(true);
  };

  const handleApiTrigger = (requestedAPI: string) => {
    setApi(requestedAPI);
  };

  const handleGeocode = async (address: string) => {
    try {
      const coords: any = await getGeocode(address, apiKey);
      setCoordinates(coords);
      setHomeCoords(coords);
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
                className="flex-1 btn bg-white shadow-l"
                onClick={() => {
                  handleApiTrigger(schule);
                  setCurrentCategory('SCHULE');
                }}
              >
                schule
              </button>
              <button
                className="flex-1 btn bg-white shadow-l"
                onClick={() => {
                  handleApiTrigger(Schulsozialarbeit);
                  setCurrentCategory('SCHULSOZIALARBEIT');
                }}
              >
                Schulsozialarbeit
              </button>
              <button
                className="flex-1 btn bg-white shadow-l"
                onClick={() => {
                  handleApiTrigger(Kindertageseinrichtungen);
                  setCurrentCategory('KINDERTAGESEINRICHTUNGEN');
                }}
              >
                Kindertageseinrichtungen
              </button>
              <button
                className="flex-1 btn bg-white shadow-l"
                onClick={() => {
                  handleApiTrigger(Jugendberufshilfe);
                  setCurrentCategory('JUGENDBERUFSHILFE');
                }}
              >
                Jugendberufshilfe
              </button>
            </div>
          </MapControl>

          <MapControl position={ControlPosition.BOTTOM_CENTER}>
            <div className="flex p-2 justify-between space-x-4">
              <AddressDropDown>
                {addressList &&
                  addressList.map((item) => (
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
              onClick={() => showInfoOnClick(feature.attributes)}
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
