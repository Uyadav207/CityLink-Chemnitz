'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Heart from 'react-animated-heart';
import 'react-loading-skeleton/dist/skeleton.css';

import useDataStore from '@/app/store/mapStore';
import Skeleton from 'react-loading-skeleton';
import Search from '../Search';

import { favoriteFacilityApi } from '@/app/api/favorite';
import useUserStore from '@/app/store/userStore';
import { Scaleloader } from '../../Loader';

type LatLngLiteral = google.maps.LatLngLiteral;

type ListProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const List = ({ loading, setLoading }: ListProps) => {
  const { loader, homeCoords, dataApi } = useDataStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isClick, setClick] = useState(false);
  const {
    userData,
    currentCategory,
    setUser,
    selectedFacility,
    setSelectedFacility,
  } = useUserStore();

  useEffect(() => {
    if (dataApi) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [dataApi]);

  useEffect(() => {
    if (!loading && dataApi) {
      // Deduplicate data based on unique geolocation coordinates (geometry: {x, y})
      const uniqueDataApi = dataApi.filter(
        (value: any, index: number, self: any[]) =>
          index ===
          self.findIndex(
            (t) =>
              t.geometry.x === value.geometry.x &&
              t.geometry.y === value.geometry.y
          )
      );

      // Filter data based on search term
      const filtered = uniqueDataApi.filter(
        (data: any) =>
          data.attributes.TRAEGER.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) ||
          data.attributes.STRASSE.toLowerCase().includes(
            searchTerm.toLowerCase()
          )
      );

      if (filtered.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }

      setFilteredData(filtered); // Limit to the first 10 elements

      // fetchDirections({
      //   lat: filtered[0].geometry.y,
      //   lng: filtered[0].geometry.x,
      // });
    }
  }, [dataApi, loading, searchTerm]);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const fetchDirections = (facility: LatLngLiteral): any => {
    console.log('aaaaaaaaaaaaaaaaaa', facility);

    if (!homeCoords) return 'q';

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: homeCoords,
        destination: facility,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          console.log(result);
        }
      }
    );
  };

  if (loading || !dataApi) {
    // Show skeletons while data is loading
    return (
      <div>
        <div className="min-h-[100px]"></div>
        <ul>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <li key={index} className="mb-2 p-2 rounded-md flex">
                <div className="flex flex-col w-full">
                  <Skeleton height={20} width={`60%`} />
                  <Skeleton height={15} width={`80%`} />
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  const toggleFavorite = async (e: any, id: any) => {
    e.stopPropagation();
    const payload = { category: currentCategory, objectId: id };
    const isFavorite = userData.favouriteFacilities.find(
      (facility: any) =>
        id === facility?.objectID && currentCategory === facility?.category
    );
    if (!isFavorite) {
      try {
        const response = await favoriteFacilityApi.addDeleteFavoriteFacility(
          userData.id,
          payload
        );
        toast.success('Favorite facility Added Successfully');
        setUser(response.data.updatedUser);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await favoriteFacilityApi.addDeleteFavoriteFacility(
          userData.id,
          payload
        );
        toast.success('Favorite facility Removed Successfully');
        setUser(response.data.updatedUser);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(dataApi, 'dataApi');

  return (
    <div className="sidebar">
      <div className="px-4">
        <Search value={searchTerm} onChange={handleSearch} />
        <h2
          className={`text-center ${
            currentCategory === 'SCHULE'
              ? 'text-red-400 '
              : currentCategory === 'SCHULSOZIALARBEIT'
              ? 'text-blue-400'
              : currentCategory === 'KINDERTAGESEINRICHTUNGEN'
              ? 'text-green-400'
              : currentCategory === 'JUGENDBERUFSHILFE' && 'text-violet-400'
          } font-bold`}
        >
          {currentCategory}
        </h2>
      </div>

      {noResults ? (
        <div className="notFound text-center py-4 text-gray-600">
          No results found.
        </div>
      ) : (
        <>
          <div className="border border-b mt-4 "></div>

          <div id="scrollableDiv" className="px-2  overflow-y-scroll h-[55vh]">
            {loader && dataApi ? (
              <div className="h-[50vh] flex items-center justify-center ">
                <Scaleloader />
              </div>
            ) : (
              <ul>
                {filteredData.map((data: any, index: number) => (
                  <li
                    key={index}
                    className={`mb-2 hover:bg-blue-100 cursor-pointer flex items-center  liSidebar ${
                      data.attributes.OBJECTID ===
                      selectedFacility?.attributes?.OBJECTID
                        ? 'bg-blue-100 border-l-4 border-blue-500'
                        : ''
                    }`}
                    onClick={() => {
                      setSelectedFacility(data);
                    }}
                  >
                    <div className="flex flex-col w-4/5">
                      <h1 className="text-sm font-bold truncate">
                        {data.attributes.KURZBEZEICHNUNG
                          ? data.attributes.KURZBEZEICHNUNG
                          : currentCategory + '-' + Number(index + 1)}
                      </h1>
                      <p className="text-sm text-gray-500 truncate">
                        {/* <span className="text-green-400">
                      {calculateDistance(
                        data.geometry.y,
                        data.geometry.x,
                        homeCoords.lat,
                        homeCoords.lng
                      ).toFixed(2)}{' '}
                      Km
                    </span> */}

                        <span className="text-black"> • </span>
                        <span className="truncate">
                          {data.attributes.STRASSE}
                        </span>
                      </p>
                    </div>
                    <div
                      className={
                        'focus:outline-none flex items-center rounded-full heart'
                      }
                      onClick={(e) =>
                        toggleFavorite(e, data.attributes.OBJECTID)
                      }
                    >
                      {userData?.favouriteFacilities.find(
                        (facility: any) =>
                          data.attributes.OBJECTID === facility?.objectID &&
                          currentCategory === facility?.category
                      ) ? (
                        <Heart isClick={true} onClick={() => setClick(true)} />
                      ) : (
                        <Heart
                          isClick={false}
                          onClick={() => setClick(false)}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
