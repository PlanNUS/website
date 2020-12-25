import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './index.css';

// import CorePage from './CorePage/CorePage.js';
import CorePage from './Core/CorePage/CorePage';
import Login from './Core/Login/Login';
import reportWebVitals from './reportWebVitals';

const initialState = {
  globalData: [
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
      suUsed: 0,
      totalModularCredits: 0,
      isDarkModeChecked: false,
      isDisplayed: [
        //Year 1
        [
          true, //Is current year shown? ("Overrides" the rest)
          true, //Is Sem 1 shown?
          false, //Is Special Term 1 shown?
          false, //Is Special Term 2 shown?
          false, //Is Sem 2 shown?
        ],

        //Year 2
        [
          false, //Is current year shown? ("Overrides" the rest)
          true, //Is Sem 1 shown?
          false, //Is Special Term 1 shown?
          false, //Is Special Term 2 shown?
          false, //Is Sem 2 shown?
        ],

        //Year 3,
        [
          false, //Is current year shown? ("Overrides" the rest)
          true, //Is Sem 1 shown?
          false, //Is Special Term 1 shown?
          false, //Is Special Term 2 shown?
          false, //Is Sem 2 shown?
        ],

        //Year 4
        [
          false, //Is current year shown? ("Overrides" the rest)
          true, //Is Sem 1 shown?
          false, //Is Special Term 1 shown?
          false, //Is Special Term 2 shown?
          false, //Is Sem 2 shown?
        ],

        //Year 5
        [
          false, //Is current year shown? ("Overrides" the rest)
          true, //Is Sem 1 shown?
          false, //Is Special Term 1 shown?
          false, //Is Special Term 2 shown?
          false, //Is Sem 2 shown?
        ],
      ],
    },
  ],
};

function newDataRedux(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        globalData: action.newData,
      };
    default:
      return state;
  }
}

const store = createStore(newDataRedux);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Login />
      {/* <CorePage /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
