import {IoAdd, IoClose} from 'react-icons/io5';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './SemesterBox.css';

import {VerifyModulesForAddition} from '../Functions/VerifyModule';
import Search from '../Functions/Search';
import ModuleBox from './ModuleBox';

function SemesterBox(props) {
  const currentSemester = props.currentSemester;
  const transition = props.transition;
  const isShown = props.isShown;
  const darkTheme = props.darkTheme;
  const updateIsShown = props.updateIsShown;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;
  const currentYearIndex = props.currentYearIndex;
  const currentSemesterIndex = props.currentSemesterIndex;
  const currentModuleData = props.currentModuleData;
  const updateData = props.updateData;

  const numberOfDataDisplay = 5;

  const [showDeleteConfirmation, updateShowDeleteConfirmation] = useState(
    false,
  );
  const [showAdditionPopup, updateShowAdditionPopup] = useState(false);
  const [searchStringByUser, updateSearchStringByUser] = useState('');
  const [searchDataToDisplay, updateSearchDataToDisplay] = useState([]);
  const [chipsDataToDisplay, updateChipsDataToDisplay] = useState([]);
  const [moduleInSemester, updateModuleInSemester] = useState([]);

  useEffect(() => {
    const tempModuleInSemester = [
      ...currentModuleData[currentYearIndex][currentSemesterIndex],
    ];
    updateModuleInSemester(tempModuleInSemester);
  }, [currentModuleData, currentSemesterIndex, currentYearIndex]);

  useEffect(() => {
    if (typeof searchStringByUser === 'string') {
      if (searchStringByUser.length < 2) {
        updateSearchDataToDisplay([]);
      } else {
        let userSearchIndex = Search(
          moduleData,
          moduleDataLength,
          searchStringByUser.toUpperCase(),
        );

        if (userSearchIndex !== -1) {
          const temporaryDisplayData = [];

          for (let i = 0; i < numberOfDataDisplay; i++) {
            temporaryDisplayData.push(moduleData[userSearchIndex + i]);
          }

          updateSearchDataToDisplay(temporaryDisplayData);
        } else {
          updateSearchDataToDisplay([]);
        }
      }
    }
  }, [searchStringByUser, moduleData, moduleDataLength]);

  function handleSemesterDeletion() {
    //Clear array;
    updateShowDeleteConfirmation(false);
    updateIsShown(false);
  }

  function addChip(indexToAdd) {
    if (typeof indexToAdd === 'number') {
      let tempArr = [...chipsDataToDisplay];
      tempArr.push(searchDataToDisplay[indexToAdd]);
      updateChipsDataToDisplay(tempArr);
    }
  }

  function deleteChip(indexToDelete) {
    if (typeof indexToDelete === 'number') {
      const tempArr = [...chipsDataToDisplay];
      tempArr.splice(indexToDelete);
      updateChipsDataToDisplay(tempArr);
    }
  }

  function addToGlobalData() {
    if (chipsDataToDisplay.length !== 0) {
      const checkString = JSON.stringify(moduleInSemester);

      const modulestoAdd = [];
      let modularCreditsToAdd = 0;

      //Updating data
      const tempCurrentModuleData = [...currentModuleData];
      const totalModularCredits = tempCurrentModuleData[5].totalModularCredits;
      console.log(tempCurrentModuleData);

      for (let i = 0; i < chipsDataToDisplay.length; i++) {
        if (!checkString.includes(chipsDataToDisplay[i])) {
          // const flags = {
          //   isFlagged: false,
          //   prereqCleared: true, //Value must be true
          //   prereqInSameSem: false, //Value must be false
          //   coreqInSameSem: true, //Value must be true
          //   precluAdded: false, //value must be false
          // };
          const newModule = VerifyModulesForAddition(
            chipsDataToDisplay[i],
            currentYearIndex,
            currentSemesterIndex,
            currentModuleData,
            totalModularCredits,
          );
          // const newModule = {
          //   moduleCode: 'CS1010',
          //   moduleCredit: '4',
          //   isFlagged: true,
          //   prereqCleared: false,
          //   prereqInSameSem: false,
          //   coreqInSameSem: false,
          //   precluAdded: false,
          // };
          console.log(newModule);
          console.log(JSON.stringify(newModule));
          modulestoAdd.push(newModule);
          modularCreditsToAdd += parseInt(newModule.moduleCredit);
          updateChipsDataToDisplay([]);
        }
      }

      const newArrayOfModules = tempCurrentModuleData[currentYearIndex][
        currentSemesterIndex
      ].concat(modulestoAdd);

      tempCurrentModuleData[currentYearIndex][
        currentSemesterIndex
      ] = newArrayOfModules;

      tempCurrentModuleData[currentYearIndex][
        currentSemesterIndex + 4
      ].semModularCredit += modularCreditsToAdd;

      console.log(
        tempCurrentModuleData[currentYearIndex][currentSemesterIndex + 4]
          .semModularCredit,
      );

      tempCurrentModuleData[5].totalModularCredits += modularCreditsToAdd;
      updateData(tempCurrentModuleData);

      updateShowAdditionPopup(false);
    }
  }

  if (isShown) {
    return (
      <div id="mainBox">
        <Dialog
          open={showAdditionPopup}
          TransitionComponent={transition}
          // keepMounted
          onClose={() => {
            updateShowAdditionPopup(false);
          }}>
          <DialogTitle>Add modules to {currentSemester}</DialogTitle>
          <DialogContent>
            <Autocomplete
              id="combo-box-demo"
              // value="dfkasldflk"
              onInputChange={(event) => {
                // console.log('inside input change ' + event.target.value);
                updateSearchStringByUser(event.target.value);
              }}
              onChange={(event) => {
                // console.log(
                //   JSON.stringify(searchDataToDisplay[event.target.value]),
                // );
                addChip(event.target.value);
              }} //On change happens when user chooses sth
              options={searchDataToDisplay}
              getOptionLabel={(option) => option.moduleCode}
              style={{width: 300}}
              renderInput={(params) => (
                <TextField {...params} label="Module Code" variant="outlined" />
              )}
            />

            {chipsDataToDisplay.map((data, index) => {
              return (
                <Chip
                  key={index}
                  label={data.moduleCode}
                  onDelete={() => deleteChip(index)}
                  id="chip"
                />
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => updateShowAdditionPopup(false)}
              color="primary">
              Cancel
            </Button>
            <Button onClick={addToGlobalData} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={showDeleteConfirmation}
          TransitionComponent={transition}
          // keepMounted
          onClose={() => {
            updateShowDeleteConfirmation(false);
          }}>
          <DialogTitle>Delete {currentSemester}</DialogTitle>
          <DialogContent>
            <DialogContentText id="error">
              Warning! All the data for {currentSemester} will be deleted. This
              action is irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => updateShowDeleteConfirmation(false)}
              color="primary">
              Cancel
            </Button>
            <Button onClick={handleSemesterDeletion} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <div id="semesterHeader">
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
            {currentSemester}
          </p>
          <div id="semesterButtonGroups">
            <IoAdd
              className="clickableIcon"
              color={`${darkTheme ? 'white' : 'black'}`}
              size="25px"
              onClick={() => updateShowAdditionPopup(true)}
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

        {moduleInSemester.map((currentData, index) => (
          <ModuleBox
            key={currentData.moduleCode}
            module={currentData}
            darkTheme={darkTheme}
          />
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(SemesterBox);
