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
