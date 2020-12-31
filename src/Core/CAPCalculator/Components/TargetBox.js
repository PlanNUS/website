import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import '../../../Style/Common/YearBoxCommons.css';
import '../../../Style/CAPCalculator/Components/TargetBox.css';

import OwnInput from '../../CorePage/Components/OwnInput';

function TargetBox(props) {
  const globalData = props.globalData;
  const updateData = props.updateData;

  const isShown = props.isShown;
  const darkTheme = props.darkTheme;

  const [outputString, updateOutputString] = useState('');
  const [targetCapString, updateTargetCapString] = useState('0.0');
  const [mcLeft, updateMcLeft] = useState(0);
  const [neededCap, updateNeededCap] = useState(0.0);
  const [totalMxP, updateTotalMxP] = useState(0);

  const [maxCap, updateMaxCap] = useState(0.0);

  useEffect(() => {
    const tempGlobalData = [...globalData];

    const tempTargetCapString = tempGlobalData[5].targetCapString;
    const tempTotalMxP = tempGlobalData[5].totalMxP;
    const tempMcLeft = tempGlobalData[5].mcLeft;

    const tempMaxCap =
      (tempTotalMxP + tempMcLeft * 5.0) /
      parseFloat(tempGlobalData[5].totalMCClearedInternal + tempMcLeft);

    const tempNeededCap =
      (tempGlobalData[5].targetCap *
        (parseFloat(tempGlobalData[5].totalMCClearedInternal) +
          parseFloat(tempGlobalData[5].mcLeft)) -
        parseFloat(tempGlobalData[5].totalMxP)) /
      parseFloat(tempGlobalData[5].mcLeft);

    updateTargetCapString(tempTargetCapString);
    updateNeededCap(tempNeededCap);
    updateTotalMxP(tempTotalMxP);
    updateMcLeft(tempMcLeft);
    updateMaxCap(tempMaxCap);
  }, [globalData]);

  useEffect(() => {
    if (isNaN(neededCap) && totalMxP === 0) {
      updateOutputString(
        "Sorry! You need at least one graded module ('SU' modules are not considered graded)",
      );
    } else if (!isFinite(neededCap) && mcLeft === 0) {
      updateOutputString('Sorry! Please add more modules that are not cleared');
    } else if (neededCap > 5.0 || neededCap < 0.0) {
      updateOutputString(
        `Sorry! Your target CAP is not obtainable (Highest possible CAP: ${maxCap})`,
      );
    } else {
      updateOutputString(`A minimum grade point of ${neededCap.toFixed(
        2,
      )} is needed for the
      rest of the modular credits to acheive your target CAP.`);
    }
  }, [neededCap, totalMxP, mcLeft, maxCap]);

  function handleNewTarget(userInput) {
    const inputCap = parseFloat(userInput);

    if (userInput === '') {
      const tempGlobalData = [...globalData];
      tempGlobalData[5].targetCapString = '';
      tempGlobalData[5].targetCap = 0.0;
      tempGlobalData[5].neededCap = 0.0;

      updateData(tempGlobalData);
    } else if (!isNaN(inputCap) && inputCap >= 0.0) {
      const tempGlobalData = [...globalData];
      const capData = tempGlobalData[5];
      tempGlobalData[5].targetCapString = userInput;
      tempGlobalData[5].targetCap = inputCap;
      tempGlobalData[5].neededCap =
        (inputCap *
          (parseFloat(capData.totalMCClearedInternal) +
            parseFloat(capData.mcLeft)) -
          parseFloat(capData.totalMxP)) /
        parseFloat(capData.mcLeft);

      updateData(tempGlobalData);
    }
  }

  if (isShown) {
    return (
      <div id="mainYearBox">
        <div id="targetRow">
          <div id="oneThird">
            <OwnInput
              type="input"
              darkTheme={darkTheme}
              desc="Target CAP:"
              value={targetCapString}
              onChangeHandler={handleNewTarget}
              maxInputLength={4}
              width={40}
            />
          </div>
          <div id="twoThirds">
            <div id="fullDetails">
              <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
                {outputString}
              </p>
              {/* <br /> */}
              {/* <p className={`${darkTheme ? 'dark' : 'light'}Words`}>
              Further details:
            </p> */}
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TargetBox);
