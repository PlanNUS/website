import React, {useState} from 'react';
import {IoClose} from 'react-icons/io5';

import '../../../Style/CorePage/Components/Notification.css';

export default function Notification(props) {
  const darkTheme = props.darkTheme;

  const [isNotifOpen, updateIsNotifOpen] = useState(true);

  if (isNotifOpen) {
    return (
      <div id="importConfirmWrapper">
        <div>
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
            Welcome to PlanNUS Alpha Testing!
          </p>
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
            Do give some feedback regarding:
          </p>
          <ul>
            <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
              Testing for Requirement check for Prerequisite, Corequisite and
              Preclusion
            </li>
            <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
              Layout of Academic Planner
            </li>
            <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
              Color scheme for both White and Dark mode
            </li>
            <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
              General usability
            </li>
          </ul>
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
            The feedback link can be found in the footer. Thanks again and enjoy
            hehe!
          </p>
        </div>
        <div id="controls">
          <IoClose
            className="clickableIcon"
            color={`${darkTheme ? 'white' : 'grey'}`}
            size="25px"
            onClick={() => updateIsNotifOpen(false)}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}
