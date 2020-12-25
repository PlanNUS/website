import React, {useEffect} from 'react';

import '../../../Style/Common/YearBoxCommons.css';
import '../../../Style/CAPCalculator/Components/DetailsBox.css';

import OwnInput from '../../CorePage/Components/OwnInput';

export default function DetailsBox(props) {
  const isShown = props.isShown;
  const darkTheme = props.darkTheme;

  const totalSU = props.totalSU;
  const totalSUString = props.totalSUString;

  const suUsed = props.suUsed;
  const suLeft = props.suLeft;

  const MCAdded = props.MCAdded;
  const handleNewSU = props.handleNewSU;

  if (isShown) {
    return (
      <div id="mainYearBox">
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
            type="display"
            darkTheme={darkTheme}
            desc="SU Left:"
            value={suLeft}
          />
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
            value={totalSU}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}