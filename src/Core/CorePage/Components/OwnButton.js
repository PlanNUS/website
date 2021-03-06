import React from 'react';
import {IoSync, IoEye, IoEyeOff} from 'react-icons/io5';
import {MdAdd} from 'react-icons/md';

// import './OwnButton.css';
import '../../../Style/CorePage/Components/OwnButton.css';

export default function OwnButton(props) {
  const buttonDesc = props.buttonDesc;
  const onClick = props.onClick;
  const type = props.type;
  const styles = props.styles;

  let icon;
  switch (type) {
    case 'add':
      icon = <MdAdd color={styles.appButtonIconColor} size="25px" />;
      break;
    case 'sync':
      icon = <IoSync color={styles.appButtonIconColor} size="25px" />;
      break;
    case 'Show Details':
      icon = <IoEye color={styles.appButtonIconColor} size="25px" />;
      break;
    case 'Hide Details':
      icon = <IoEyeOff color={styles.appButtonIconColor} size="25px" />;
      break;
    default:
      icon = <div />;
  }

  return (
    <div id="wholeButton" onClick={onClick}>
      <p
        id="description"
        className="words"
        style={{color: styles.appButtonFontColor}}>
        {buttonDesc}
      </p>
      {icon}
    </div>
  );
}
