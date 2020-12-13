import React from 'react';
import {IoAdd} from 'react-icons/io5';

import './AdditionButton.css';

export default function AdditionButton(props) {
  const darkTheme = props.darkTheme;
  const buttonDesc = props.buttonDesc;
  const onClick = props.onClick;

  return (
    <div id="wholeButton" onClick={onClick}>
      <p id="description" className={`${darkTheme ? 'dark' : 'light'}Words`}>
        {buttonDesc}
      </p>
      <IoAdd color="white" size="20px" />
    </div>
  );
}
