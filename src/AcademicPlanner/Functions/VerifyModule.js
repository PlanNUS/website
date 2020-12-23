import FetchPrerequisite from './FetchPrerequisite';
import {CheckPrereq} from './CheckPrereq';
import ConvertToIndex from './ConvertToIndex';

import {TOTAL_YEAR, TOTAL_SEMESTER} from '../../Constants';

export default function VerifyAllModules(allData) {
  let newAllData = [...allData];

  for (let i = 0; i < TOTAL_YEAR; i++) {
    for (let j = 0; j < TOTAL_SEMESTER; j++) {
      let currentSemesterData = newAllData[i][j];

      for (let k = 0; k < currentSemesterData.length; k++) {
        currentSemesterData[k] = VerifyEachModule(
          currentSemesterData[k],
          i,
          j,
          allData,
        );
      }
    }
  }

  return newAllData;
}

function VerifyEachModule(
  moduleToBeAdded,
  currentYear,
  currentSemester,
  fullModuleData,
) {
  const reqData = FetchPrerequisite(moduleToBeAdded.moduleCode);
  const currentYearSemIndex = ConvertToIndex(currentYear, currentSemester);

  let newModule = {...moduleToBeAdded};

  let isCoreqInSameSem = false;

  for (let year = 0; year < TOTAL_YEAR; year++) {
    for (let semester = 0; semester < TOTAL_SEMESTER; semester++) {
      const semesterToCheck = fullModuleData[year][semester];
      const toCheckYearSemIndex = ConvertToIndex(year, semester);
      for (let i = 0; i < semesterToCheck.length; i++) {
        const currentCheckModuleCode = semesterToCheck[i].moduleCode;

        if (currentYearSemIndex > toCheckYearSemIndex) {
          //Check for prereq
          if ('prereqTree' in reqData) {
            CheckPrereq(reqData, currentCheckModuleCode);

            if ('prereqTree' in reqData) {
              newModule.isPrereqCleared = false;
              newModule.isFlagged = true;
            }
          }
        } else if (currentYear === year && currentSemester === semester) {
          //Checking Corequisite
          if ('corequisite' in reqData) {
            if (reqData.corequisite.includes(currentCheckModuleCode)) {
              isCoreqInSameSem = true;
            }
          } else {
            isCoreqInSameSem = true;
          }

          //Checking prerequisite
          if ('prerequisite' in reqData) {
            if (reqData.prerequisite.includes(currentCheckModuleCode)) {
              newModule.isPrereqInSameSem = true;
              newModule.isFlagged = true;
            }
          }
        }

        //Checking preclusion
        if ('preclusion' in reqData) {
          const precluArr = reqData.preclusion.split(',');

          for (let x = 0; x < precluArr.length; x++) {
            if (
              precluArr[x].trim().length === currentCheckModuleCode.length &&
              precluArr[x].includes(currentCheckModuleCode)
            ) {
              newModule.isPrecluAdded = true;
              newModule.isFlagged = true;
              break;
            }
          }
        }
      }
    }
  }

  if (!isCoreqInSameSem) {
    newModule.isCoreqInSameSem = false;
    newModule.isFlagged = true;
  }

  return newModule;
}
