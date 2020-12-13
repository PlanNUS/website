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
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;
  // const updateShowAddYearModal = props.updateShowAddYearModal;

  return (
    <Router>
      <div id="mainPage">
        <nav id="navigatorSelector">
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
            <Route
              exact
              path="/AcademicPlanner"
              render={(routeProps) => (
                <AcademicPlanner
                  {...routeProps}
                  darkTheme={darkTheme}
                  moduleData={moduleData}
                  moduleDataLength={moduleDataLength}
                  // updateShowAddYearModal={updateShowAddYearModal}
                />
              )}
            />
            <Route
              exact
              path="/CAPCalculator"
              render={(routeProps) => (
                <CAPCalculator
                  {...routeProps}
                  darkTheme={darkTheme}
                  moduleData={moduleData}
                  moduleDataLength={moduleDataLength}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
