import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import '../../../Style/Common/YearBoxCommons.css';
import '../../../Style/CAPCalculator/Components/DetailsBox.css';

import OwnInput from '../../CorePage/Components/OwnInput';

function DetailsBox(props) {
  const globalData = props.globalData;
  const updateData = props.updateData;
  const styles = props.styles;

  const isShown = props.isShown;

  const [totalSUString, updateTotalSUString] = useState('');
  const [suUsed, updateSuUsed] = useState(0);
  const [suLeft, updateSuLeft] = useState(0);
  const [MCAdded, updateMCAdded] = useState(0);

  const [totalMCClearedExternal, updateTotalMCClearedExternal] = useState(0);

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

  useEffect(() => {
    const tempGlobalData = [...globalData];

    updateMCAdded(tempGlobalData[5].totalMCAdded);
    updateSuUsed(tempGlobalData[5].suUsed);

    if (tempGlobalData[5].totalSU === 0) {
      updateTotalSUString('');
    } else {
      updateTotalSUString(tempGlobalData[5].totalSU.toString());
    }

    updateSuLeft(tempGlobalData[5].suLeft);

    updateTotalMCClearedExternal(tempGlobalData[5].totalMCClearedExternal);
  }, [globalData]);

  function handleNewSU(userInput) {
    const inputNumber = parseInt(userInput);

    if (userInput === '') {
      const tempGlobalData = [...globalData];
      tempGlobalData[5].totalSU = 0;
      tempGlobalData[5].suLeft =
        tempGlobalData[5].totalSU - tempGlobalData[5].suUsed;

      updateData(tempGlobalData);
    } else if (!isNaN(inputNumber) && inputNumber >= 0) {
      const tempGlobalData = [...globalData];
      tempGlobalData[5].totalSU = inputNumber;
      tempGlobalData[5].suLeft =
        tempGlobalData[5].totalSU - tempGlobalData[5].suUsed;

      updateData(tempGlobalData);
    }
  }

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
      <div
        id="mainYearBox"
        style={{
          borderWidth: styles.yearWidth,
          borderColor: styles.yearBorderColor,
          backgroundColor: styles.yearBackgroundColor,
        }}>
        <div>
          <div id="rowWrapper">
            <OwnInput
              type="input"
              desc="Total SU:"
              value={totalSUString}
              styles={styles}
              onChangeHandler={handleNewSU}
              maxInputLength={2}
            />
            <OwnInput
              type="display"
              styles={styles}
              desc="SU Used:"
              value={suUsed}
            />
            <OwnInput
              type="su"
              styles={styles}
              desc="SU Left:"
              value={suLeft}
            />
          </div>
          <div id="seperator" />
          <div id="rowWrapper">
            <OwnInput
              type="display"
              styles={styles}
              desc="MCs Added:"
              value={MCAdded}
            />
            <OwnInput
              type="display"
              styles={styles}
              desc="MCs Cleared:"
              value={totalMCClearedExternal}
            />
            <OwnInput
              type="display"
              styles={styles}
              desc="MCs Left:"
              value={totalMCClearedExternal}
            />
          </div>
          <div id="seperator" />
          <div id="rowWrapper">
            <div id="oneThird">
              <OwnInput
                type="input"
                styles={styles}
                desc="Target CAP:"
                value={targetCapString}
                onChangeHandler={handleNewTarget}
                maxInputLength={4}
                width={40}
              />
            </div>
            <div id="twoThirds">
              <div id="fullDetails">
                <p className="words" style={{color: styles.fontColor}}>
                  {outputString}
                </p>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsBox);
