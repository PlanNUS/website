import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import '../../Style/CAPCalculator/CAPCalculator.css';
import '../../Style/Common/AppCommons.css';

import CalcYearBox from './Components/CalcYearBox';
import DetailsBox from './Components/DetailsBox';
import OwnButton from '../CorePage/Components/OwnButton';
import OwnInput from '../CorePage/Components/OwnInput';

function CAPCalculator(props) {
  const darkTheme = props.darkTheme;
  const globalData = props.globalData;
  const updateData = props.updateData;
  const updateCurrLocation = props.updateCurrLocation;

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

  const currLocation = useLocation();
  useEffect(() => {
    updateCurrLocation(currLocation);
  }, [updateCurrLocation, currLocation]);

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

    updateSuLeft(tempGlobalData[5].suLeft);
    updateCurrCap(tempGlobalData[5].currentCap);

    updateTotalMCClearedExternal(tempGlobalData[5].totalMCClearedExternal);
  }, [globalData]);

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

  return (
    <div id="appWrapper">
      <Helmet>
        <title>Calculator</title>
        <meta
          name="CAP Calculator"
          content="This app allows for the calculation of the user's CAP"
        />
      </Helmet>
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
        semToDisplay={toDisplayArr[0]}
      />
      <CalcYearBox
        darkTheme={darkTheme}
        year="2"
        currentYearIndex={1}
        isShown={yearTwoShown}
        semToDisplay={toDisplayArr[1]}
      />
      <CalcYearBox
        darkTheme={darkTheme}
        year="3"
        currentYearIndex={2}
        isShown={yearThreeShown}
        semToDisplay={toDisplayArr[2]}
      />
      <CalcYearBox
        darkTheme={darkTheme}
        year="4"
        currentYearIndex={3}
        isShown={yearFourShown}
        semToDisplay={toDisplayArr[3]}
      />
      <CalcYearBox
        darkTheme={darkTheme}
        year="5"
        currentYearIndex={4}
        isShown={yearFiveShown}
        semToDisplay={toDisplayArr[4]}
      />
    </div>
    // </div>
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
