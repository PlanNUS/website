import {IoAdd, IoClose} from 'react-icons/io5';
import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './SemesterBox.css';

import Search from './Search';

export default function SemesterBox(props) {
  const currentSemester = props.currentSemester;
  const transition = props.transition;
  const isShown = props.isShown;
  const darkTheme = props.darkTheme;
  const updateIsShown = props.updateIsShown;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;

  const numberOfDataDisplay = 5;

  // useEffect(() => {
  //   console.log(moduleData);
  // }, [moduleData]);

  const [showDeleteConfirmation, updateShowDeleteConfirmation] = useState(
    false,
  );
  const [showAdditionPopup, updateShowAdditionPopup] = useState(false);
  const [searchStringByUser, updateSearchStringByUser] = useState('');
  const [searchDataToDisplay, updateSearchDataToDisplay] = useState([]);
  // const [selectedIndex, updatedSelectedIndex] = useState(-1);
  const [chipsDataToDisplay, updateChipsDataToDisplay] = useState([]);

  function handleSemesterDeletion() {
    //Clear array;
    updateShowDeleteConfirmation(false);
    updateIsShown(false);
  }

  // useEffect(() => {
  //   // console.log(searchDataToDisplay);
  //   if (selectedIndex > -1) {
  //     let tempArr = [...chipsDataToDisplay];
  //     tempArr.push(searchDataToDisplay[selectedIndex]);
  //     updateChipsDataToDisplay(tempArr);
  //     updatedSelectedIndex(-1);
  //   }
  // }, [selectedIndex, chipsDataToDisplay, searchDataToDisplay]);

  function addChip(indexToAdd) {
    if (typeof indexToAdd === 'number') {
      let tempArr = [...chipsDataToDisplay];
      tempArr.push(searchDataToDisplay[indexToAdd]);
      updateChipsDataToDisplay(tempArr);
      // updateSearchStringByUser('');
    }
  }

  function deleteChip(indexToDelete) {
    if (typeof indexToDelete === 'number') {
      const tempArr = [...chipsDataToDisplay];
      tempArr.splice(indexToDelete);
      updateChipsDataToDisplay(tempArr);
    }
  }

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
                // console.log('inside userClick ' + event.target.value);
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
                // <li key={index}>
                <Chip
                  key={index}
                  // icon={icon}
                  label={data.moduleCode}
                  onDelete={() => deleteChip(index)}
                  id="chip"
                />
                // </li>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => updateShowAdditionPopup(false)}
              color="primary">
              Cancel
            </Button>
            {/* <Button onClick={handleSemesterDeletion} color="primary">
              Add
            </Button> */}
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
      </div>
    );
  } else {
    return null;
  }
}
