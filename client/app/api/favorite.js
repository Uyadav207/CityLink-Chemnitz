import axios from './axios';

const addDeleteFavoriteFacility = (id, payload) =>
  axios.post(`user/favourite/facility/${id}`, payload);

export const favoriteFacilityApi = {
  addDeleteFavoriteFacility,
};
