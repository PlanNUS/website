/*
 *https://www.npmjs.com/package/react-switch
 */

import React, {useState} from 'react';
import ToggleSwitch from 'react-switch';
// import Slide from '@material-ui/core/Slide';

import './CorePage.css';
import {Transition, AcadamicYear, FLAGS} from '../Constants';

import Navigator from './Navigator';

import Logo from './Assets/Title.png';
import ErrorIcon from './Assets/SadFace.png';

export default function CorePage() {
  // const acadamicYear = '2020-2021';
  const [darkTheme, updateDarkTheme] = useState(false);
  const [isLoading, updateIsLoading] = useState(true);
  const [isLoadingSuccess, updateIsLoadingSuccess] = useState(false);
  const [moduleData, updateModuleData] = useState([]);
  const [moduleDataLength, updateModuleDataLength] = useState(-1);

  if (isLoading) {
    try {
      //Retrival of data from server
      const url =
        'https://api.nusmods.com/v2/' + AcadamicYear + '/moduleInfo.json';

      // const url = '';
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open('GET', url, false); //False for synchorous request
      xmlHttp.send(null);

      const fetchedModuleData = JSON.parse(xmlHttp.responseText);

      let tempModuleData = [];
      for (let i = 0; i < fetchedModuleData.length; i++) {
        let tempObj = {
          moduleCode: fetchedModuleData[i].moduleCode,
          moduleCredit: fetchedModuleData[i].moduleCredit,
          ...FLAGS,
        };

        tempModuleData.push(tempObj);
      }

      updateModuleData(tempModuleData);
      updateModuleDataLength(tempModuleData.length);

      updateIsLoading(false);
      updateIsLoadingSuccess(true);
    } catch (err) {
      updateIsLoading(false);
      updateIsLoadingSuccess(false);
    }
  }

  if (isLoading) {
    return <p>is loading</p>;
  } else {
    if (isLoadingSuccess) {
      return (
        <div id={`${darkTheme ? 'dark' : 'light'}Theme`}>
          <div id="headerBanner">
            <div id="logoPadding">
              <img alt="PlanNUS Home" src={Logo} />
            </div>

            <div id="darkModeChecker">
              <p
                className={`${darkTheme ? 'dark' : 'light'}Words`}
                id="darkModeWords">
                Dark Mode
              </p>
              <div id="spacer" />
              <ToggleSwitch
                id="switch"
                onChange={(checked) => updateDarkTheme(checked)}
                checked={darkTheme}
              />
            </div>
          </div>

          <Navigator
            darkTheme={darkTheme}
            moduleData={moduleData}
            moduleDataLength={moduleDataLength}
            transition={Transition}
          />
        </div>
      );
    } else {
      return (
        <div id="wholePageCenter">
          <img src={ErrorIcon} alt="LoadingError" height="70px" />
          <h1 id="error" className="lightWords">
            Sorry! Something seems to went wrong (Error code: 1)
          </h1>
        </div>
      );
    }
  }
}
