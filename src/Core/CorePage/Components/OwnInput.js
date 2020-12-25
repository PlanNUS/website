import React, {useEffect, useState} from 'react';

import '../../../Style/CorePage/Components/OwnInput.css';

export default function OwnInput(props) {
  const darkTheme = props.darkTheme;
  const desc = props.desc;
  const value = props.value;
  const onChangeHandler = props.onChangeHandler;
  const maxInputLength = props.maxInputLength;
  const type = props.type;

  const [borderColor, updateBorderColor] = useState('grey');

  useEffect(() => {
    darkTheme ? updateBorderColor('white') : updateBorderColor('grey');
  }, [darkTheme]);

  if (type === 'input') {
    return (
      <div id="inputFields">
        <p
          className={`${darkTheme ? 'dark' : 'light'}Words`}
          id="inputFieldsText">
          {desc}
        </p>
        <div id="inputWrapper" style={{color: borderColor}}>
          <input
            value={value}
            type="text"
            maxLength={maxInputLength}
            className={`${darkTheme ? 'dark' : 'light'}Words`}
            onChange={(event) => onChangeHandler(event.target.value)}
          />
        </div>
      </div>
    );
  } else if (type === 'display') {
    return (
      <div id="inputFields">
        <p
          className={`${darkTheme ? 'dark' : 'light'}Words`}
          id="inputFieldsText">
          {desc}
        </p>
        <div id="suTextinput">
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>{value}</p>
        </div>
      </div>
    );
  } else if (type === 'cap') {
    return (
      <div id="inputFields" style={{borderWidth: 0}}>
        <p
          className={`${darkTheme ? 'dark' : 'light'}Words`}
          id="inputFieldsText">
          {desc}
        </p>
        <div id="suTextinput">
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
            {(Math.floor(value * 100) / 100).toFixed(2)}
          </p>
        </div>
      </div>
    );
  }
}
