import React, {useEffect, useState} from 'react';
import {
  // BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import '../../Style/CorePage/Navigator.css';

import AcademicPlanner from '../AcademicPlanner/AcademicPlanner';
import CAPCalculator from '../CAPCalculator/CAPCalculator';
import Home from '../Home/Home';
import SideButton from './Components/SideButton';
import ImportConfirmation from './Components/ImportConfirmation';
import Notification from './Components/Notification';

export default function Navigator(props) {
  const isImportConfirmShown = props.isImportConfirmShown;
  const handleImportConfirmation = props.handleImportConfirmation;
  const styles = props.styles;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;
  const transition = props.transition;

  const [currLocation, updateCurrLocation] = useState({
    pathname: '/',
  });
  const [currNotif, updateCurrNotif] = useState('');
  const [isNotifOpen, updateIsNotifOpen] = useState(true);

  useEffect(() => {
    if (currLocation.pathname.includes('CAPCalculator')) {
      updateCurrNotif('/CAPCalculator');
    } else if (currLocation.pathname.includes('AcademicPlanner')) {
      updateCurrNotif('/AcademicPlanner');
    }
  }, [currLocation]);

  return (
    // <BrowserRouter>
    <HashRouter>
      <div id="mainPage">
        <nav id="navigatorSelector">
          <Link to="/AcademicPlanner">
            <SideButton styles={styles} type="plan" desc="Planner" />
          </Link>
          <Link to="/CAPCalculator">
            <SideButton styles={styles} type="calc" desc="Calculator" />
          </Link>
        </nav>

        <Redirect exact from="/" to={currLocation.pathname} />
        <div id="appWrapper">
          {/* <Notification type="Global" styles={styles} /> */}
          <Notification
            type={currNotif}
            isNotifOpen={isNotifOpen}
            styles={styles}
          />
          <ImportConfirmation
            styles={styles}
            isShown={isImportConfirmShown}
            handleImportConfirmation={handleImportConfirmation}
          />
          <div
            id="currentApp"
            style={{
              borderWidth: styles.appWidth,
              borderColor: styles.appBorderColor,
              backgroundColor: styles.appBackgroundColor,
            }}>
            <Switch>
              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <Home
                    {...routeProps}
                    updateIsNotifOpen={updateIsNotifOpen}
                    styles={styles}
                    moduleData={moduleData}
                    moduleDataLength={moduleDataLength}
                    transition={transition}
                    updateCurrLocation={updateCurrLocation}
                  />
                )}
              />
              <Route
                exact
                path="/AcademicPlanner"
                render={(routeProps) => (
                  <AcademicPlanner
                    {...routeProps}
                    updateIsNotifOpen={updateIsNotifOpen}
                    styles={styles}
                    moduleData={moduleData}
                    moduleDataLength={moduleDataLength}
                    transition={transition}
                    updateCurrLocation={updateCurrLocation}
                  />
                )}
              />
              <Route
                exact
                path="/CAPCalculator"
                render={(routeProps) => (
                  <CAPCalculator
                    {...routeProps}
                    updateIsNotifOpen={updateIsNotifOpen}
                    styles={styles}
                    updateCurrLocation={updateCurrLocation}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    </HashRouter>
    // </BrowserRouter>
  );
}
