import FetchFullData from '../../CorePage/Functions/FetchFullData';

import {TOTAL_YEAR, TOTAL_SEMESTER} from '../../../Constants';

export default function VerifyAllModules(allData) {
  console.log('ini');
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
          newAllData[5].totalMCAdded,
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
  totalMCAdded,
) {
  // console.log('jafshdklasd');
  const reqData = FetchFullData(moduleToBeAdded.moduleCode);
  const currentYearSemIndex = ConvertToIndex(currentYear, currentSemester);

  let newModule = {...moduleToBeAdded};

  let isCoreqInSameSem = false;

  // console.log(
  //   'total modular credits sent in ' +
  //     totalMCAdded +
  //     ', type = ' +
  //     typeof totalMCAdded,
  // );
  // console.log(
  //   'module to be added credit ' +
  //     moduleToBeAdded.moduleCredit +
  //     ', type = ' +
  //     typeof moduleToBeAdded.moduleCredit,
  // );

  // console.log(reqData);

  if (totalMCAdded === parseInt(moduleToBeAdded.moduleCredit)) {
    // console.log('ran');
    if ('prereqTree' in reqData) {
      newModule.isPrereqCleared = false;
      newModule.isFlagged = true;
    }

    if (!('corequisite' in reqData)) {
      isCoreqInSameSem = true;
    }
  } else {
    // console.log('ran ran');
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
            // } else if (currentYear === year && currentSemester === semester) {
          } else if (currentYearSemIndex === toCheckYearSemIndex) {
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
  }

  if (!isCoreqInSameSem) {
    newModule.isCoreqInSameSem = false;
    newModule.isFlagged = true;
  }

  return newModule;
}

function CheckPrereq(reqData, currentCheckModuleCode) {
  let isToRemove = CheckPrereqRecursive(
    reqData.prereqTree,
    currentCheckModuleCode,
  );

  if (isToRemove) {
    if (typeof reqData.prereqTree === 'string') {
      delete reqData.prereqTree;
    } else if (typeof reqData.prereqTree === 'object') {
      if ('or' in reqData.prereqTree) {
        delete reqData.prereqTree;
      } else if (
        'and' in reqData.prereqTree &&
        Object.keys(reqData.prereqTree.and).length === 0
      ) {
        delete reqData.prereqTree;
      }
    }
  }
}

function CheckPrereqRecursive(currObj, currentCheckModuleCode) {
  //Condition where the current item is just one string
  if (typeof currObj === 'string') {
    if (
      currentCheckModuleCode.length === currObj.length &&
      currentCheckModuleCode.includes(currObj)
    ) {
      return true;
    }
  } else {
    let objLength = 0;

    if (currObj.length === undefined) {
      objLength = Object.keys(currObj).length;
    } else {
      objLength = currObj.length;
    }

    for (let i = 0; i < objLength; i++) {
      if (typeof currObj[i] === 'string') {
        if (
          currentCheckModuleCode.length === currObj[i].length &&
          currentCheckModuleCode.includes(currObj[i])
        ) {
          currObj.splice(i);
        }
      } else {
        // else if (typeof currObj[i] === 'object') {
        if ('and' in currObj) {
          const andData = currObj.and;

          for (let j = 0; j < andData.length; j++) {
            //Condition where current entry of 'and is a module code
            if (typeof andData[j] === 'string') {
              if (
                currentCheckModuleCode.length === andData[j].length &&
                currentCheckModuleCode.includes(andData[j])
              ) {
                andData.splice(j, 1);

                if (andData.length === 0) {
                  return true;
                }
              }
            } else if (typeof andData[j] === 'object') {
              const isRemove = CheckPrereqRecursive(
                andData[j],
                currentCheckModuleCode,
              );

              if (isRemove === true) {
                andData.splice(j, 1);
              }
            }
          }
        } else if ('or' in currObj) {
          const orData = currObj.or;

          for (let j = 0; j < orData.length; j++) {
            //Condition where current entry of 'or' is a module code
            if (typeof orData[j] === 'string') {
              if (
                currentCheckModuleCode.length === orData[j].length &&
                currentCheckModuleCode.includes(orData[j])
              ) {
                return true;
              }
            } else if (typeof orData[j] === 'object') {
              const isRemove = CheckPrereqRecursive(
                orData[j],
                currentCheckModuleCode,
              );

              if (isRemove === true) {
                orData.splice(j);
                return true;
              }
            }
          }
        }
      }
    }
  }

  return false;
}

function ConvertToIndex(year, sem) {
  const yearPlusOne = year * 4;
  const semPlusOne = sem;
  // const semPlusOne = sem + 2;
  // const yearPlusOne = year + 1;

  return yearPlusOne + semPlusOne;
}
