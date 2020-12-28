import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
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

  const [currLocation, updateCurrLocation] = useState({pathname: ''});
  const [currNotif, updateCurrNotif] = useState('');

  useEffect(() => {
    if (currLocation.pathname.includes('CAPCalculator')) {
      updateCurrNotif('CAPCalculator');
    } else if (currLocation.pathname.includes('AcademicPlanner')) {
      updateCurrNotif('AcademicPlanner');
    }
  }, [currLocation]);

  return (
    <Router>
      <div id="mainPage">
        <nav id="navigatorSelector">
          <Link to="/PlanNUS/AcademicPlanner">
            <SideButton icon={planner} desc="Planner" darkTheme={darkTheme} />
          </Link>
          <Link to="/PlanNUS/CAPCalculator">
            <SideButton
              icon={calculator}
              desc="Calculator"
              darkTheme={darkTheme}
            />
          </Link>
        </nav>

        <Redirect exact from="/PlanNUS/" to="/PlanNUS/CAPCalculator" />
        <div id="appWrapper">
          <Notification type="Global" darkTheme={darkTheme} />
          <Notification type={currNotif} darkTheme={darkTheme} />
          <ImportConfirmation
            darkTheme={darkTheme}
            isShown={isImportConfirmShown}
            handleImportConfirmation={handleImportConfirmation}
          />
          <div id="currentApp">
            <Switch>
              <Route
                exact
                path="/PlanNUS/"
                render={(routeProps) => (
                  <Home
                    {...routeProps}
                    darkTheme={darkTheme}
                    moduleData={moduleData}
                    moduleDataLength={moduleDataLength}
                    transition={transition}
                    updateCurrLocation={updateCurrLocation}
                  />
                )}
              />
              <Route
                exact
                path="/PlanNUS/AcademicPlanner"
                render={(routeProps) => (
                  <AcademicPlanner
                    {...routeProps}
                    darkTheme={darkTheme}
                    moduleData={moduleData}
                    moduleDataLength={moduleDataLength}
                    transition={transition}
                    updateCurrLocation={updateCurrLocation}
                  />
                )}
              />
              <Route
                exact
                path="/PlanNUS/CAPCalculator"
                render={(routeProps) => (
                  <CAPCalculator
                    {...routeProps}
                    darkTheme={darkTheme}
                    updateCurrLocation={updateCurrLocation}
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
