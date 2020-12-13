import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Slide from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';

import './AcademicPlanner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import bootstrapModal from 'bootstrap/scss/_modal.scss';

import YearBox from './Components/YearBox';
import AdditionButton from './Components/AdditionButton';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AcademicPlanner(props) {
  const darkTheme = props.darkTheme;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;

  const [showModal, updateShowModal] = useState(false);

  const [yearCurrentlyShown, updateYearCurrentlyShown] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [yearOneShown, updateYearOneShown] = useState(false);
  const [yearTwoShown, updateYearTwoShown] = useState(false);
  const [yearThreeShown, updateYearThreeShown] = useState(false);
  const [yearFourShown, updateYearFourShown] = useState(false);
  const [yearFiveShown, updateYearFiveShown] = useState(false);

  const [selectedYear, updateSelectedYear] = useState('0');

  const [addYearErrorString, updateAddYearErrorString] = useState('');

  useEffect(() => {
    console.log('triggered as ' + yearTwoShown);
  }, [yearTwoShown]);

  useEffect(() => {
    console.log('Selected year is ' + selectedYear);
  }, [selectedYear]);

  function handleSelectUpdate() {
    if (yearCurrentlyShown[selectedYear] === false) {
      switch (selectedYear) {
        case '0':
          updateYearOneShown(true);
          break;
        case '1':
          console.log('inside 2');
          updateYearTwoShown(true);
          break;
        case '2':
          updateYearThreeShown(true);
          break;
        case '3':
          updateYearFourShown(true);
          break;
        case '4':
          updateYearFiveShown(true);
          break;
        default:
          break;
      }
      const tempArr = [...yearCurrentlyShown];
      tempArr[selectedYear] = true;
      updateYearCurrentlyShown(tempArr);
      updateShowModal(false);
    } else {
      updateAddYearErrorString('The chosen year is already shown!');
    }
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
        TransitionComponent={Transition}
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

      <YearBox darkTheme={darkTheme} year="1" isShown={yearOneShown} />
      <YearBox darkTheme={darkTheme} year="2" isShown={yearTwoShown} />
      <YearBox darkTheme={darkTheme} year="3" isShown={yearThreeShown} />
      <YearBox darkTheme={darkTheme} year="4" isShown={yearFourShown} />
      <YearBox darkTheme={darkTheme} year="5" isShown={yearFiveShown} />
    </div>
  );
}
