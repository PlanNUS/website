import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // Redirect,
} from 'react-router-dom';

import '../../Style/CorePage/Navigator.css';

import AcademicPlanner from '../AcademicPlanner/AcademicPlanner';
import CAPCalculator from '../CAPCalculator/CAPCalculator';
import Home from '../Home/Home';
import SideButton from './Components/SideButton';
import ImportConfirmation from './Components/ImportConfirmation';
import Notification from './Components/Notification';

export default function Navigator(props) {
  const planner = require('./Assets/PlannerIcon.png').default;
  const calculator = require('./Assets/CalculatorIcon.png').default;

  const isImportConfirmShown = props.isImportConfirmShown;
  const handleImportConfirmation = props.handleImportConfirmation;
  const darkTheme = props.darkTheme;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;
  const transition = props.transition;

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

        {/* <Redirect exact from="/" to="/AcademicPlanner" /> */}
        <div id="appWrapper">
          <Notification darkTheme={darkTheme} />
          <ImportConfirmation
            darkTheme={darkTheme}
            isShown={isImportConfirmShown}
            handleImportConfirmation={handleImportConfirmation}
          />
          <div id="currentApp">
            <Switch>
              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <Home
                    {...routeProps}
                    darkTheme={darkTheme}
                    moduleData={moduleData}
                    moduleDataLength={moduleDataLength}
                    transition={transition}
                  />
                )}
              />
              <Route
                exact
                path="/AcademicPlanner"
                render={(routeProps) => (
                  <AcademicPlanner
                    {...routeProps}
                    darkTheme={darkTheme}
                    moduleData={moduleData}
                    moduleDataLength={moduleDataLength}
                    transition={transition}
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
                    transition={transition}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
