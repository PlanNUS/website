import React from 'react';
import {IoAdd, IoSync} from 'react-icons/io5';

// import './OwnButton.css';
import '../../../Style/CorePage/Components/OwnButton.css';

export default function OwnButton(props) {
  const darkTheme = props.darkTheme;
  const buttonDesc = props.buttonDesc;
  const onClick = props.onClick;
  const type = props.type;

  let icon;
  switch (type) {
    case 'add':
      icon = <IoAdd color="white" size="25px" />;
      break;
    case 'sync':
      icon = <IoSync color="white" size="25px" />;
      break;
    default:
      icon = <div />;
  }

  return (
    <div id="wholeButton" onClick={onClick}>
      <p id="description" className={`${darkTheme ? 'dark' : 'light'}Words`}>
        {buttonDesc}
      </p>
      {icon}
    </div>
  );
}
