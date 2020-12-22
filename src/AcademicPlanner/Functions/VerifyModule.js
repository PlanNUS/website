import FetchPrerequisite from './FetchPrerequisite';
import {CheckPrereq} from './CheckPrereq';
import ConvertToIndex from './ConvertToIndex';

export function VerifyModulesForAddition(
  moduleToBeAdded,
  currentYear,
  currentSemester,
  fullModuleData,
  totalModularCredits,
) {
  const reqData = FetchPrerequisite(moduleToBeAdded.moduleCode);
  const currentYearSemIndex = ConvertToIndex(currentYear, currentSemester);

  console.log('current year sem index: ' + currentYearSemIndex);

  // console.log('Data fetched:');
  // console.log(reqData);

  let newModule = {...moduleToBeAdded};

  if (totalModularCredits === 0) {
    console.log('ran inside 0 mouldar credit');
    console.log(reqData);
    if ('prereqTree' in reqData) {
      newModule.prereqCleared = false;
      newModule.isFlagged = true;
    }
  } else {
    for (let year = 0; year < 5; year++) {
      for (let semester = 0; semester < 4; semester++) {
        const semesterToCheck = fullModuleData[year][semester];
        const toCheckYearSemIndex = ConvertToIndex(year, semester);

        // console.log('Semester to check:');
        // console.log(semesterToCheck);

        console.log('current year: ' + year + ', current sem: ' + semester);
        console.log('to check year sem: ' + toCheckYearSemIndex);
        for (let i = 0; i < semesterToCheck.length; i++) {
          const currentCheckModuleCode = semesterToCheck[i].moduleCode;

          if (currentYearSemIndex >= toCheckYearSemIndex) {
            console.log('ran ran');

            //Check for prereq
            if ('prereqTree' in reqData) {
              const prereqData = reqData.prereqTree;

              console.log('ran here');
              console.log('typeof prereqdata ' + typeof prereqData);
              CheckPrereq(prereqData, currentCheckModuleCode);

              if (!prereqData.length === 0) {
                newModule.prereqCleared = false;
                newModule.isFlagged = true;
              }
            }
          } else if (currentYear === year && currentSemester === semester) {
            //Checking Corequisite
            if ('corequisite' in reqData) {
              if (reqData.corequisite.includes(currentCheckModuleCode)) {
                newModule.coreqInSameSem = true;
                newModule.isFlagged = true;
              }
            } else {
              newModule.coreqInSameSem = true;
              newModule.isFlagged = false;
            }

            //Checking prerequisite
            if ('prerequisite' in reqData) {
              if (reqData.prerequisite.includes(currentCheckModuleCode)) {
                newModule.prereqInSameSem = true;
                newModule.isFlagged = true;
              }
            }
          }

          //Checking preclusion
          if ('preclusion' in reqData) {
            if (reqData.preclusion.includes(currentCheckModuleCode)) {
              newModule.precluAdded = true;
              newModule.isFlagged = true;
            }
          }
        }
      }
    }
  }

  return newModule;
}
