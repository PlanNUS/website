/*
 *https://www.npmjs.com/package/react-switch
 */

import React, {useState} from 'react';
import ToggleSwitch from 'react-switch';

import './CorePage.css';

import Navigator from './Navigator';

import Logo from './Assets/Title.png';
import ErrorIcon from './Assets/SadFace.png';

export default function CorePage() {
  const acadamicYear = '2020-2021';
  const [darkTheme, updateDarkTheme] = useState(false);
  const [isLoading, updateIsLoading] = useState(true);
  const [isLoadingSuccess, updateIsLoadingSuccess] = useState(false);

  // const [showAddYearModal, updateShowAddYearModal] = useState(false);

  let moduleData = null;
  let moduleDataLength = -1;

  if (isLoading) {
    try {
      //Retrival of data from server
      const url =
        'https://api.nusmods.com/v2/' + acadamicYear + '/moduleInfo.json';

      // const url = '';
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open('GET', url, false); //False for synchorous request
      xmlHttp.send(null);

      moduleData = JSON.parse(xmlHttp.responseText);

      console.log(moduleData[0]);

      moduleDataLength = moduleData.length;

      console.log(moduleDataLength);

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
          {/* <Modal
            show={showAddYearModal}
            onHide={() => updateShowAddYearModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <p>helloo</p>
          </Modal> */}

          <div id="headerBanner">
            <div id="logoPadding">
              <img alt="PlanNUS Home" src={Logo} />
            </div>

            <div id="darkModeChecker">
              <p className={`${darkTheme ? 'dark' : 'light'}Words`} id="darkModeWords">
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
            // updateShowAddYearModal={updateShowAddYearModal}
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
