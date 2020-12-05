import React from 'react';

import './SideButton.css';

export default function SideButton(props) {
  const icon = props.icon;
  const desc = props.desc;
  const darkTheme = props.darkTheme;

  return (
    <div id="sideButton">
      <div id="iconFixedSize">
        <img id="buttonLogo" src={icon} alt={desc} />
      </div>

      <p className={`${darkTheme ? 'dark' : 'light'}Words`}>{desc}</p>
    </div>
  );
}
