import React from 'react';

import './SemesterBox.css';

export default function SemesterBox(props) {
  const currentSemester = props.currentSemester;

  return (
    <div id="mainBox">
      <p>{currentSemester}</p>
    </div>
  );
}
