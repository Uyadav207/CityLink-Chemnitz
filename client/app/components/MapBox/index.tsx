'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

import Map, {
  MapRef,
  Marker,
  GeolocateControl,
  NavigationControl,
  Popup,
} from 'react-map-gl';

import {
  APIProvider,
  // Map,
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
// import Sidebar from '../../components/Sidebar';
// import AddressDropDown from '../../components/Sidebar/AddressDropDown';
import convertHomeAddress from '@/app/dashboard/citylink/ConvertAddress';
import useDataStore from '@/app/store/mapStore';
import mapApiUri from '../../api/mapApi';
import useUserStore from '@/app/store/userStore';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoibml0aGluOTgiLCJhIjoiY2x4M3htNGtzMDRiYTJrc2tjanpoNThjaiJ9.wvjEaRDwUKVO6sJrYuoqLA'; // Set your mapbox token here

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

const MapBox = () => {
  const mapRef = useRef<MapRef>();
  const [showPopup, setShowPopup] = useState<boolean>(true);
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

  const popupRef = useRef<mapboxgl.Popup>();

  useEffect(() => {
    popupRef.current?.trackPointer();
  }, [popupRef.current]);

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
      const coords: Coordinates = await getGeocode(address, apiKey);
      setCoordinates(coords);
      setHomeCoords(coords);
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  const handleClickGeolocation = (addressName: string) => {
    setAddress(addressName);
  };

  const onSelectCity = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  }, []);

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
        {/* <div className="flex p-2 justify-between space-x-4">
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
        </div> */}
      </div>
      {features.map((feature) => (
        <Marker
          longitude={feature.geometry.x}
          latitude={feature.geometry.y}
          onClick={() => {
            onSelectCity({
              longitude: feature.geometry.x,
              latitude: feature.geometry.y,
            });
          }}
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
      <GeolocateControl />
      <NavigationControl />
      {/* {showPopup && (
        <Popup longitude={12.92137} latitude={50.827847} ref={popupRef}>
          You are here
        </Popup>
      )} */}
    </Map>
  );
};

export default MapBox;
