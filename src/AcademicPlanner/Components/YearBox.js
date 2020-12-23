import {IoAdd, IoClose} from 'react-icons/io5';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import SemesterBox from './SemesterBox';
import {TOTAL_SEMESTER} from '../../Constants';
import './YearBox.css';

function YearBox(props) {
  const year = props.year;
  const darkTheme = props.darkTheme;
  const isShown = props.isShown;
  const transition = props.transition;
  const updateIsShown = props.updateIsShown;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;
  const currentYearIndex = props.currentYearIndex;
  const currentModuleData = props.currentModuleData;
  const updateData = props.updateData;

  const [showDeleteConfirmation, updateShowDeleteConfirmation] = useState(
    false,
  );
  const [showSemesterAddition, updateShowSemesterAddition] = useState(false);
  const [addSemesterErrorString, updateAddSemesterErrorString] = useState('');
  const [selectedSemester, updateSelectedSemester] = useState('0');

  const [semesterOneShown, updateSemesterOneShown] = useState(true);
  const [specialTermOneShown, updateSpecialTermOneShown] = useState(true);
  const [specialTermTwoShown, updateSpecialTermTwoShown] = useState(true);
  const [semesterTwoShown, updateSemesterTwoShown] = useState(true);

  function handleYearDeletion() {
    //Hide everything and trigger deletion inside semester box

    const tempCurrentModuleData = [...currentModuleData];
    const currentYear = tempCurrentModuleData[currentYearIndex];

    let MCToRemoveFromTotal = 0;
    const lastIndex = TOTAL_SEMESTER + 4;

    for (let i = 4; i < lastIndex; i++) {
      MCToRemoveFromTotal += currentYear[i].semModularCredit;
    }

    tempCurrentModuleData[5].totalModularCredits -= MCToRemoveFromTotal;
    tempCurrentModuleData[currentYearIndex] = [
      [],
      [],
      [],
      [],
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
      {semModularCredit: 0},
    ];

    updateData(tempCurrentModuleData);

    updateSemesterOneShown(true);
    updateSpecialTermOneShown(false);
    updateSpecialTermTwoShown(false);
    updateSemesterTwoShown(false);
    updateShowDeleteConfirmation(false);
    updateIsShown(false);
  }

  function handleSelectUpdate() {
    switch (selectedSemester) {
      case '0':
        if (semesterOneShown === false) {
          updateSemesterOneShown(true);
          updateShowSemesterAddition(false);
        } else {
          updateAddSemesterErrorString('The chosen semester is already shown!');
        }
        break;
      case '1':
        if (specialTermOneShown === false) {
          updateSpecialTermOneShown(true);
          updateShowSemesterAddition(false);
        } else {
          updateAddSemesterErrorString('The chosen semester is already shown!');
        }
        break;
      case '2':
        if (specialTermTwoShown === false) {
          updateSpecialTermTwoShown(true);
          updateShowSemesterAddition(false);
        } else {
          updateAddSemesterErrorString('The chosen semester is already shown!');
        }
        break;
      case '3':
        if (semesterTwoShown === false) {
          updateSemesterTwoShown(true);
          updateShowSemesterAddition(false);
        } else {
          updateAddSemesterErrorString('The chosen semester is already shown!');
        }
        break;
      default:
        break;
    }
    updateSelectedSemester('0');
  }

  //The order of component goes as error popup,
  //year addition popup, header and semester box display

  if (isShown) {
    return (
      <div id="mainYearBox">
        <Dialog
          open={showDeleteConfirmation}
          TransitionComponent={transition}
          // keepMounted
          onClose={() => {
            updateShowDeleteConfirmation(false);
          }}>
          <DialogTitle>Delete Year {year}</DialogTitle>
          <DialogContent>
            <DialogContentText id="error">
              Warning! All the data for Year {year} will be deleted. This action
              is irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => updateShowDeleteConfirmation(false)}
              color="primary">
              Cancel
            </Button>
            <Button onClick={handleYearDeletion} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={showSemesterAddition}
          TransitionComponent={transition}
          // keepMounted
          onClose={() => {
            updateShowSemesterAddition(false);
            updateAddSemesterErrorString('');
          }}>
          <DialogTitle>Academic Year to be Added</DialogTitle>
          <DialogContent>
            <FormControl variant="outlined">
              <Select
                native
                value={selectedSemester}
                onChange={(event) => {
                  updateAddSemesterErrorString('');
                  updateSelectedSemester(event.target.value);
                }}
                inputProps={{
                  name: 'Year',
                  id: 'outlined-age-native-simple',
                }}>
                <option value={0}>Semester 1</option>
                <option value={1}>Special Term 1</option>
                <option value={2}>Special Term 2</option>
                <option value={3}>Semester 2</option>
              </Select>
            </FormControl>

            <DialogContentText id="error">
              {addSemesterErrorString}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSelectUpdate} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <div id="yearBoxHeader">
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>Year {year}</p>
          <div id="yearButtonGroups">
            <IoAdd
              className="clickableIcon"
              color={`${darkTheme ? 'white' : 'black'}`}
              size="25px"
              onClick={() => updateShowSemesterAddition(true)}
            />
            <div id="buttonGroupSeperator" />
            <IoClose
              className="clickableIcon"
              color={`${darkTheme ? 'white' : 'grey'}`}
              size="25px"
              onClick={() => updateShowDeleteConfirmation(true)}
            />
          </div>
        </div>

        <div id="semesterWrapper">
          <SemesterBox
            currentSemester="Semester 1"
            currentSemesterIndex={0}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            transition={transition}
            isShown={semesterOneShown}
            moduleData={moduleData}
            moduleDataLength={moduleDataLength}
            updateIsShown={updateSemesterOneShown}
          />
          <SemesterBox
            currentSemester="Special Term 1"
            currentSemesterIndex={1}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            transition={transition}
            isShown={specialTermOneShown}
            moduleData={moduleData}
            moduleDataLength={moduleDataLength}
            updateIsShown={updateSpecialTermOneShown}
          />
          <SemesterBox
            currentSemester="Special Term 2"
            currentSemesterIndex={2}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            transition={transition}
            isShown={specialTermTwoShown}
            moduleData={moduleData}
            moduleDataLength={moduleDataLength}
            updateIsShown={updateSpecialTermTwoShown}
          />
          <SemesterBox
            currentSemester="Semester 2"
            currentSemesterIndex={3}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            transition={transition}
            isShown={semesterTwoShown}
            moduleData={moduleData}
            moduleDataLength={moduleDataLength}
            updateIsShown={updateSemesterTwoShown}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    currentModuleData: state.currentModuleData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateData: (newModuleData) => {
      dispatch({type: 'UPDATE_DATA', newData: newModuleData});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YearBox);
