import React from 'react';

import '../../../Style/CorePage/Components/OwnInput.css';

export default function OwnInput(props) {
  const styles = props.styles;
  const desc = props.desc;
  const value = props.value;
  const onChangeHandler = props.onChangeHandler;
  const maxInputLength = props.maxInputLength;
  const type = props.type;
  let width = props.width;

  if (width === undefined) {
    width = 20;
  }

  if (type === 'input') {
    return (
      <div
        id="inputFields"
        style={{
          borderWidth: styles.semWidth,
          borderColor: styles.semBorderColor,
          backgroundColor: styles.semBackgroundColor,
        }}>
        <p
          className="words"
          style={{color: styles.fontColor}}
          id="inputFieldsText">
          {desc}
        </p>
        <div
          id="inputWrapper"
          style={{
            borderWidth: styles.inputWidth,
            borderColor: styles.inputBorderColor,
            backgroundColor: styles.inputBackgroundColor,
          }}>
          {/* style={{ color: borderColor }}> */}
          <input
            value={value}
            type="text"
            style={{width: width, color: styles.fontColor}}
            maxLength={maxInputLength}
            className="words"
            //Remember to add style if needed (Currently cannot add)
            onChange={(event) => onChangeHandler(event.target.value)}
          />
        </div>
      </div>
    );
  } else if (type === 'display') {
    return (
      <div
        id="inputFields"
        style={{
          borderWidth: styles.semWidth,
          borderColor: styles.semBorderColor,
          backgroundColor: styles.semBackgroundColor,
        }}>
        <p
          className="words"
          style={{color: styles.fontColor}}
          id="inputFieldsText">
          {desc}
        </p>
        <div id="suTextinput">
          <p className="words" style={{color: styles.fontColor}}>
            {value}
          </p>
        </div>
      </div>
    );
  } else if (type === 'su') {
    return (
      <div
        id="inputFields"
        className={`${value < 0 ? `flag` : `none`}Background`}
        style={{
          borderWidth: styles.semWidth,
          borderColor: styles.semBorderColor,
          backgroundColor: styles.semBackgroundColor,
        }}>
        <p
          className="words"
          style={{color: styles.fontColor}}
          id="inputFieldsText">
          {desc}
        </p>
        <div id="suTextinput">
          <p className="words" style={{color: styles.fontColor}}>
            {value}
          </p>
        </div>
      </div>
    );
  } else if (type === 'cap') {
    return (
      <div id="inputFields" style={{borderWidth: 0}}>
        <p
          className="words"
          style={{color: styles.fontColor}}
          id="inputFieldsText">
          {desc}
        </p>
        <div id="suTextinput">
          <p className="words" style={{color: styles.fontColor}}>
            {(Math.floor(value * 100) / 100).toFixed(2)}
            {/* {((value * 100) / 100).toFixed(2)} */}
          </p>
        </div>
      </div>
    );
  }
}
