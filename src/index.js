import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux'

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store/store'

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';

//Working in office
// axios.defaults.baseURL = 'http://171.60.218.81:15000/'
// axios.defaults.baseURL = 'http://192.168.0.143:5000/'
axios.defaults.baseURL = 'http://192.168.1.143:15000/'

// axios.defaults.baseURL = 'http://3.108.0.118:5000/'

//Danny personal address when in office and at home
// axios.defaults.baseURL = 'http://192.168.1.3:8000/'
// axios.defaults.baseURL = 'http://45.251.34.238:40974/'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/'

//When server is with Abinesh
// axios.defaults.baseURL = 'http://49.204.124.186:5000/'
axios.defaults.withCredentials = true
if (localStorage.hasOwnProperty('eco_token')) {
  axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('eco_token')
}
else {
  console.log('no token')
}

if(!localStorage.hasOwnProperty('is_dark')){
  localStorage.setItem('is_dark', false);
}

if(!localStorage.hasOwnProperty('isloggedin')){
  localStorage.setItem('isloggedin', false);
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
