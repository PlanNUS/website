import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {GRADES_SU, GRADES} from '../../../Constants';

import '../../../Style/CAPCalculator/Components/CalcModuleBox.css';
import '../../../Style/Common/ModuleBoxCommons.css';
import UpdateGrade from '../Functions/UpdateGrade';

function CalcModuleBox(props) {
  const module = props.module;
  const suLeft = props.suLeft;
  const darkTheme = props.darkTheme;
  const styles = props.styles;

  const globalData = props.globalData;
  const updateData = props.updateData;
  const currYear = props.currentYear;
  const currSem = props.currentSem;
  const currIdx = props.currentIdx;

  const [selectedIdx, updateSelectedIdx] = useState(0);
  const [options, updateOptions] = useState(GRADES);
  const [isSu, updateIsSU] = useState(false);
  const [errorFlag, updateErrorFlag] = useState(null);

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
        updateIsSU(true);
        updateOptions(GRADES_SU);
      } else {
        updateIsSU(false);
        updateOptions(GRADES);
      }
    }
  }, [module]);

  useEffect(() => {
    if (
      options[selectedIdx].grade === 'S' ||
      options[selectedIdx].grade === 'U'
    ) {
      if (suLeft < 0 && isSu) {
        updateErrorFlag(<p>Total SU exceeded!</p>);
      } else {
        updateErrorFlag(null);
      }
    }
  }, [suLeft, isSu, options, selectedIdx]);

  function handleGradeChange(newIdx) {
    if (newIdx !== selectedIdx) {
      const newGlobalData = UpdateGrade(options, newIdx, module, globalData);
      newGlobalData[currYear][currSem][currIdx].gradeIdx = newIdx;

      updateData(newGlobalData);
      updateSelectedIdx(newIdx);
    }
  }

  return (
    <div
      id="moduleBox"
      className={`${errorFlag !== null ? `flag` : `none`}Background`}
      style={{
        borderWidth: styles.modWidth,
        borderColor: styles.modBorderColor,
        backgroundColor: styles.modBackgroundColor,
      }}>
      <div id="contentBox">
        <p
          className={`${darkTheme ? 'dark' : 'light'}Words`}
          id="moduleCodetitle">
          {module.moduleCode}
        </p>
        <p className={`${darkTheme ? 'dark' : 'light'}Words`}>{errorFlag}</p>
      </div>

      <div
        id="gradeSelector"
        style={{
          borderWidth: styles.selectorWidth,
          borderColor: styles.selectorBorderColor,
          backgroundColor: styles.selectorBackgroundColor,
        }}>
        <form>
          <select
            name="grades"
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
