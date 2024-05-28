import axios from './axios';

const login = (payload) => axios.post('/login/auth', payload);

export const loginApi = {
  login,
};
