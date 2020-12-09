import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './index.css';

import CorePage from './CorePage/CorePage.js';
import reportWebVitals from './reportWebVitals';

const initialState = {
  currentData: {},
}

function newDataRedux(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_DATA':
    return {
      currentData: action.newData,
    };
  default:
    return state;
  }
}

const store = createStore(newDataRedux);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CorePage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
