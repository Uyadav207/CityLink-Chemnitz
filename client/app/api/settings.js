import axios from './axios';

const getUser = () => axios.get('/user');
const editUserDetails = (id, payload) => axios.put(`/user/edit/${id}`, payload);
const editContactDetails = (id, payload) =>
  axios.post(`/user/address/${id}`, payload);
const switchUserMode = (id, payload) =>
  axios.put(`/user/change-type/${id}`, payload);
const deleteUser = (id) => axios.delete(`/user/delete/${id}`);

export const settingsApi = {
  getUser,
  editUserDetails,
  editContactDetails,
  switchUserMode,
  deleteUser,
};
