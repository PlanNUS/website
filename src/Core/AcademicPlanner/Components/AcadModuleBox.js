import React from 'react';
import {IoClose} from 'react-icons/io5';

import '../../../Style/AcademicPlanner/Components/AcadModuleBox.css';
import '../../../Style/Common/ModuleBoxCommons.css';

export default function AcadModuleBox(props) {
  const module = props.module;
  const darkTheme = props.darkTheme;
  const currentIdx = props.currentIdx;
  const removeModule = props.removeModule;
  const styles = props.styles;

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
      style={{
        borderWidth: styles.modWidth,
        borderColor: styles.modBorderColor,
        backgroundColor: styles.modBackgroundColor,
      }}
      className={`${module.isFlagged ? 'lightOrange' : 'white'}`}>
      <div id="contentBox">
        <p
          className="words"
          style={{color: styles.fontColor}}
          id="moduleCodetitle">
          {module.moduleCode}
        </p>
        <br id={`errorList${module.isFlagged ? 'Shown' : 'Hidden'}`} />
        <ul id={`errorList${module.isFlagged ? 'Shown' : 'Hidden'}`}>
          {verifiedDisplay.map((currentItem) => (
            <li
              key={currentItem.key}
              className="words"
              style={{color: styles.fontColor}}
              id="errorMessage">
              {currentItem.message}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <IoClose
          className="clickableIcon"
          style={{color: styles.controlButtons}}
          size="25px"
          onClick={() => removeModule(currentIdx)}
        />
      </div>
    </div>
  );
}
