import React from 'react';

import SideButton from './Components/SideButton';

export default function Navigator(props) {
  const planner = require('./Assets/PlannerIcon.png').default;
  const calculator = require('./Assets/CalculatorIcon.png').default;

  const darkTheme = props.darkTheme;
  // console.log(darkTheme);

  return (
    <div>
      <SideButton icon={planner} desc="Planner" darkTheme={darkTheme} />
      <SideButton icon={calculator} desc="Calculator" darkTheme={darkTheme} />
      {/* <SideButton
        icon={planner}
        desc="Academic Planner"
        darkTheme={darkTheme}
      /> */}
    </div>
  );
}
