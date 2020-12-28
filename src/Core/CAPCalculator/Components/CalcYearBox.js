import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import CalcSemesterBox from './CalcSemesterBox';

import '../../../Style/Common/YearBoxCommons.css';

function CalcYearBox(props) {
  const year = props.year;
  const darkTheme = props.darkTheme;
  const isShown = props.isShown;
  const currentYearIndex = props.currentYearIndex;
  const semToDisplay = props.semToDisplay;

  const [semesterOneShown, updateSemesterOneShown] = useState(true);
  const [specialTermOneShown, updateSpecialTermOneShown] = useState(false);
  const [specialTermTwoShown, updateSpecialTermTwoShown] = useState(false);
  const [semesterTwoShown, updateSemesterTwoShown] = useState(false);

  useEffect(() => {
    updateSemesterOneShown(semToDisplay[1]);
    updateSpecialTermOneShown(semToDisplay[2]);
    updateSpecialTermTwoShown(semToDisplay[3]);
    updateSemesterTwoShown(semToDisplay[4]);
  }, [semToDisplay]);

  if (isShown) {
    return (
      <div id="mainYearBox">
        <div id="yearBoxHeader">
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>Year {year}</p>
        </div>

        <div id="semesterWrapper">
          <CalcSemesterBox
            currentSemester="Semester 1"
            currentSemesterIndex={0}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            isShown={semesterOneShown}
          />
          <CalcSemesterBox
            currentSemester="Special Term 1"
            currentSemesterIndex={1}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            isShown={specialTermOneShown}
          />
          <CalcSemesterBox
            currentSemester="Special Term 2"
            currentSemesterIndex={2}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            isShown={specialTermTwoShown}
          />
          <CalcSemesterBox
            currentSemester="Semester 2"
            currentSemesterIndex={3}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            isShown={semesterTwoShown}
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

export default connect(mapStateToProps, mapDispatchToProps)(CalcYearBox);
