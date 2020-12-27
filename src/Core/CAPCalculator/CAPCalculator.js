import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import '../../Style/CAPCalculator/CAPCalculator.css';
import '../../Style/Common/AppCommons.css';

import CalcYearBox from './Components/CalcYearBox';
import DetailsBox from './Components/DetailsBox';
import OwnButton from '../CorePage/Components/OwnButton';
import OwnInput from '../CorePage/Components/OwnInput';

function CAPCalculator(props) {
  const darkTheme = props.darkTheme;
  const transition = props.transition;
  const moduleData = props.moduleData;
  const moduleDataLength = props.moduleDataLength;
  const globalData = props.globalData;
  const updateData = props.updateData;

  const [toDisplayArr, updateToDisplayArr] = useState([
    //Year 1
    [
      true, //Is current year shown? ("Overrides" the rest)
      true, //Is Sem 1 shown?
      false, //Is Special Term 1 shown?
      false, //Is Special Term 2 shown?
      false, //Is Sem 2 shown?
    ],

    //Year 2
    [
      false, //Is current year shown? ("Overrides" the rest)
      true, //Is Sem 1 shown?
      false, //Is Special Term 1 shown?
      false, //Is Special Term 2 shown?
      false, //Is Sem 2 shown?
    ],

    //Year 3,
    [
      false, //Is current year shown? ("Overrides" the rest)
      true, //Is Sem 1 shown?
      false, //Is Special Term 1 shown?
      false, //Is Special Term 2 shown?
      false, //Is Sem 2 shown?
    ],

    //Year 4
    [
      false, //Is current year shown? ("Overrides" the rest)
      true, //Is Sem 1 shown?
      false, //Is Special Term 1 shown?
      false, //Is Special Term 2 shown?
      false, //Is Sem 2 shown?
    ],

    //Year 5
    [
      false, //Is current year shown? ("Overrides" the rest)
      true, //Is Sem 1 shown?
      false, //Is Special Term 1 shown?
      false, //Is Special Term 2 shown?
      false, //Is Sem 2 shown?
    ],
  ]);

  const [totalSUString, updateTotalSUString] = useState('');
  const [totalSU, updateTotalSU] = useState(0);
  const [suUsed, updateSuUsed] = useState(0);
  const [suLeft, updateSuLeft] = useState(0);
  const [MCAdded, updateMCAdded] = useState(0);
  const [totalMCClearedExternal, updateTotalMCClearedExternal] = useState(0);
  const [currCap, updateCurrCap] = useState(0.0);

  const [isDetailsShown, updateIsDetailsShown] = useState(true);
  const [detailButtonString, updateDetailButtonString] = useState('Hide');

  const [yearOneShown, updateYearOneShown] = useState(true);
  const [yearTwoShown, updateYearTwoShown] = useState(false);
  const [yearThreeShown, updateYearThreeShown] = useState(false);
  const [yearFourShown, updateYearFourShown] = useState(false);
  const [yearFiveShown, updateYearFiveShown] = useState(false);

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
    const tempGlobalData = [...globalData];
    const tempToDisplayArr = tempGlobalData[5].isDisplayed;

    updateYearOneShown(tempToDisplayArr[0][0]);
    updateYearTwoShown(tempToDisplayArr[1][0]);
    updateYearThreeShown(tempToDisplayArr[2][0]);
    updateYearFourShown(tempToDisplayArr[3][0]);
    updateYearFiveShown(tempToDisplayArr[4][0]);

    updateToDisplayArr(tempToDisplayArr);

    updateMCAdded(tempGlobalData[5].totalMCAdded);
    updateSuUsed(tempGlobalData[5].suUsed);

    if (tempGlobalData[5].totalSU === 0) {
      updateTotalSUString('');
    } else {
      updateTotalSUString(tempGlobalData[5].totalSU.toString());
    }

    updateTotalSU(tempGlobalData[5].totalSU);
    updateCurrCap(tempGlobalData[5].currentCap);

    console.log(tempGlobalData[5].currentCap);

    updateTotalMCClearedExternal(tempGlobalData[5].totalMCClearedExternal);
  }, [globalData]);

  useEffect(() => {
    const tempSULeft = totalSU - suUsed;
    updateSuLeft(tempSULeft);
  }, [totalSU, suUsed]);

  useEffect(() => {
    if (isDetailsShown) {
      updateDetailButtonString('Hide Details');
    } else {
      updateDetailButtonString('Show Details');
    }
  }, [isDetailsShown]);

  function handleNewSU(userInput) {
    const inputNumber = parseInt(userInput);

    if (userInput === '') {
      const tempGlobalData = [...globalData];
      tempGlobalData[5].totalSU = 0;
      updateData(tempGlobalData);
      updateTotalSUString('');
      updateTotalSU(0);
    } else if (!isNaN(inputNumber) && inputNumber >= 0) {
      const tempGlobalData = [...globalData];
      tempGlobalData[5].totalSU = inputNumber;
      updateData(tempGlobalData);
      updateTotalSUString(inputNumber);
      updateTotalSU(inputNumber);
    }
  }

  return (
    <div id="appWrapper">
      <div id="appHeader">
        <p className={`${darkTheme ? 'dark' : 'light'}Words`} id="appTitle">
          CAP Calculator
        </p>
        <div id="rightGroup">
          <OwnInput
            type="cap"
            darkTheme={darkTheme}
            desc="Current CAP:"
            value={currCap}
          />
          <div id="seperator" />
          <OwnButton
            darkTheme={darkTheme}
            buttonDesc={detailButtonString}
            type={detailButtonString}
            onClick={() => updateIsDetailsShown(!isDetailsShown)}
          />
        </div>
      </div>

      <DetailsBox
        isShown={isDetailsShown}
        darkTheme={darkTheme}
        totalSU={totalSU}
        totalSUString={totalSUString}
        suUsed={suUsed}
        suLeft={suLeft}
        MCAdded={MCAdded}
        totalMCClearedExternal={totalMCClearedExternal}
        handleNewSU={handleNewSU}
      />

      <CalcYearBox
        darkTheme={darkTheme}
        year="1"
        currentYearIndex={0}
        isShown={yearOneShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        // updateIsShown={updateYearOneShown}
        semToDisplay={toDisplayArr[0]}
      />
      <CalcYearBox
        darkTheme={darkTheme}
        year="2"
        currentYearIndex={1}
        isShown={yearTwoShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        // updateIsShown={updateYearTwoShown}
        semToDisplay={toDisplayArr[1]}
      />
      <CalcYearBox
        darkTheme={darkTheme}
        year="3"
        currentYearIndex={2}
        isShown={yearThreeShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        // updateIsShown={updateYearThreeShown}
        semToDisplay={toDisplayArr[2]}
      />
      <CalcYearBox
        darkTheme={darkTheme}
        year="4"
        currentYearIndex={3}
        isShown={yearFourShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        // updateIsShown={updateYearFourShown}
        semToDisplay={toDisplayArr[3]}
      />
      <CalcYearBox
        darkTheme={darkTheme}
        year="5"
        currentYearIndex={4}
        isShown={yearFiveShown}
        transition={transition}
        moduleData={moduleData}
        moduleDataLength={moduleDataLength}
        // updateIsShown={updateYearFiveShown}
        semToDisplay={toDisplayArr[4]}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(CAPCalculator);
