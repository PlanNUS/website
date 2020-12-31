import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import '../../../Style/Common/YearBoxCommons.css';
import '../../../Style/CAPCalculator/Components/DetailsBox.css';

import OwnInput from '../../CorePage/Components/OwnInput';

function DetailsBox(props) {
  const globalData = props.globalData;
  const updateData = props.updateData;

  const isShown = props.isShown;
  const darkTheme = props.darkTheme;

  const [totalSUString, updateTotalSUString] = useState('');
  const [suUsed, updateSuUsed] = useState(0);
  const [suLeft, updateSuLeft] = useState(0);
  const [MCAdded, updateMCAdded] = useState(0);

  const [totalMCClearedExternal, updateTotalMCClearedExternal] = useState(0);

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

  if (isShown) {
    return (
      <div id="mainYearBox">
        <div>
          <div id="rowWrapper">
            <OwnInput
              type="input"
              darkTheme={darkTheme}
              desc="Total SU:"
              value={totalSUString}
              onChangeHandler={handleNewSU}
              maxInputLength={2}
            />
            <OwnInput
              type="display"
              darkTheme={darkTheme}
              desc="SU Used:"
              value={suUsed}
            />
            <OwnInput
              type="su"
              darkTheme={darkTheme}
              desc="SU Left:"
              value={suLeft}
            />
          </div>
          <div id="seperator" />
          <div id="rowWrapper">
            <OwnInput
              type="display"
              darkTheme={darkTheme}
              desc="MCs Added:"
              value={MCAdded}
            />
            <OwnInput
              type="display"
              darkTheme={darkTheme}
              desc="MCs Cleared:"
              value={totalMCClearedExternal}
            />
            <OwnInput
              type="display"
              darkTheme={darkTheme}
              desc="MCs Left:"
              value={totalMCClearedExternal}
            />
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
