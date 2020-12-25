import React from 'react';
import Slide from '@material-ui/core/Slide';

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AcadamicYear = '2020-2021';

export const TOTAL_YEAR = 5;

export const TOTAL_SEMESTER = 4;

export const FLAGS = {
  isFlagged: false, //default is false
  isPrereqCleared: true, //Value must be true, default is true
  isPrereqInSameSem: false, //Value must be false
  isCoreqInSameSem: true, //Value must be true, default is true
  isPrecluAdded: false, //value must be false, default is false
};

export const GRADES = [
  {grade: '*', gradePoint: -1.0},
  {grade: 'A+', gradePoint: 5.0},
  {grade: 'A', gradePoint: 5.0},
  {grade: 'A-', gradePoint: 4.5},
  {grade: 'B+', gradePoint: 4.0},
  {grade: 'B', gradePoint: 3.5},
  {grade: 'B-', gradePoint: 3.0},
  {grade: 'C+', gradePoint: 2.5},
  {grade: 'C', gradePoint: 2.0},
  {grade: 'D+', gradePoint: 1.5},
  {grade: 'D', gradePoint: 1.0},
  {grade: 'F', gradePoint: 0.0},
  {grade: 'S', gradePoint: 0.0},
  {grade: 'U', gradePoint: 0.0},
  {grade: 'CS', gradePoint: 0.0},
  {grade: 'CU', gradePoint: 0.0},
  {grade: 'EXE', gradePoint: 0.0},
  {grade: 'IC', gradePoint: 0.0},
  {grade: 'IP', gradePoint: 0.0},
  {grade: 'W', gradePoint: 0.0},
];
