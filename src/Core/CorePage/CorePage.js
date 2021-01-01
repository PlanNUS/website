/*
 *https://www.npmjs.com/package/react-switch
 */

import React, {useEffect, useState} from 'react';
import ToggleSwitch from 'react-switch';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import '../../Style/CorePage/CorePage.css';
import {
  Transition,
  AcadamicYear,
  FLAGS,
  STYLES,
  DARK_STYLES,
} from '../../Constants';

import Navigator from './Navigator';
import Footer from './Footer';
import {dataToLink, linkToData} from './Functions/LinkHandler';

import Logo from './Assets/Title.png';
import ErrorIcon from './Assets/SadFace.png';
import {TextField} from '@material-ui/core';

function CorePage(props) {
  const globalData = props.globalData;
  const updateData = props.updateData;

  // console.log(window.location.protocol);
  // console.log(window.location.host);
  // console.log(window.location.pathname);
  // console.log(window.location.search);
  // console.log(window.location.href);
  // console.log(window.location.hash);
  // const acadamicYear = '2020-2021';
  const [shareLink, updateShareLink] = useState('');
  const [isLinkDialogOpen, updateIsLinkDialogOpen] = useState(false);
  const [importData, updateImportData] = useState([]);
  const [isImportConfirmShown, updateIsImportConfirmShown] = useState(false);
  const [darkTheme, updateDarkTheme] = useState(false);
  const [styles, updateStyles] = useState(STYLES);
  const [isLoading, updateIsLoading] = useState(true);
  const [isLoadingSuccess, updateIsLoadingSuccess] = useState(false);
  const [isLoadingSuccessString, updateIsLoadingSuccessString] = useState('');
  const [moduleData, updateModuleData] = useState([]);
  const [moduleDataLength, updateModuleDataLength] = useState(-1);

  useEffect(() => {
    updateIsLoading(true);

    if (typeof Storage !== 'undefined') {
      const stringToStore = JSON.stringify(globalData);
      window.localStorage.plannusLocalGlobalData = stringToStore;
    } else {
      updateIsLoadingSuccess(false);
      updateIsLoadingSuccessString(
        'Sorry! Update your browser to use PlanNUS (Error code: 2)',
      );
    }

    updateDarkTheme(globalData[5].isDarkModeChecked);
    updateIsLoading(false);
    // console.log(globalData);
  }, [globalData]);

  useEffect(() => {
    if (darkTheme) {
      updateStyles(DARK_STYLES);
    } else {
      updateStyles(STYLES);
    }
  }, [darkTheme]);

  function handleDarkModeToggle(isChecked) {
    const tempGlobalData = [...globalData];
    tempGlobalData[5].isDarkModeChecked = isChecked;
    updateData(tempGlobalData);
    updateDarkTheme(isChecked);
  }

  function handleImportConfirmation(isImportOk) {
    if (isImportOk) {
      const tempGlobalData = [...importData];
      updateData(tempGlobalData);
    }

    updateImportData([]);
    updateIsImportConfirmShown(false);
  }

  function handleShareLinkOpen() {
    // const searchText = `?${JSON.stringify(globalData)}`;
    // const newURL =
    //   window.location.protocol +
    //   '//' +
    //   window.location.host +
    //   '/' +
    //   window.location.pathname +
    //   searchText;

    dataToLink(globalData).then((result) => {
      const newURL = window.location.href + '?' + result;
      updateShareLink(newURL);
      updateIsLinkDialogOpen(true);
    });
  }

  if (isLoading) {
    try {
      //Retrival of data from server
      const url =
        'https://api.nusmods.com/v2/' + AcadamicYear + '/moduleInfo.json';

      // const url = '';
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open('GET', url, false); //False for synchorous request
      xmlHttp.send(null);

      const fetchedModuleData = JSON.parse(xmlHttp.responseText);

      let tempModuleData = [];
      for (let i = 0; i < fetchedModuleData.length; i++) {
        let tempObj = {
          moduleCode: fetchedModuleData[i].moduleCode,
          moduleCredit: fetchedModuleData[i].moduleCredit,
          attributes: fetchedModuleData[i].attributes,
          ...FLAGS,
        };

        tempModuleData.push(tempObj);
      }

      updateModuleData(tempModuleData);
      updateModuleDataLength(tempModuleData.length);

      const localData = window.localStorage.plannusLocalGlobalData;
      if (localData !== undefined) {
        const parsedData = JSON.parse(localData);

        // localStorage.removeItem('plannusLocalGlobalData');

        if (parsedData[5].suUsed === undefined) {
          localStorage.removeItem('plannusLocalGlobalData');
        } else {
          updateData(parsedData);
        }
      }

      const URLArr = window.location.href.split('#');
      if (URLArr.length === 2) {
        const dataStringArr = URLArr[1].split('?');
        if (dataStringArr.length === 2) {
          const dataString = dataStringArr[1];
          const decodedString = decodeURIComponent(dataString);

          linkToData(decodedString).then((result) => {
            if (result !== undefined) {
              const newDataString = JSON.stringify(result);

              if (localData === undefined) {
                updateImportData(result);
                updateIsImportConfirmShown(true);
              } else if (
                !(
                  newDataString.length === localData.length &&
                  newDataString.includes(localData)
                )
              ) {
                updateImportData(result);
                updateIsImportConfirmShown(true);
              }
            }
          });
        }
      }

      updateIsLoading(false);
      updateIsLoadingSuccess(true);
    } catch (err) {
      updateIsLoading(false);
      updateIsLoadingSuccess(false);
      updateIsLoadingSuccessString(
        'Sorry! Something seems to went wrong (Error code: 1)',
      );
    }
  }

  if (isLoading) {
    return (
      <div id="wholePageCenter">
        {/* <img src={ErrorIcon} alt="LoadingError" height="70px" /> */}
        <h3 className="lightWords">Loading...</h3>
      </div>
    );
  } else {
    if (isLoadingSuccess) {
      return (
        <div
          id="globalTheme"
          style={{backgroundColor: styles.globalBackgroundColor}}>
          <div id="forceFooterToBtm">
            <div id="fitContent">
              <Dialog
                open={isLinkDialogOpen}
                TransitionComponent={Transition}
                // keepMounted
                onClose={() => {
                  updateIsLinkDialogOpen(false);
                }}>
                <div style={{backgroundColor: styles.dialogBackgroundColor}}>
                  <DialogTitle style={{color: styles.dialogFontColor}}>
                    Share Link!
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText style={{color: styles.dialogFontColor}}>
                      Copy the link below to share your plan with friends!
                    </DialogContentText>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={shareLink}
                      disabled
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      style={{color: styles.dialogButtonColor}}
                      onClick={() => updateIsLinkDialogOpen(false)}
                      color="primary">
                      Done
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>

              <div id="headerBanner">
                <div id="logoPadding">
                  <img alt="PlanNUS Home" src={Logo} />
                </div>

                <div id="rightMenu">
                  <div id="shareButton" onClick={handleShareLinkOpen}>
                    <p
                      id="shareText"
                      style={{color: styles.appButtonFontColor}}>
                      Share
                    </p>
                  </div>
                  <div id="darkModeChecker">
                    <p
                      className="words"
                      style={{color: styles.fontColor}}
                      id="darkModeWords">
                      Dark Mode
                    </p>
                    <div id="spacer" />
                    <ToggleSwitch
                      id="switch"
                      onChange={(checked) => handleDarkModeToggle(checked)}
                      checked={darkTheme}
                    />
                  </div>
                </div>
              </div>

              <Navigator
                isImportConfirmShown={isImportConfirmShown}
                handleImportConfirmation={handleImportConfirmation}
                darkTheme={darkTheme}
                moduleData={moduleData}
                moduleDataLength={moduleDataLength}
                transition={Transition}
                styles={styles}
              />
            </div>
            <Footer darkTheme={darkTheme} />
          </div>
        </div>
      );
    } else {
      return (
        <div id="wholePageCenter">
          <img src={ErrorIcon} alt="LoadingError" height="50px" />
          <div id="seperator" />
          <h3 className="lightWords">{isLoadingSuccessString}</h3>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    globalData: state.globalData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateData: (newModuleData) => {
      dispatch({type: 'UPDATE_DATA', newData: newModuleData});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CorePage);
