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

import '../../../Style/AcademicPlanner/Components/AcadSemesterBox.css';
import '../../../Style/Common/SemBoxCommons.css';
import {FLAGS} from '../../../Constants';

// import {VerifyModulesForAddition} from '../Functions/VerifyModule';
import Search from '../Functions/Search';
import AcadModuleBox from './AcadModuleBox';

function AcadSemesterBox(props) {
  const currentSemester = props.currentSemester;
  const transition = props.transition;
  const isShown = props.isShown;
  const darkTheme = props.darkTheme;
  const updateIsShown = props.updateIsShown;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;
  const currentYearIndex = props.currentYearIndex;
  const currentSemesterIndex = props.currentSemesterIndex;
  const globalData = props.globalData;
  const updateData = props.updateData;

  const numberOfDataDisplay = 5;

  const [showDeleteConfirmation, updateShowDeleteConfirmation] = useState(
    false,
  );
  const [showAdditionPopup, updateShowAdditionPopup] = useState(false);
  const [showDuplicationPopup, updateShowDuplicationPopup] = useState(false);
  const [duplicatedModule, updateDuplicatedModules] = useState([]);
  const [searchStringByUser, updateSearchStringByUser] = useState('');
  const [searchDataToDisplay, updateSearchDataToDisplay] = useState([]);
  const [chipsDataToDisplay, updateChipsDataToDisplay] = useState([]);
  const [moduleInSemester, updateModuleInSemester] = useState([]);

  useEffect(() => {
    const tempModuleInSemester = [
      ...globalData[currentYearIndex][currentSemesterIndex],
    ];
    updateModuleInSemester(tempModuleInSemester);
  }, [globalData, currentSemesterIndex, currentYearIndex]);

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
    const tempGlobalData = [...globalData];
    tempGlobalData[5].totalModularCredits -=
      tempGlobalData[currentYearIndex][
        currentSemesterIndex + 4
      ].semModularCredit;

    tempGlobalData[currentYearIndex][currentSemesterIndex] = [];
    tempGlobalData[currentYearIndex][
      currentSemesterIndex + 4
    ].semModularCredit = 0;

    tempGlobalData[5].isDisplayed[currentYearIndex][
      currentSemesterIndex + 1
    ] = false;

    updateData(tempGlobalData);
    updateShowDeleteConfirmation(false);
    updateIsShown(false);
  }

  function addChip(indexToAdd) {
    if (typeof indexToAdd === 'number' && !isNaN(indexToAdd)) {
      const tempArr = [...chipsDataToDisplay];

      let isExistInChips = false;
      for (let i = 0; i < tempArr.length; i++) {
        if (
          tempArr[i].moduleCode === searchDataToDisplay[indexToAdd].moduleCode
        ) {
          isExistInChips = true;
          break;
        }
      }

      if (!isExistInChips) {
        tempArr.push(searchDataToDisplay[indexToAdd]);
      }

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

  //Handling cancel from module addition dialog
  function handleCancel() {
    updateShowAdditionPopup(false);
    updateChipsDataToDisplay([]);
  }

  function addToGlobalData() {
    if (chipsDataToDisplay.length !== 0) {
      const checkString = JSON.stringify(moduleInSemester);

      const modulesToAdd = [];
      const modulesDuplicated = [];
      let isDuplicateExist = false;
      let modularCreditsToAdd = 0;

      //Updating data
      const tempGlobalData = [...globalData];

      for (let i = 0; i < chipsDataToDisplay.length; i++) {
        if (checkString.includes(chipsDataToDisplay[i].moduleCode)) {
          modulesDuplicated.push(chipsDataToDisplay[i].moduleCode);
          isDuplicateExist = true;
        } else {
          let newModule = {
            moduleCode: chipsDataToDisplay[i].moduleCode,
            moduleCredit: chipsDataToDisplay[i].moduleCredit,
            ...FLAGS,
          };
          modulesToAdd.push(newModule);
          modularCreditsToAdd += parseInt(newModule.moduleCredit);
          updateChipsDataToDisplay([]);
        }
      }

      const newArrayOfModules = tempGlobalData[currentYearIndex][
        currentSemesterIndex
      ].concat(modulesToAdd);

      tempGlobalData[currentYearIndex][
        currentSemesterIndex
      ] = newArrayOfModules;

      tempGlobalData[currentYearIndex][
        currentSemesterIndex + 4
      ].semModularCredit += modularCreditsToAdd;

      tempGlobalData[5].totalModularCredits += modularCreditsToAdd;

      updateData(tempGlobalData);
      updateChipsDataToDisplay([]);
      updateShowAdditionPopup(false);

      updateDuplicatedModules(modulesDuplicated);
      updateShowDuplicationPopup(isDuplicateExist);
    }
  }

  function removeFromGlobalData(indexToRemove) {
    const tempModuleInSemester = [...moduleInSemester];
    const tempGlobalData = [...globalData];

    const moduleToRemove = tempModuleInSemester[indexToRemove];

    tempModuleInSemester.splice(indexToRemove, 1);
    tempGlobalData[currentYearIndex][
      currentSemesterIndex
    ] = tempModuleInSemester;

    tempGlobalData[currentYearIndex][
      currentSemesterIndex + 4
    ].semModularCredit -= moduleToRemove.moduleCredit;
    tempGlobalData[5].totalModularCredits -= moduleToRemove.moduleCredit;

    updateData(tempGlobalData);
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
              onInputChange={(event) => {
                updateSearchStringByUser(event.target.value);
              }}
              onChange={(event) => {
                addChip(parseInt(event.target.dataset.optionIndex));
              }}
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
            <Button onClick={handleCancel} color="primary">
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

        <Dialog
          open={showDuplicationPopup}
          TransitionComponent={transition}
          // keepMounted
          onClose={() => {
            updateShowDuplicationPopup(false);
          }}>
          <DialogTitle>Duplicated modules</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The following modules already exist in current semester and will
              not be Added.
            </DialogContentText>

            <ul>
              {duplicatedModule.map((currData) => (
                <li>{currData}</li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                updateShowDuplicationPopup(false);
              }}
              color="primary">
              Ok
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
          <AcadModuleBox
            removeModule={removeFromGlobalData}
            currentIdx={index}
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

export default connect(mapStateToProps, mapDispatchToProps)(AcadSemesterBox);
