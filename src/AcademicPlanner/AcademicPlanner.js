import React from 'react';

import './AcademicPlanner.css';

export default function AcademicPlanner(props) {
  const darkTheme = props.darkTheme;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;

  return (
    <div>
      <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
        This is the academic planner
      </p>
    </div>
  );
}
