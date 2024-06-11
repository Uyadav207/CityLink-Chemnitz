import axios from './axios';

const getUser = () => axios.get('/user');
const editUserDetails = (id, payload) => axios.put(`/user/edit/${id}`, payload);
const editContactDetails = (id, payload) =>
  axios.post(`/user/address/${id}`, payload);
const switchUserMode = (id, payload) =>
  axios.put(`/user/change-type/${id}`, payload);
const deleteUser = (id) => axios.delete(`/user/delete/${id}`);
const updateAddress = (id, payload) => axios.put(`/user/edit/address/${id}`, payload);
const deleteAddress = (id, addressId) => axios.delete(`/user/delete/address/${id}/${addressId}`);

export const settingsApi = {
  getUser,
  editUserDetails,
  editContactDetails,
  switchUserMode,
  deleteUser,
  updateAddress,
  deleteAddress
};
