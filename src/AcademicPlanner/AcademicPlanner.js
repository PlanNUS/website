import React, {useState} from 'react';

import './AcademicPlanner.css';

import SemesterBox from './Components/SemesterBox';

export default function AcademicPlanner(props) {
  const darkTheme = props.darkTheme;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;

  const [noOfSemester, updateNoOfSemester] = useState(1);
  // const noOfSemester = [1];

  return (
    <div id="acadPlanWrapper">
      <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
        This is the academic planner
      </p>

      <SemesterBox currentSemester="1" />
    </div>
  );
}
