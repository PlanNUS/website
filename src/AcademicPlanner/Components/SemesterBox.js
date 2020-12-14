import {IoAdd, IoClose} from 'react-icons/io5';
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './SemesterBox.css';

export default function SemesterBox(props) {
  const currentSemester = props.currentSemester;
  const transition = props.transition;
  const isShown = props.isShown;
  const darkTheme = props.darkTheme;
  const updateIsShown = props.updateIsShown;
  const moduleData = props.moduleData;

  console.log(moduleData);

  const [showDeleteConfirmation, updateShowDeleteConfirmation] = useState(
    false,
  );
  const [showAdditionPopup, updateShowAdditionPopup] = useState(false);

  function handleSemesterDeletion() {
    //Clear array;
    updateShowDeleteConfirmation(false);
    updateIsShown(false);
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
            {/* <DialogContentText id="error">
              Warning! All the data for {currentSemester} will be deleted. This
              action is irreversible.
            </DialogContentText> */}
            <Autocomplete
              id="combo-box-demo"
              options={moduleData}
              getOptionLabel={(option) => option.moduleCode}
              style={{width: 300}}
              renderInput={(params) => (
                <TextField {...params} label="Combo box" variant="outlined" />
              )}
            />
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
