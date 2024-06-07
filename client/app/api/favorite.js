import axios from './axios';

const addFavoriteFacility = (id, payload) =>
  axios.post(`user/favourite/facility/${id}`, payload);

const removeFavoriteFacility = (id) =>
  axios.delete(`user/favourite/facility/${id}`);

export const favoriteFacilityApi = {
  addFavoriteFacility,
  removeFavoriteFacility,
};
