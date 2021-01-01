import React from 'react';

import '../../Style/CorePage/Footer.css';
import {VERSION} from '../../Constants';

export default function Footer() {
  return (
    <div id="footerWrapper">
      <div id="clickableLine">
        <p
          id="clickable"
          onClick={() => window.open('https://forms.gle/136gBp2ibtfQzcDb6')}>
          Feedback
        </p>
      </div>
      <p className="lightWords" id="footerFont">
        Data retrieved from NUSMods. Any feedback will be much appriciated.
        &#9924;
      </p>
      <p className="lightWords" id="footerFont">
        Current version: {VERSION}
      </p>
    </div>
  );
}
