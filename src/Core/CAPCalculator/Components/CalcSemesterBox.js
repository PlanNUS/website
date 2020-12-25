import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import '../../../Style/Common/SemBoxCommons.css';
import {FLAGS} from '../../../Constants';

import CalcModuleBox from './CalcModuleBox';

function CalcSemesterBox(props) {
  const currentSemester = props.currentSemester;
  const transition = props.transition;
  const isShown = props.isShown;
  const darkTheme = props.darkTheme;
  // const updateIsShown = props.updateIsShown;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;
  const currentYearIndex = props.currentYearIndex;
  const currentSemesterIndex = props.currentSemesterIndex;
  const globalData = props.globalData;
  const updateData = props.updateData;

  const [moduleInSemester, updateModuleInSemester] = useState([]);

  useEffect(() => {
    const tempModuleInSemester = [
      ...globalData[currentYearIndex][currentSemesterIndex],
    ];
    updateModuleInSemester(tempModuleInSemester);
  }, [globalData, currentSemesterIndex, currentYearIndex]);

  if (isShown) {
    return (
      <div id="mainBox">
        <div id="semesterHeader">
          <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
            {currentSemester}
          </p>
        </div>

        {moduleInSemester.map((currentData, index) => (
          <CalcModuleBox
            currentIdx={index}
            currentYear={currentYearIndex}
            currentSem={currentSemesterIndex}
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

export default connect(mapStateToProps, mapDispatchToProps)(CalcSemesterBox);
