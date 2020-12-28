import React from 'react';

import '../../../Style/Common/YearBoxCommons.css';
import '../../../Style/CAPCalculator/Components/DetailsBox.css';

import OwnInput from '../../CorePage/Components/OwnInput';

export default function DetailsBox(props) {
  const isShown = props.isShown;
  const darkTheme = props.darkTheme;

  const totalSUString = props.totalSUString;

  const suUsed = props.suUsed;
  const suLeft = props.suLeft;

  const MCAdded = props.MCAdded;
  const handleNewSU = props.handleNewSU;

  const totalMCClearedExternal = props.totalMCClearedExternal;

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
            type="su"
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
            value={totalMCClearedExternal}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}
