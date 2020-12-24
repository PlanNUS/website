/*
 *https://www.npmjs.com/package/react-switch
 */

import React, {useEffect, useState} from 'react';
import ToggleSwitch from 'react-switch';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Slide from '@material-ui/core/Slide';

import '../../Style/CorePage/CorePage.css';
import {Transition, AcadamicYear, FLAGS} from '../../Constants';

import Navigator from './Navigator';
import Footer from './Footer';

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

  // const acadamicYear = '2020-2021';
  const [shareLink, updateShareLink] = useState('');
  const [isLinkDialogOpen, updateIsLinkDialogOpen] = useState(false);
  const [importData, updateImportData] = useState([]);
  const [isImportConfirmShown, updateIsImportConfirmShown] = useState(false);
  const [darkTheme, updateDarkTheme] = useState(false);
  const [isLoading, updateIsLoading] = useState(true);
  const [isLoadingSuccess, updateIsLoadingSuccess] = useState(false);
  const [moduleData, updateModuleData] = useState([]);
  const [moduleDataLength, updateModuleDataLength] = useState(-1);

  useEffect(() => {
    const stringToStore = JSON.stringify(globalData);
    Cookies.set('plannusLocalGlobalData', stringToStore);
  }, [globalData]);

  useEffect(() => {
    updateDarkTheme(globalData[5].isDarkModeChecked);
  }, [globalData]);

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
    const searchText = `?${JSON.stringify(globalData)}`;
    // const newURL =
    //   window.location.protocol +
    //   '//' +
    //   window.location.host +
    //   '/' +
    //   window.location.pathname +
    //   searchText;
    const newURL = new URL(window.location.href);
    newURL.search = searchText;
    updateShareLink(newURL);
    updateIsLinkDialogOpen(true);
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
          ...FLAGS,
        };

        tempModuleData.push(tempObj);
      }

      updateModuleData(tempModuleData);
      updateModuleDataLength(tempModuleData.length);

      const localData = Cookies.get('plannusLocalGlobalData');
      if (localData !== undefined) {
        updateData(JSON.parse(localData));
      }

      if (window.location.search !== '') {
        const importArr = window.location.search.split('?');
        // console.log(importArr);
        if (
          importArr[1].length !== localData.length &&
          !importArr[1].includes(localData)
        ) {
          const decodedString = decodeURIComponent(importArr[1]);
          updateImportData(JSON.parse(decodedString));
          updateIsImportConfirmShown(true);
        }
      }
      updateIsLoading(false);
      updateIsLoadingSuccess(true);
    } catch (err) {
      updateIsLoading(false);
      updateIsLoadingSuccess(false);
    }
  }

  if (isLoading) {
    return (
      <div id="wholePageCenter">
        {/* <img src={ErrorIcon} alt="LoadingError" height="70px" /> */}
        <h1 className="lightWords">Loading...</h1>
      </div>
    );
  } else {
    if (isLoadingSuccess) {
      return (
        <div id={`${darkTheme ? 'dark' : 'light'}Theme`}>
          <Dialog
            open={isLinkDialogOpen}
            TransitionComponent={Transition}
            // keepMounted
            onClose={() => {
              updateIsLinkDialogOpen(false);
            }}>
            <DialogTitle>Share Link!</DialogTitle>
            <DialogContent>
              <DialogContentText>
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
                onClick={() => updateIsLinkDialogOpen(false)}
                color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>

          <div id="headerBanner">
            <div id="logoPadding">
              <img alt="PlanNUS Home" src={Logo} />
            </div>

            <div id="rightMenu">
              <div id="shareButton" onClick={handleShareLinkOpen}>
                <p id="shareText">Share</p>
              </div>
              <div id="darkModeChecker">
                <p
                  className={`${darkTheme ? 'dark' : 'light'}Words`}
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
          />

          <Footer darkTheme={darkTheme} />
        </div>
      );
    } else {
      return (
        <div id="wholePageCenter">
          <img src={ErrorIcon} alt="LoadingError" height="70px" />
          <h1 id="error" className="lightWords">
            Sorry! Something seems to went wrong (Error code: 1)
          </h1>
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
