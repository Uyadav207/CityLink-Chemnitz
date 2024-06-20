import axios from './axios';

const getFacilities = (facility) => axios.get(`apis/api/${facility}`);

export const mapDataApis = {
  getFacilities,
};
