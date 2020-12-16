import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './AcademicPlanner.css';

import YearBox from './Components/YearBox';
import AdditionButton from './Components/AdditionButton';

export default function AcademicPlanner(props) {
  const darkTheme = props.darkTheme;
  const transition = props.transition;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;

  const [showModal, updateShowModal] = useState(false);

  // const [yearCurrentlyShown, updateYearCurrentlyShown] = useState([
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);

  //Change this back to false once you are done with it
  console.log('change this back nowww in acadamicPlanner.js');
  const [yearOneShown, updateYearOneShown] = useState(true);
  const [yearTwoShown, updateYearTwoShown] = useState(false);
  const [yearThreeShown, updateYearThreeShown] = useState(false);
  const [yearFourShown, updateYearFourShown] = useState(false);
  const [yearFiveShown, updateYearFiveShown] = useState(false);

  const [selectedYear, updateSelectedYear] = useState('0');

  const [addYearErrorString, updateAddYearErrorString] = useState('');

  function handleSelectUpdate() {
    switch (selectedYear) {
      case '0':
        if (yearOneShown === false) {
          updateYearOneShown(true);
          updateShowModal(false);
        } else {
          updateAddYearErrorString('The chosen year is already shown!');
        }
        break;
      case '1':
        if (yearTwoShown === false) {
          updateYearTwoShown(true);
          updateShowModal(false);
        } else {
          updateAddYearErrorString('The chosen year is already shown!');
        }
        break;
      case '2':
        if (yearThreeShown === false) {
          updateYearThreeShown(true);
          updateShowModal(false);
        } else {
          updateAddYearErrorString('The chosen year is already shown!');
        }
        break;
      case '3':
        if (yearFourShown === false) {
          updateYearFourShown(true);
          updateShowModal(false);
        } else {
          updateAddYearErrorString('The chosen year is already shown!');
        }
        break;
      case '4':
        if (yearFiveShown === false) {
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

  return (
    <div id="acadPlanWrapper">
      <div id="plannerHeader">
        {/* <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
          This is the academic planner
        </p> */}

        <AdditionButton
          darkTheme={darkTheme}
          buttonDesc="Add Year"
          onClick={() => updateShowModal(true)}
        />
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
          <Button onClick={handleSelectUpdate} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <YearBox
        darkTheme={darkTheme}
        year="1"
        isShown={yearOneShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        updateIsShown={updateYearOneShown}
      />
      <YearBox
        darkTheme={darkTheme}
        year="2"
        isShown={yearTwoShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        updateIsShown={updateYearTwoShown}
      />
      <YearBox
        darkTheme={darkTheme}
        year="3"
        isShown={yearThreeShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        updateIsShown={updateYearThreeShown}
      />
      <YearBox
        darkTheme={darkTheme}
        year="4"
        isShown={yearFourShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        updateIsShown={updateYearFourShown}
      />
      <YearBox
        darkTheme={darkTheme}
        year="5"
        isShown={yearFiveShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        updateIsShown={updateYearFiveShown}
      />
    </div>
  );
}
