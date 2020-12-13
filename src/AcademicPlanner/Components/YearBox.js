import React from 'react';

import './YearBox.css';

export default function YearBox(props) {
  const year = props.year;
  const darkTheme = props.darkTheme;
  const isShown = props.isShown;

  if (isShown) {
    return (
      <div id="mainYearBox">
        <p className={`${darkTheme ? 'dark' : 'light'}Words`}>Year {year}</p>
      </div>
    );
  } else {
    return null;
  }
}
