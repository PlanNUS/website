import React from 'react';
import {IoClose} from 'react-icons/io5';

import './ModuleBox.css';

export default function ModuleBox(props) {
  const module = props.module;
  const darkTheme = props.darkTheme;
  const currentIdx = props.currentIdx;
  const removeModule = props.removeModule;

  let verifiedDisplay = [];

  if (!module.isPrereqCleared) {
    let tempDisplay = {
      message: 'Prerequisite missing!',
      key: 'ClearedPrereq',
    };
    verifiedDisplay.push(tempDisplay);
  }

  if (module.isPrereqInSameSem) {
    let tempDisplay = {
      message: 'Prerequisite found in the same semester!',
      key: 'SameSemPrereq',
    };
    verifiedDisplay.push(tempDisplay);
  }

  if (!module.isCoreqInSameSem) {
    let tempDisplay = {
      message: 'Corequisite is not in the same semester!',
      key: 'coreq',
    };
    verifiedDisplay.push(tempDisplay);
  }

  if (module.isPrecluAdded) {
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
          onClick={() => removeModule(currentIdx)}
        />
      </div>
    </div>
  );
}
