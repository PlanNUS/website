import React from 'react';
import {IoClose} from 'react-icons/io5';

import '../../../Style/CorePage/Components/ImportConfirmation.css';

import OwnButton from './OwnButton';

export default function ImportConfirmation(props) {
  const darkTheme = props.darkTheme;
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
      <div id="importConfirmWrapper">
        <div>
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
            New Import Available!
          </p>
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
            Should your current data be updated?
          </p>
        </div>
        <div id="controls">
          <IoClose
            className="clickableIcon"
            color={`${darkTheme ? 'white' : 'grey'}`}
            size="25px"
            onClick={handleCancel}
          />
          <div id="crossSpacer" />
          <div id="buttonWrapper">
            <OwnButton
              darkTheme={darkTheme}
              buttonDesc="Import"
              onClick={handleApprove}
            />
            <div id="spacer" />
            <OwnButton
              darkTheme={darkTheme}
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
