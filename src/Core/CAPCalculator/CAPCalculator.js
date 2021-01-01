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
  const styles = props.styles;
  const globalData = props.globalData;
  const updateCurrLocation = props.updateCurrLocation;
  const updateIsNotifOpen = props.updateIsNotifOpen;

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

  const [currCap, updateCurrCap] = useState(0.0);

  const [isDetailsShown, updateIsDetailsShown] = useState(true);
  const [detailButtonString, updateDetailButtonString] = useState('Hide');

  const [yearOneShown, updateYearOneShown] = useState(true);
  const [yearTwoShown, updateYearTwoShown] = useState(false);
  const [yearThreeShown, updateYearThreeShown] = useState(false);
  const [yearFourShown, updateYearFourShown] = useState(false);
  const [yearFiveShown, updateYearFiveShown] = useState(false);

  useEffect(() => {
    updateIsNotifOpen(true);
  }, [updateIsNotifOpen]);

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

    updateCurrCap(tempGlobalData[5].currentCap);
  }, [globalData]);

  useEffect(() => {
    if (isDetailsShown) {
      updateDetailButtonString('Hide Details');
    } else {
      updateDetailButtonString('Show Details');
    }
  }, [isDetailsShown]);

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
        <p className="words" style={{color: styles.fontColor}} id="appTitle">
          CAP Calculator
        </p>
        <div id="rightGroup">
          <OwnInput
            styles={styles}
            type="cap"
            desc="Current CAP:"
            value={currCap}
          />
          <div id="seperator" />
          <OwnButton
            styles={styles}
            buttonDesc={detailButtonString}
            type={detailButtonString}
            onClick={() => updateIsDetailsShown(!isDetailsShown)}
          />
        </div>
      </div>

      <DetailsBox isShown={isDetailsShown} styles={styles} />

      <CalcYearBox
        year="1"
        currentYearIndex={0}
        styles={styles}
        isShown={yearOneShown}
        semToDisplay={toDisplayArr[0]}
      />
      <CalcYearBox
        year="2"
        currentYearIndex={1}
        styles={styles}
        isShown={yearTwoShown}
        semToDisplay={toDisplayArr[1]}
      />
      <CalcYearBox
        year="3"
        currentYearIndex={2}
        styles={styles}
        isShown={yearThreeShown}
        semToDisplay={toDisplayArr[2]}
      />
      <CalcYearBox
        year="4"
        currentYearIndex={3}
        styles={styles}
        isShown={yearFourShown}
        semToDisplay={toDisplayArr[3]}
      />
      <CalcYearBox
        year="5"
        currentYearIndex={4}
        styles={styles}
        isShown={yearFiveShown}
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
