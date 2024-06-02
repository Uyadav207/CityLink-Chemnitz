import axios from './axios';

const login = (payload) => axios.post('/login/auth', payload);
const signUp = (payload) => axios.post('/signup/auth', payload);

export const authApis = {
  login,
  signUp,
};
