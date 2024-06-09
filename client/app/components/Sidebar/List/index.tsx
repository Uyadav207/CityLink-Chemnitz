'use client';
import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import useDataStore from '@/app/store/mapStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Search from '../Search';
import calculateDistance from './Distance';

import { favoriteFacilityApi } from '@/app/api/favorite';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import useUserStore from '@/app/store/userStore';
import toast from 'react-hot-toast';

const List: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { homeCoords, dataApi } = useDataStore();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [favorited, setFavorites] = useState([]);
  const { userData, currentCategory, setUser, setSelectedFacility } =
    useUserStore();
  console.log(userData);

  const updateQueryParam = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (dataApi) {
      console.log(dataApi);
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

      setFilteredData(filtered.slice(0, 10)); // Limit to the first 10 elements
    }
  }, [dataApi, loading, searchTerm]);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  if (loading || !dataApi) {
    // Show skeletons while data is loading
    return (
      <ul className="bordered-list">
        {Array(10)
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
    );
  }

  // console.log(filteredData);
  console.log('curentttt casdmnaskdm', currentCategory);

  const toggleFavorite = async (id: any) => {
    console.log(userData.favouriteFacilities);

    if (
      userData.favouriteFacilities[0]?.category === currentCategory &&
      userData.favouriteFacilities[0]?.objectID === id
    ) {
      try {
        const response = await favoriteFacilityApi.removeFavoriteFacility(
          userData.id
        );
        console.log(response.data);
        toast.success('Favorite facility removed Successfully');
        setUser({ ...userData, favouriteFacilities: [] });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      const payload = {
        category: currentCategory,
        objectId: id,
      };
      try {
        const response = await favoriteFacilityApi.addFavoriteFacility(
          userData.id,
          payload
        );
        toast.success('Favorite facility added Successfully');
        setUser({
          ...userData,
          favouriteFacilities: [response.data.favouriteFacility],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(filteredData);

  return (
    <div>
      <Search value={searchTerm} onChange={handleSearch} />
      {noResults ? (
        <div className="text-center py-4 text-gray-600">No results found.</div>
      ) : (
        <div className="h-[70vh] overflow-y-auto " id="scrollableDiv">
          <ul className="bordered-list">
            {filteredData.map((data: any, index: number) => (
              <li
                key={index}
                className="mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer flex border-b items-center justify-between"
                onClick={() => {
                  // updateQueryParam('id', data.attributes.OBJECTID);
                  setSelectedFacility(data);
                }}
              >
                <div className="flex flex-col w-4/5">
                  <h1 className="text-sm font-bold truncate">
                    {data.attributes.TRAEGER}
                  </h1>
                  <p className="text-sm text-gray-500 truncate">
                    <span className="text-green-400">
                      {calculateDistance(
                        data.geometry.y,
                        data.geometry.x,
                        homeCoords.lat,
                        homeCoords.lng
                      ).toFixed(2)}{' '}
                      Km
                    </span>
                    <span className="text-black"> • </span>
                    <span className="truncate">{data.attributes.STRASSE}</span>
                  </p>
                </div>
                <button
                  className={`focus:outline-none`}
                  onClick={() => toggleFavorite(data.attributes.OBJECTID)}
                >
                  {userData.favouriteFacilities[0]?.category ===
                    currentCategory &&
                  userData.favouriteFacilities[0]?.objectID ===
                    data.attributes.OBJECTID ? (
                    <FontAwesomeIcon icon={faHeart} color="red" />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} color="grey" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default List;
