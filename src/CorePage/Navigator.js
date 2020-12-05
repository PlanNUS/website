import React from 'react';

import './Navigator.css';

import AcademicPlanner from '../AcademicPlanner/AcademicPlanner';
import CAPCalculator from '../CAPCalculator/CAPCalculator';
import SideButton from './Components/SideButton';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

export default function Navigator(props) {
  const planner = require('./Assets/PlannerIcon.png').default;
  const calculator = require('./Assets/CalculatorIcon.png').default;

  const darkTheme = props.darkTheme;
  // console.log(darkTheme);

  return (
    <Router>
      <div id="mainPage">
        <nav>
          <Link to="/AcademicPlanner">
            <SideButton icon={planner} desc="Planner" darkTheme={darkTheme} />
          </Link>
          <Link to="/CAPCalculator">
            <SideButton
              icon={calculator}
              desc="Calculator"
              darkTheme={darkTheme}
            />
          </Link>
        </nav>

        <Redirect exact from="/" to="/AcademicPlanner" />

        <div id="currentApp">
          <Switch>
            <Route exact path="/AcademicPlanner" component={AcademicPlanner} />
            <Route exact path="/CAPCalculator" component={CAPCalculator} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
