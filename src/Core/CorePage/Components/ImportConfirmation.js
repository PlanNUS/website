import React from 'react';
import {IoClose} from 'react-icons/io5';

import '../../../Style/CorePage/Components/ImportConfirmation.css';

import OwnButton from './OwnButton';

export default function ImportConfirmation(props) {
  const styles = props.styles;
  const isShown = props.isShown;
  const handleImportConfirmation = props.handleImportConfirmation;

  function handleCancel() {
    window.location.search = '';
    handleImportConfirmation(false);
  }

  function handleApprove() {
    window.location.search = '';
    handleImportConfirmation(true);
  }

  if (isShown) {
    return (
      <div
        id="importConfirmWrapper"
        style={{
          borderWidth: styles.notificationWidth,
          borderColor: styles.notificationBorderColor,
          backgroundColor: styles.notificationBackgroundColor,
        }}>
        <div>
          <h3 className="words" style={{color: styles.fontColor}}>
            New Import Available!
          </h3>
          <br />
          <p className="words" style={{color: styles.fontColor}}>
            Should your current data be updated?
          </p>
          <p className="words" style={{color: styles.fontColor}}>
            This will replace all current data for both Planner and Calculator.
          </p>
        </div>
        <div id="controls">
          <IoClose
            className="clickableIcon"
            style={{color: styles.controlButtons}}
            size="25px"
            onClick={handleCancel}
          />
          <div id="crossSpacer" />
          <div id="buttonWrapper">
            <OwnButton
              styles={styles}
              buttonDesc="Import"
              onClick={handleApprove}
            />
            <div id="spacer" />
            <OwnButton
              styles={styles}
              buttonDesc="Maybe Later"
              onClick={handleCancel}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
