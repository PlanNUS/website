import React from 'react';
import Slide from '@material-ui/core/Slide';

export const VERSION = '0.1.0b (Beta)';

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AcadamicYear = '2020-2021';

export const TOTAL_YEAR = 5;
export const TOTAL_SEMESTER = 4;

export const FLAGS = {
  gradeIdx: 0,
  isFlagged: false, //default is false
  isPrereqCleared: true, //Value must be true, default is true
  isPrereqInSameSem: false, //Value must be false
  isCoreqInSameSem: true, //Value must be true, default is true
  isPrecluAdded: false, //value must be false, default is false
};

// export const DO_NOTHING = 0;
export const NOT_CLEARED = 0;
export const NORMAL = 1;
export const SU = 2;

// export const isPassed

export const GRADES_SU = [
  {grade: '*', gradePoint: 0.0, type: NOT_CLEARED, isCleared: false},
  {grade: 'A+', gradePoint: 5.0, type: NORMAL, isCleared: true},
  {grade: 'A', gradePoint: 5.0, type: NORMAL, isCleared: true},
  {grade: 'A-', gradePoint: 4.5, type: NORMAL, isCleared: true},
  {grade: 'B+', gradePoint: 4.0, type: NORMAL, isCleared: true},
  {grade: 'B', gradePoint: 3.5, type: NORMAL, isCleared: true},
  {grade: 'B-', gradePoint: 3.0, type: NORMAL, isCleared: true},
  {grade: 'C+', gradePoint: 2.5, type: NORMAL, isCleared: true},
  {grade: 'C', gradePoint: 2.0, type: NORMAL, isCleared: true},
  {grade: 'D+', gradePoint: 1.5, type: NORMAL, isCleared: true},
  {grade: 'D', gradePoint: 1.0, type: NORMAL, isCleared: true},
  {grade: 'F', gradePoint: 0.0, type: NORMAL, isCleared: false},
  {grade: 'S', gradePoint: 0.0, type: SU, isCleared: true},
  {grade: 'U', gradePoint: 0.0, type: SU, isCleared: false},
  {grade: 'EXE', gradePoint: 0.0, type: SU, isCleared: false},
  // {grade: 'IC', gradePoint: 0.0, type: NOT_CLEARED},
  // {grade: 'IP', gradePoint: 0.0, type: NOT_CLEARED},
  // {grade: 'W', gradePoint: 0.0, type: NOT_CLEARED},
];

export const GRADES = [
  {grade: '*', gradePoint: 0.0, type: NOT_CLEARED, isCleared: false},
  {grade: 'A+', gradePoint: 5.0, type: NORMAL, isCleared: true},
  {grade: 'A', gradePoint: 5.0, type: NORMAL, isCleared: true},
  {grade: 'A-', gradePoint: 4.5, type: NORMAL, isCleared: true},
  {grade: 'B+', gradePoint: 4.0, type: NORMAL, isCleared: true},
  {grade: 'B', gradePoint: 3.5, type: NORMAL, isCleared: true},
  {grade: 'B-', gradePoint: 3.0, type: NORMAL, isCleared: true},
  {grade: 'C+', gradePoint: 2.5, type: NORMAL, isCleared: true},
  {grade: 'C', gradePoint: 2.0, type: NORMAL, isCleared: true},
  {grade: 'D+', gradePoint: 1.5, type: NORMAL, isCleared: true},
  {grade: 'D', gradePoint: 1.0, type: NORMAL, isCleared: true},
  {grade: 'F', gradePoint: 0.0, type: NORMAL, isCleared: false},
  {grade: 'CS', gradePoint: 0.0, type: SU, isCleared: true},
  {grade: 'CU', gradePoint: 0.0, type: SU, isCleared: false},
  {grade: 'EXE', gradePoint: 0.0, type: SU, isCleared: false},
  // {grade: 'IC', gradePoint: 0.0, type: NOT_CLEARED},
  // {grade: 'IP', gradePoint: 0.0, type: NOT_CLEARED},
  // {grade: 'W', gradePoint: 0.0, type: NOT_CLEARED},
];

export const BORDER_WIDTH = 2;

export const STYLES = {
  globalBackgroundColor: 'white',

  notificationBorderColor: 'green',
  notificationBackgroundColor: '#dbfaf1',
  notificationWidth: BORDER_WIDTH,

  disclaimerBorderColor: 'blue',
  disclaimerBackgroundColor: '#e1effa',
  disclaimerWidth: BORDER_WIDTH,

  appBorderColor: '#4000ff',
  appBackgroundColor: '#eeecff',
  appWidth: BORDER_WIDTH,

  yearBorderColor: '#6d51d0',
  yearBackgroundColor: '#d9d5ff',
  yearWidth: BORDER_WIDTH,

  semBorderColor: '#ffab3f',
  semBackgroundColor: '#cdc8fb',
  semWidth: BORDER_WIDTH,

  modBorderColor: '#ffcc00',
  modBackgroundColor: '#c6c0fd',
  modWidth: BORDER_WIDTH + 1,

  inputBorderColor: '#ffab3f',
  inputBackgroundColor: 'transparent',
  inputWidth: BORDER_WIDTH,

  selectorBorderColor: '#ffcc00',
  selectorBackgroundColor: 'transparent',
  selectorWidth: BORDER_WIDTH,

  sideIconColor: '#262626',
  sideFontColor: '#262626',

  appButtonIconColor: 'white',
  appButtonFontColor: 'white',

  dialogBackgroundColor: 'white',
  dialogFontColor: 'black',
  dialogButtonColor: 'blue',

  fontColor: '#262626',
  controlButtons: '#5a5a5a',
};

export const DARK_STYLES = {
  globalBackgroundColor: '#3d3d3d',

  notificationBorderColor: '#84ff84',
  notificationBackgroundColor: '#9ab19c',
  notificationWidth: BORDER_WIDTH,

  disclaimerBorderColor: '#5757fd',
  disclaimerBackgroundColor: '#949fa8',
  disclaimerWidth: BORDER_WIDTH,

  appBorderColor: '#e3defd',
  appBackgroundColor: '#6c6b77',
  appWidth: BORDER_WIDTH,

  yearBorderColor: '#d9d5ff',
  yearBackgroundColor: '#8e8c9d',
  yearWidth: BORDER_WIDTH,

  semBorderColor: '#ffd194',
  semBackgroundColor: '#adabc2',
  semWidth: BORDER_WIDTH,

  modBorderColor: '#ffea98',
  modBackgroundColor: '#c3c1d9',
  modWidth: BORDER_WIDTH + 1,

  inputBorderColor: '#ffd194',
  inputBackgroundColor: 'transparent',
  inputWidth: BORDER_WIDTH,

  selectorBorderColor: '#ffea98',
  selectorBackgroundColor: 'transparent',
  selectorWidth: BORDER_WIDTH,

  sideIconColor: '#cccccc',
  sideFontColor: '#cccccc',

  appButtonIconColor: 'white',
  appButtonFontColor: 'white',

  dialogBackgroundColor: 'white',
  dialogFontColor: 'black',
  dialogButtonColor: 'blue',

  fontColor: 'black',
  controlButtons: 'white',
};
