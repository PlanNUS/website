import React from 'react';
import Slide from '@material-ui/core/Slide';

export const VERSION = '0.0.2a (Alpha)';

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
