import React from 'react';

import '../../Style/CorePage/Footer.css';

export default function Footer(props) {
  const darkTheme = props.darkTheme;

  return (
    <div id="footerWrapper">
      <div id="clickableLine">
        <p
          id="clickable"
          onClick={() => window.open('https://forms.gle/136gBp2ibtfQzcDb6')}>
          Feedback
        </p>
      </div>
      <p className={`${darkTheme ? 'dark' : 'light'}Words`} id="footerFont">
        Data retrieved from NUSMods. Any feedback will be much appriciated.
        &#9924;
      </p>
      <p className={`${darkTheme ? 'dark' : 'light'}Words`} id="footerFont">
        Current version: 0.0.1a (Alpha)
      </p>
    </div>
  );
}
