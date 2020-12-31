import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import '../../../Style/Common/SemBoxCommons.css';

import CalcModuleBox from './CalcModuleBox';

function CalcSemesterBox(props) {
  const currentSemester = props.currentSemester;
  const isShown = props.isShown;
  const darkTheme = props.darkTheme;
  const currentYearIndex = props.currentYearIndex;
  const currentSemesterIndex = props.currentSemesterIndex;
  const globalData = props.globalData;
  const styles = props.styles;

  const [moduleInSemester, updateModuleInSemester] = useState([]);
  const [suLeft, updateSuLeft] = useState(0);

  useEffect(() => {
    const tempModuleInSemester = [
      ...globalData[currentYearIndex][currentSemesterIndex],
    ];
    updateModuleInSemester(tempModuleInSemester);
    updateSuLeft(globalData[5].suLeft);
  }, [globalData, currentSemesterIndex, currentYearIndex]);

  if (isShown) {
    return (
      <div
        id="mainBox"
        style={{
          borderWidth: styles.semWidth,
          borderColor: styles.semBorderColor,
          backgroundColor: styles.semBackgroundColor,
        }}>
        <div id="semesterHeader">
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
            {currentSemester}
          </p>
        </div>

        {moduleInSemester.map((currentData, index) => (
          <CalcModuleBox
            suLeft={suLeft}
            currentIdx={index}
            currentYear={currentYearIndex}
            currentSem={currentSemesterIndex}
            key={currentData.moduleCode}
            module={currentData}
            styles={styles}
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

export default connect(mapStateToProps, mapDispatchToProps)(CalcSemesterBox);
