'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';

import './maps.css';

import convertHomeAddress from '@/app/dashboard/citylink/ConvertAddress';
import useDataStore from '@/app/store/mapStore';
import { mapApiUri } from '../../api/mapApi';
import useUserStore from '@/app/store/userStore';
import SpringModal from '../SpringModal';
import CustomToast from '../CustomToast';
import AddressDropDown from '../Sidebar/AddressDropDown';
import { Loader } from '../Loader';

import {
  schule,
  Schulsozialarbeit,
  Jugendberufshilfe,
  Kindertageseinrichtungen,
} from '../../api/apiConfig';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

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

function ReactGoogleMaps() {
  const [libraries] = useState<any>(['places']);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAVDnjQErU68GKM_8xD2KzUyAeHwnyqq6Y',
    libraries: libraries,
  });

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 50.827847, lng: 12.92137 }),
    []
  );

  const options = useMemo<MapOptions>(
    () => ({
      mapId: '',
      disableDefaultUI: false,
      clickableIcons: true,
      mapTypeControl: true,
      scaleControl: true,
      zoomControl: false,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: true,
    }),
    []
  );

  const {
    userData,
    currentCategory,
    selectedFacility,
    setCurrentCategory,
    setSelectedFacility,
  } = useUserStore();

  const [features, setFeatures] = useState<Feature[]>([]);
  const [api, setApi] = useState<string>('');
  const [info, setInfo] = useState<{ [key: string]: any }>({});
  const [address, setAddress] = useState<string>('');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [addressList, setAddressList] = useState<HomeAddress[]>([]);
  const [directions, setDirections] = useState<DirectionsResult>();

  const apiKey = 'AIzaSyBVXnBh_mZfwQDtubQkMtLOZJvw4GM5fnc';

  const [mapRef, setMapRef] = useState<any>();

  const onLoad = (map: any) => {
    setMapRef(map);
  };

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

  const { setHomeCoords, setData, setLoader } = useDataStore();

  const [currentPosition, setCurrentPosition] = useState<any>(null);

  const fetchDirections = (facility: LatLngLiteral) => {
    if (!currentPosition) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: currentPosition,
        destination: facility,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
          CustomToast({ result: result });
        }
      }
    );
  };

  useEffect(() => {
    if (selectedFacility) {
      const house = {
        lat: selectedFacility.geometry.y,
        lng: selectedFacility.geometry.x,
      };
      fetchDirections(house);
    } else {
      setDirections(undefined);
    }
  }, [selectedFacility]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          setHomeCoords({ lat: latitude, lng: longitude });
          if (mapRef) {
            mapRef?.setZoom(14);
            mapRef?.panTo({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          if (mapRef) {
            mapRef?.setZoom(14);
            mapRef?.panTo({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    }
  }, []);

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
          setLoader(true);
          const response = await fetch(api);
          const data = await response.json();

          setFeatures(data.features);
          setData(data.features);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoader(false);
        }
      }
    };
    fetchData();
  }, [api, address]);

  const showInfoOnClick = (obj: { [key: string]: any }) => {
    setInfo(obj);
    // setIsModalOpen(true);
  };

  const handleApiTrigger = (requestedAPI: string) => {
    setApi(requestedAPI);
  };

  const handleGeocode = async (address: string) => {
    try {
      const coords: any = await getGeocode(address, apiKey);
      setCoordinates(coords);
      setHomeCoords(coords);
      setCurrentPosition(coords);
      mapRef?.setZoom(14);
      mapRef?.panTo(coords);
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  const handleClickGeolocation = (addressName: string) => {
    handleGeocode(addressName);
  };

  const handleMarkerClick = (lat: number, lng: number) => {
    mapRef?.setZoom(14);
    mapRef?.panTo({ lat, lng });
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = (event: any) => {
    event.stopPropagation();
    setIsExpanded(false);
    mapRef?.setZoom(14);
  };

  return !isLoaded ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      <div className="relative map">
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#1976D2',
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {features.map((feature, index) => (
            <Marker
              key={index}
              position={{ lat: feature.geometry.y, lng: feature.geometry.x }}
              // icon={{
              //   url: 'https://cdn-icons-png.flaticon.com/32/2602/2602414.png',
              // }}
              icon={
                currentCategory === 'SCHULE'
                  ? {
                      url: 'https://cdn-icons-png.flaticon.com/32/2602/2602414.png',
                    }
                  : currentCategory === 'SCHULSOZIALARBEIT'
                  ? {
                      url: 'https://cdn-icons-png.flaticon.com/32/3264/3264758.png',
                    }
                  : currentCategory === 'KINDERTAGESEINRICHTUNGEN'
                  ? {
                      url: 'https://cdn-icons-png.flaticon.com/32/1702/1702342.png',
                    }
                  : (currentCategory === 'JUGENDBERUFSHILFE' && {
                      url: 'https://cdn-icons-png.flaticon.com/32/1312/1312511.png',
                    }) ||
                    ''
              }
              onClick={() => {
                handleMarkerClick(feature.geometry.y, feature.geometry.x);
                showInfoOnClick(feature);
                handleExpand();
              }}
            ></Marker>
          ))}

          {currentPosition && (
            <Marker
              position={currentPosition}
              icon={{
                url: 'https://cdn-icons-png.flaticon.com/32/889/889668.png',
              }}
            ></Marker>
          )}

          <div className=" fixed  bottom-0 sm:bottom-10 flex flex-col sm:flex-row  space-x-4 left-1/2 md:left-[55%] transform -translate-x-1/2 -translate-y-1/2 md:w-1/2 text-xs md:text-base">
            <button
              className="flex-1 hover:bg-red-600 hover:text-white rounded-lg  border border-black shadow-2xl bg-white shadow-l text-red-600 font-bold p-2"
              onClick={() => {
                handleApiTrigger(schule);
                setCurrentCategory('SCHULE');
                setSelectedFacility('');
              }}
            >
              Schule
            </button>
            <button
              className="flex-1 hover:bg-blue-600 hover:text-white rounded-lg bg-white border border-black shadow-2xl text-blue-600 font-bold  p-2"
              onClick={() => {
                handleApiTrigger(Schulsozialarbeit);
                setCurrentCategory('SCHULSOZIALARBEIT');
              }}
            >
              Schulsozialarbeit
            </button>
            <button
              className="flex-1 hover:bg-green-600 hover:text-white rounded-lg \ border border-black shadow-2xl bg-white shadow-l text-green-600 font-bold p-2"
              onClick={() => {
                handleApiTrigger(Kindertageseinrichtungen);
                setCurrentCategory('KINDERTAGESEINRICHTUNGEN');
              }}
            >
              Kindertageseinrichtungen
            </button>
            <button
              className="flex-1 hover:bg-violet-600 hover:text-white rounded-lg  border border-black shadow-2xl bg-white shadow-l text-violet-600 font-bold p-2"
              onClick={() => {
                handleApiTrigger(Jugendberufshilfe);
                setCurrentCategory('JUGENDBERUFSHILFE');
              }}
            >
              Jugendberufshilfe
            </button>
          </div>

          <SpringModal
            fetchDirections={fetchDirections}
            info={info}
            isOpen={isExpanded}
            setIsOpen={setIsExpanded}
          />
        </GoogleMap>
        <div className="absolute top-20 md:top-10 left-[40%]  ">
          <AddressDropDown>
            <p
              onClick={() => getCurrentLocation()}
              className="cursor-pointer p-2 hover:font-bold  "
            >
              <span className="mr-2">
                <FontAwesomeIcon size="lg" icon={faCrosshairs} color="black" />
              </span>
              Use current location
            </p>
            {addressList &&
              addressList.map((item) => (
                <li
                  key={item.id}
                  className="menu-title text-black hover:bg-slate-200"
                >
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
      </div>
    </>
  );
}

export default React.memo(ReactGoogleMaps);
