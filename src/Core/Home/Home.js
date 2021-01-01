import React, {useEffect} from 'react';

import '../../Style/Home/Home.css';

export default function Home(props) {
  const styles = props.styles;
  const updateIsNotifOpen = props.updateIsNotifOpen;

  useEffect(() => {
    updateIsNotifOpen(false);
  }, [updateIsNotifOpen]);

  return (
    <div id="appWrapper">
      <h2 className="words" style={{color: styles.fontColor}}>
        Welcome to PlanNUS!
      </h2>
      <br />
      <h3 className="words" style={{color: styles.fontColor}}>
        Planner
      </h3>
      <p className="words" style={{color: styles.fontColor}}>
        Allows for the planning of your academic journey in NUS.
      </p>
      <br />
      <h3 className="words" style={{color: styles.fontColor}}>
        Calculator
      </h3>
      <p className="words" style={{color: styles.fontColor}}>
        Allows for the calculation of current CAP with extra details.
      </p>
      <br />
      <h4 className="words" style={{color: styles.fontColor}}>
        Choose an app to start using PlanNUS!
      </h4>
    </div>
  );
}
