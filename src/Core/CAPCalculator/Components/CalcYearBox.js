import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import CalcSemesterBox from './CalcSemesterBox';

import '../../../Style/Common/YearBoxCommons.css';

function CalcYearBox(props) {
  const year = props.year;
  const darkTheme = props.darkTheme;
  const isShown = props.isShown;
  const styles = props.styles;

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
      <div
        id="mainYearBox"
        style={{
          borderWidth: styles.yearWidth,
          borderColor: styles.yearBorderColor,
          backgroundColor: styles.yearBackgroundColor,
        }}>
        <div id="yearBoxHeader">
          <p className="words" style={{color: styles.fontColor}}>
            Year {year}
          </p>
        </div>

        <div id="semesterWrapper">
          <CalcSemesterBox
            currentSemester="Semester 1"
            currentSemesterIndex={0}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            styles={styles}
            isShown={semesterOneShown}
          />

          <CalcSemesterBox
            currentSemester="Semester 2"
            currentSemesterIndex={1}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            styles={styles}
            isShown={semesterTwoShown}
          />
          <CalcSemesterBox
            currentSemester="Special Term 1"
            currentSemesterIndex={2}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            styles={styles}
            isShown={specialTermOneShown}
          />
          <CalcSemesterBox
            currentSemester="Special Term 2"
            currentSemesterIndex={3}
            currentYearIndex={currentYearIndex}
            darkTheme={darkTheme}
            styles={styles}
            isShown={specialTermTwoShown}
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
