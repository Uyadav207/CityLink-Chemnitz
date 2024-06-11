'use client';

import { useLoadScript } from '@react-google-maps/api';

import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

import {
  schule,
  Schulsozialarbeit,
  Jugendberufshilfe,
  Kindertageseinrichtungen,
} from '../../api/apiConfig';

import './maps.css';
import convertHomeAddress from '@/app/dashboard/citylink/ConvertAddress';
import useDataStore from '@/app/store/mapStore';
import { mapApiUri } from '../../api/mapApi';
import useUserStore from '@/app/store/userStore';
import SpringModal from '../SpringModal';
import CustomToast from '../CustomToast';
import AddressDropDown from '../Sidebar/AddressDropDown';

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
      //   scrollwheel: false,
      //   zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      zoomControl: false,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: true,
      //   draggable: false,
      //   keyboardShortcuts: false,
    }),
    []
  );

  const [showPopup, setShowPopup] = useState<boolean>(true);
  const {
    userData,
    currentCategory,
    selectedFacility,
    setCurrentCategory,
    setSelectedFacility,
  } = useUserStore();

  // const addresses = convertHomeAddress(userData?.addresses) || '';
  let homeAddress: HomeAddress[] = [];

  const [features, setFeatures] = useState<Feature[]>([]);
  const [api, setApi] = useState<string>('');
  const [info, setInfo] = useState<{ [key: string]: any }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [addressList, setAddressList] = useState<HomeAddress[]>([]);
  const [directions, setDirections] = useState<DirectionsResult>();

  const apiKey = 'AIzaSyBVXnBh_mZfwQDtubQkMtLOZJvw4GM5fnc';

  const [mapRef, setMapRef] = useState();

  const { setMapDirections } = useDataStore();

  const onLoad = (map: any) => {
    // features?.forEach(({ geometry }) =>
    //   bounds.extend({ lat: geometry.y, lng: geometry.x })
    // );
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

  const { setHomeCoords, setData } = useDataStore();

  const [currentPosition, setCurrentPosition] = useState(null);

  const fetchDirections = (house: LatLngLiteral) => {
    if (!currentPosition) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: { lat: 50.8181199, lng: 12.9304204 },
        destination: house,
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
          console.log('position---------', position);

          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          if (mapRef) {
            mapRef?.setZoom(20);
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
          console.log('position---------', position);

          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          if (mapRef) {
            mapRef?.setZoom(20);
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

  //   console.log('featuressss', features);

  const handleMarkerClick = (lat, lng) => {
    mapRef?.setZoom(16);
    mapRef?.panTo({ lat, lng });
  };

  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const handleExpand = (lat, lng) => {
    // mapRef?.setZoom(15);
    // mapRef?.panTo({ lat, lng });
    setIsExpanded(true);

    // setIsExpanded(true);
  };

  const handleCollapse = (event: any) => {
    event.stopPropagation();
    setIsExpanded(false);
    mapRef?.setZoom(14);
  };

  return !isLoaded ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="map">
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
              icon={
                currentCategory === 'SCHULE'
                  ? {
                      url: 'https://cdn-icons-png.flaticon.com/32/11542/11542151.png',

                      scaledSize: new google.maps.Size(30, 30),
                    }
                  : {
                      url: 'https://cdn-icons-png.flaticon.com/32/6162/6162025.png',

                      scaledSize: new google.maps.Size(20, 20),
                    }
              }
              onClick={() => {
                setSelectedMarker(feature);
                handleMarkerClick(feature.geometry.y, feature.geometry.x);
                showInfoOnClick(feature);
                handleExpand(feature.geometry.y, feature.geometry.x);
              }}
            ></Marker>
          ))}

          {currentPosition && (
            <Marker
              //   onClick={() => {
              //     handleMarkerClick(currentPosition.lat, feature.geometry.x);
              //   }}
              position={currentPosition}
              icon={{
                url: 'https://cdn-icons-png.flaticon.com/32/1865/1865269.png',
              }}
            ></Marker>
          )}

          <div className="absolute bottom-10 flex space-x-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2">
            <button
              className="flex-1 btn bg-white shadow-l"
              onClick={() => {
                handleApiTrigger(schule);
                setCurrentCategory('SCHULE');
                setSelectedFacility('');
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

          <div className="absolute top-0">
            <SpringModal
              fetchDirections={fetchDirections}
              info={info}
              isOpen={isExpanded}
              setIsOpen={setIsExpanded}
            />
          </div>
        </GoogleMap>
        <div className="absolute top-10 left-[40%] ">
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
      </div>
    </>
  );
}

export default React.memo(ReactGoogleMaps);
