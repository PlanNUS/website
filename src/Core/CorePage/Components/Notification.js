import React, {useState} from 'react';
import {IoClose} from 'react-icons/io5';

import '../../../Style/CorePage/Components/Notification.css';

export default function Notification(props) {
  const darkTheme = props.darkTheme;
  const type = props.type;
  const styles = props.styles;

  const [isNotifOpen, updateIsNotifOpen] = useState(true);

  if (isNotifOpen) {
    if (type === '/CAPCalculator') {
      return (
        <div
          id="importNotifWrapper"
          style={{
            borderWidth: styles.disclaimerWidth,
            borderColor: styles.disclaimerBorderColor,
            backgroundColor: styles.disclaimerBackgroundColor,
          }}>
          <div>
            <h3 className={`${darkTheme ? 'dark' : 'light'}Words`}>
              Disclaimer for CAP Calculator:
            </h3>
            <ul>
              <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
                Only modules with the ability to SU will be given the 'S/U'
                option instead of 'CS/CU' option.
              </li>
              <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
                A 'F'/'U'/'CU' grade will is counted as not clearing the module.
              </li>
              <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
                Users are encouraged to double check before using 'CS/CU' grade.
              </li>
            </ul>
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
    } else if (type === '/AcademicPlanner') {
      return (
        <div
          id="importNotifWrapper"
          style={{
            borderWidth: styles.disclaimerWidth,
            borderColor: styles.disclaimerBorderColor,
            backgroundColor: styles.disclaimerBackgroundColor,
          }}>
          <div>
            <h3 className={`${darkTheme ? 'dark' : 'light'}Words`}>
              Disclaimer for Academic Planner:
            </h3>
            <ul>
              <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
                Note that the requisites might not be completely accurate.
              </li>
              <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
                For multi-semester modules, add the module to the completion
                semester.
              </li>
            </ul>
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
    } else if (type === 'Global') {
      return (
        <div
          id="importNotifWrapper"
          style={{
            borderWidth: styles.notificationWidth,
            borderColor: styles.notificationBorderColor,
            backgroundColor: styles.notificationBackgroundColor,
          }}>
          <div>
            <h3 className={`${darkTheme ? 'dark' : 'light'}Words`}>
              Welcome to PlanNUS Alpha Testing (V2)!
            </h3>
            <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
              Do give some feedback regarding:
            </p>
            <ul>
              <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
                Testing for Requirement check for Prerequisite, Corequisite and
                Preclusion
              </li>
              <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
                Testing for CAP Calculation
              </li>
              <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
                Layout of Academic Planner and CAP Calculator
              </li>
              <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
                Color scheme for both White and Dark mode
              </li>
              <li className={`${darkTheme ? 'dark' : 'light'}Words`}>
                General usability
              </li>
            </ul>
            <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
              The feedback link can be found in the footer. Thanks again and
              enjoy hehe!
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
  } else {
    return null;
  }
}
