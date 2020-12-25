import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {GRADES} from '../../../Constants';

import '../../../Style/CAPCalculator/Components/CalcModuleBox.css';
import '../../../Style/Common/ModuleBoxCommons.css';

function CalcModuleBox(props) {
  const module = props.module;
  const darkTheme = props.darkTheme;
  const currYear = props.currentYear;
  const currSem = props.currentSem;
  const currIdx = props.currentIdx;

  const [selectedIdx, updateSelectedIdx] = useState(0);

  // useEffect(() => {
  //   console.log(selectedIdx);
  // }, [selectedIdx]);

  return (
    <div id="moduleBox">
      <div id="contentBox">
        <p
          className={`${darkTheme ? 'dark' : 'light'}Words`}
          id="moduleCodetitle">
          {module.moduleCode}
        </p>
      </div>

      <div id="gradeSelector">
        <form>
          <select
            name="grades"
            // id="selector"
            className={`${darkTheme ? 'dark' : 'light'}Words selector`}
            value={selectedIdx}
            onChange={(event) => {
              updateSelectedIdx(parseInt(event.target.value));
            }}>
            {GRADES.map((currData, index) => (
              <option key={currData.grade} value={index}>
                {currData.grade}
              </option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(CalcModuleBox);
