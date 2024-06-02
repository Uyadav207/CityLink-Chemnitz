import axios from './axios';

const getUser = (payload) => axios.get('/user');

export const userApi = {
  getUser,
};
