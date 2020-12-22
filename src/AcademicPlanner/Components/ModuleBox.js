import React, {useState} from 'react';
import {IoClose} from 'react-icons/io5';

import './ModuleBox.css';

export default function ModuleBox(props) {
  const module = props.module;
  const darkTheme = props.darkTheme;

  // {
  //   prereqCleared: false, //Value must be true
  //   prereqInSameSem: true, //Value must be false
  //   coreqInSameSem: false, //Value must be true
  //   precluAdded: true, //value must be false
  // },

  let verifiedDisplay = [];

  if (!module.prereqCleared) {
    let tempDisplay = {
      message: 'Prerequisite missing!',
      key: 'ClearedPrereq',
    };
    verifiedDisplay.push(tempDisplay);
  }

  if (module.prereqInSameSem) {
    let tempDisplay = {
      message: 'Prerequisite found in the same semester!',
      key: 'SameSemPrereq',
    };
    verifiedDisplay.push(tempDisplay);
  }

  if (!module.coreqInSameSem) {
    let tempDisplay = {
      message: 'Corequisite is not in the same semester!',
      key: 'coreq',
    };
    verifiedDisplay.push(tempDisplay);
  }

  if (module.precluAdded) {
    let tempDisplay = {
      message: 'Preclusion already exists!',
      key: 'preclude',
    };
    verifiedDisplay.push(tempDisplay);
  }

  return (
    <div
      id="moduleBox"
      className={`${module.isFlagged ? 'lightOrange' : 'white'}`}>
      <div id="contentBox">
        <p
          className={`${darkTheme ? 'dark' : 'light'}Words`}
          id="moduleCodetitle">
          {module.moduleCode}
        </p>
        <br id={`errorList${module.isFlagged ? 'Shown' : 'Hidden'}`} />
        <ul id={`errorList${module.isFlagged ? 'Shown' : 'Hidden'}`}>
          {verifiedDisplay.map((currentItem) => (
            <li
              key={currentItem.key}
              className={`${darkTheme ? 'dark' : 'light'}Words`}
              id="errorMessage">
              {currentItem.message}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <IoClose
          className="clickableIcon"
          color={`${darkTheme ? 'white' : 'grey'}`}
          size="25px"
          // onClick={() => updateShowDeleteConfirmation(true)}
        />
      </div>
    </div>
  );
}
