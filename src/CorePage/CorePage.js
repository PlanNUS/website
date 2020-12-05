/*
 *https://www.npmjs.com/package/react-switch
 */

import React, {useState} from 'react';
import Switch from 'react-switch';

import './CorePage.css';

import Navigator from './Navigator';
import JsonRetrival from '../ModuleLoader/JsonRetrival';
import APAppEntry from '../AcademicPlanner/APAppEntry';

import Logo from './Assets/Title.png';

export default function CorePage() {
  // var newObj = JsonRetrival();
  // console.log(JsonRetrival());

  const [darkTheme, updateDarkTheme] = useState(false);

  return (
    <div id={`${darkTheme ? 'dark' : 'light'}Theme`}>
      <div id="headerBanner">
        <div id="logoPadding">
          <img alt="PlanNUS Home" src={Logo} />
        </div>

        <div id="darkModeChecker">
          <h3 className={`${darkTheme ? 'dark' : 'light'}Words`}>Dark Mode</h3>
          <div id="spacer" />
          <Switch
            id="switch"
            onChange={(checked) => updateDarkTheme(checked)}
            checked={darkTheme}
          />
        </div>
      </div>

      <Navigator darkTheme={darkTheme} />
    </div>
  );
}
