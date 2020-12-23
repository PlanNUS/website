import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './index.css';

import CorePage from './CorePage/CorePage.js';
import reportWebVitals from './reportWebVitals';

const initialState = {
  currentModuleData: [
    //Year 1
    [
      //Sem 1 to Special term 2 in order from left to right
      [],
      [],
      [],
      [],
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
    ],

    //Year 2
    [
      [],
      [],
      [],
      [],
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
    ],

    //Year 3,
    [
      [],
      [],
      [],
      [],
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
    ],

    //Year 4
    [
      [],
      [],
      [],
      [],
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
    ],

    //Year 5
    [
      [],
      [],
      [],
      [],
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
    ],
    {
      totalModularCredits: 0,
    },
  ],

  // currentModuleFlags: [
  //   //Year 1
  //   [
  //     //Sem 1 to Special term 2 in order from left to right
  //     [],
  //     [],
  //     [],
  //     [],
  //   ],

  //   //Year 2
  //   [[], [], [], []],

  //   //Year 3,
  //   [[], [], [], []],

  //   //Year 4
  //   [[], [], [], []],

  //   //Year 5
  //   [[], [], [], []],
  // ],
};

function newDataRedux(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        currentModuleData: action.newData,
      };
    // case 'UPDATE_FLAGS':
    //   return {
    //     currentModuleFlags: action.newFlags,
    //   };
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
