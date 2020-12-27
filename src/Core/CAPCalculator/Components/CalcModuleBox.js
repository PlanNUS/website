import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {GRADES_SU, GRADES} from '../../../Constants';

import '../../../Style/CAPCalculator/Components/CalcModuleBox.css';
import '../../../Style/Common/ModuleBoxCommons.css';
import UpdateGrade from '../Functions/UpdateGrade';

function CalcModuleBox(props) {
  const module = props.module;
  const darkTheme = props.darkTheme;
  const globalData = props.globalData;
  const updateData = props.updateData;
  const currYear = props.currentYear;
  const currSem = props.currentSem;
  const currIdx = props.currentIdx;

  const [selectedIdx, updateSelectedIdx] = useState(0);
  const [options, updateOptions] = useState(GRADES);

  // const temp = {
  //   totalSU: 0,
  //   suUsed: 0,
  //   totalMCAdded: 0,
  //   totalMxP: 0,
  //   totalMCClearedInternal: 0,
  //   totalMCClearedExternal: 0,
  //   currentCap: 0.0,
  //   isDarkModeChecked: false,
  // };

  useEffect(() => {
    updateSelectedIdx(module.gradeIdx);

    if (module.attributes !== undefined) {
      if (module.attributes.su !== undefined && module.attributes.su) {
        // console.log('ran');
        updateOptions(GRADES_SU);
      } else {
        updateOptions(GRADES);
      }
    }
  }, [module]);

  function handleGradeChange(newIdx) {
    if (newIdx !== selectedIdx) {
      const newGlobalData = UpdateGrade(options, newIdx, module, globalData);
      newGlobalData[currYear][currSem][currIdx].gradeIdx = newIdx;
      // console.log(newGlobalData);
      updateData(newGlobalData);
      updateSelectedIdx(newIdx);
    }
  }

  // useEffect(() => {
  //   console.log('selected idx');
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
              handleGradeChange(parseInt(event.target.value));
            }}>
            {options.map((currData, index) => (
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
