import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useLocation} from 'react-router-dom';

import '../../Style/AcademicPlanner/AcademicPlanner.css';
import '../../Style/Common/AppCommons.css';

import AcadYearBox from './Components/AcadYearBox';
import OwnButton from '../CorePage/Components/OwnButton';
import VerifyAllModules from './Functions/VerifyModule';

function AcademicPlanner(props) {
  const darkTheme = props.darkTheme;
  const transition = props.transition;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;
  const globalData = props.globalData;
  const updateData = props.updateData;
  const updateCurrLocation = props.updateCurrLocation;

  const [toDisplayArr, updateToDisplayArr] = useState([
    //Year 1
    [
      true, //Is current year shown? ("Overrides" the rest)
      true, //Is Sem 1 shown?
      false, //Is Special Term 1 shown?
      false, //Is Special Term 2 shown?
      false, //Is Sem 2 shown?
    ],

    //Year 2
    [
      false, //Is current year shown? ("Overrides" the rest)
      true, //Is Sem 1 shown?
      false, //Is Special Term 1 shown?
      false, //Is Special Term 2 shown?
      false, //Is Sem 2 shown?
    ],

    //Year 3,
    [
      false, //Is current year shown? ("Overrides" the rest)
      true, //Is Sem 1 shown?
      false, //Is Special Term 1 shown?
      false, //Is Special Term 2 shown?
      false, //Is Sem 2 shown?
    ],

    //Year 4
    [
      false, //Is current year shown? ("Overrides" the rest)
      true, //Is Sem 1 shown?
      false, //Is Special Term 1 shown?
      false, //Is Special Term 2 shown?
      false, //Is Sem 2 shown?
    ],

    //Year 5
    [
      false, //Is current year shown? ("Overrides" the rest)
      true, //Is Sem 1 shown?
      false, //Is Special Term 1 shown?
      false, //Is Special Term 2 shown?
      false, //Is Sem 2 shown?
    ],
  ]);

  const [showModal, updateShowModal] = useState(false);
  const [buttonString, updateButtonString] = useState('Check Requirements');

  const [yearOneShown, updateYearOneShown] = useState(true);
  const [yearTwoShown, updateYearTwoShown] = useState(false);
  const [yearThreeShown, updateYearThreeShown] = useState(false);
  const [yearFourShown, updateYearFourShown] = useState(false);
  const [yearFiveShown, updateYearFiveShown] = useState(false);

  const [selectedYear, updateSelectedYear] = useState('0');

  const [addYearErrorString, updateAddYearErrorString] = useState('');

  const currLocation = useLocation();
  useEffect(() => {
    updateCurrLocation(currLocation);
  }, [updateCurrLocation, currLocation]);

  useEffect(() => {
    const tempToDisplayArr = [...globalData[5].isDisplayed];

    updateYearOneShown(tempToDisplayArr[0][0]);
    updateYearTwoShown(tempToDisplayArr[1][0]);
    updateYearThreeShown(tempToDisplayArr[2][0]);
    updateYearFourShown(tempToDisplayArr[3][0]);
    updateYearFiveShown(tempToDisplayArr[4][0]);

    updateToDisplayArr(tempToDisplayArr);
  }, [globalData]);

  function handleSelectUpdate() {
    switch (selectedYear) {
      case '0':
        if (yearOneShown === false) {
          const tempGlobalData = [...globalData];
          tempGlobalData[5].isDisplayed[0][0] = true;
          updateData(tempGlobalData);
          updateYearOneShown(true);
          updateShowModal(false);
        } else {
          updateAddYearErrorString('The chosen year is already shown!');
        }
        break;
      case '1':
        if (yearTwoShown === false) {
          const tempGlobalData = [...globalData];
          tempGlobalData[5].isDisplayed[1][0] = true;
          updateData(tempGlobalData);
          updateYearTwoShown(true);
          updateShowModal(false);
        } else {
          updateAddYearErrorString('The chosen year is already shown!');
        }
        break;
      case '2':
        if (yearThreeShown === false) {
          const tempGlobalData = [...globalData];
          tempGlobalData[5].isDisplayed[2][0] = true;
          updateData(tempGlobalData);
          updateYearThreeShown(true);
          updateShowModal(false);
        } else {
          updateAddYearErrorString('The chosen year is already shown!');
        }
        break;
      case '3':
        if (yearFourShown === false) {
          const tempGlobalData = [...globalData];
          tempGlobalData[5].isDisplayed[3][0] = true;
          updateData(tempGlobalData);
          updateYearFourShown(true);
          updateShowModal(false);
        } else {
          updateAddYearErrorString('The chosen year is already shown!');
        }
        break;
      case '4':
        if (yearFiveShown === false) {
          const tempGlobalData = [...globalData];
          tempGlobalData[5].isDisplayed[4][0] = true;
          updateData(tempGlobalData);
          updateYearFiveShown(true);
          updateShowModal(false);
        } else {
          updateAddYearErrorString('The chosen year is already shown!');
        }
        break;
      default:
        break;
    }
    updateSelectedYear('0');
  }

  function handleCheckRequirement() {
    updateButtonString('Checking...');
    const newAllData = VerifyAllModules(globalData);
    updateData(newAllData);
    updateButtonString('Check Requirements');
  }

  return (
    <div id="appWrapper">
      <div id="appHeader">
        <p className={`${darkTheme ? 'dark' : 'light'}Words`} id="appTitle">
          Academic Planner
        </p>
        <div id="rightGroup">
          <OwnButton
            darkTheme={darkTheme}
            buttonDesc={buttonString}
            type="sync"
            onClick={() => {
              updateButtonString('Checking...');
              setTimeout(handleCheckRequirement, 500);
            }}
          />
          <div id="buttonSpacer" />
          <OwnButton
            darkTheme={darkTheme}
            buttonDesc="Add Year"
            type="add"
            onClick={() => updateShowModal(true)}
          />
        </div>
      </div>

      <Dialog
        open={showModal}
        TransitionComponent={transition}
        // keepMounted
        onClose={() => {
          updateShowModal(false);
          updateAddYearErrorString('');
        }}>
        <DialogTitle>Academic Year to be Added</DialogTitle>
        <DialogContent>
          <FormControl variant="outlined">
            <Select
              native
              value={selectedYear}
              onChange={(event) => {
                updateAddYearErrorString('');
                updateSelectedYear(event.target.value);
              }}
              inputProps={{
                name: 'Year',
                id: 'outlined-age-native-simple',
              }}>
              <option value={0}>Year 1</option>
              <option value={1}>Year 2</option>
              <option value={2}>Year 3</option>
              <option value={3}>Year 4</option>
              <option value={4}>Year 5</option>
            </Select>
          </FormControl>

          <DialogContentText id="error">{addYearErrorString}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updateShowModal(false);
              updateAddYearErrorString('');
            }}
            color="primary">
            Cancel
          </Button>
          <Button onClick={handleSelectUpdate} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <AcadYearBox
        darkTheme={darkTheme}
        year="1"
        currentYearIndex={0}
        isShown={yearOneShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        updateIsShown={updateYearOneShown}
        semToDisplay={toDisplayArr[0]}
      />
      <AcadYearBox
        darkTheme={darkTheme}
        year="2"
        currentYearIndex={1}
        isShown={yearTwoShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        updateIsShown={updateYearTwoShown}
        semToDisplay={toDisplayArr[1]}
      />
      <AcadYearBox
        darkTheme={darkTheme}
        year="3"
        currentYearIndex={2}
        isShown={yearThreeShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        updateIsShown={updateYearThreeShown}
        semToDisplay={toDisplayArr[2]}
      />
      <AcadYearBox
        darkTheme={darkTheme}
        year="4"
        currentYearIndex={3}
        isShown={yearFourShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        updateIsShown={updateYearFourShown}
        semToDisplay={toDisplayArr[3]}
      />
      <AcadYearBox
        darkTheme={darkTheme}
        year="5"
        currentYearIndex={4}
        isShown={yearFiveShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        updateIsShown={updateYearFiveShown}
        semToDisplay={toDisplayArr[4]}
      />
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(AcademicPlanner);
