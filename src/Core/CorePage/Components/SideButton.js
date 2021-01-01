import React from 'react';
import {IoCalculatorOutline, IoNewspaperOutline} from 'react-icons/io5';

import '../../../Style/CorePage/Components/SideButton.css';

export default function SideButton(props) {
  // const icon = props.icon;
  const desc = props.desc;
  const type = props.type;
  const styles = props.styles;

  let icon = null;
  switch (type) {
    case 'calc':
      icon = <IoCalculatorOutline color={styles.sideIconColor} size="40px" />;
      break;
    case 'plan':
      icon = <IoNewspaperOutline color={styles.sideIconColor} size="35px" />;
      break;
    default:
      icon = <div />;
  }

  return (
    <div id="sideButton">
      <div id="iconFixedSize">
        {/* <img id="buttonLogo" src={icon} alt={desc} /> */}
        {icon}
      </div>

      <p
        className="words"
        style={{color: styles.sideFontColor}}
        id="navigatorTitle">
        {desc}
      </p>
    </div>
  );
}
