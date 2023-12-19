import { useState } from 'react';
import axios from 'axios';

// a separate custom hook for using axios in different components
const useAxios = (baseUrl) => {
  // states for data, alert and loading
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  // a function for showing alert for a 5 seconds
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  // a function for asynchronous request using axios for adding data
  // show alert if succesful, show error message if not and stop loaging
  const makeRequest = async (method, endpoint, payload = null) => {
    try {
      setLoading(true);
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(response.data);
      showAlert('Book added successfully', 'success');
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };
  // functions for get, post, update and remove from database/page
  const get = async (endpoint) => makeRequest('get', endpoint);
  const post = async (endpoint, payload) =>
    makeRequest('post', endpoint, payload);
  const update = async (endpoint, payload) =>
    makeRequest('put', endpoint, payload);
  const remove = async (endpoint) => makeRequest('delete', endpoint);

  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
