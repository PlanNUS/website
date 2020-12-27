import {NOT_CLEARED, NORMAL, SU} from '../../../Constants';

export default function UpdateGrade(
  currGradeConstArr,
  newGradeIdx,
  currModule,
  globalData,
) {
  // const temp = {
  //   totalSU: 0,
  //   suUsed: 0,
  //   totalMCAdded: 0,
  //   totalMxP: 0,
  //   totalMCClearedInternal: 0,
  //   totalMCClearedExternal: 0,
  //   currentCap: 0.0,
  //   isDarkModeChecked: false,
  // };

  // const temp = { grade: '*', gradePoint: -1.0, type: NOT_CLEARED, isCleared: false };

  // moduleCode: fetchedModuleData[i].moduleCode,
  // moduleCredit: fetchedModuleData[i].moduleCredit,
  // attributes: fetchedModuleData[i].attributes,
  const tempGlobalData = [...globalData];
  const calcData = tempGlobalData[5];

  const currModuleCredit = parseInt(currModule.moduleCredit);

  const prevGradeObj = currGradeConstArr[currModule.gradeIdx];
  const newGradeObj = currGradeConstArr[newGradeIdx];

  if (
    (prevGradeObj.type === NOT_CLEARED || prevGradeObj.type === SU) &&
    newGradeObj.type === NORMAL
  ) {
    calcData.totalMxP += newGradeObj.gradePoint * currModuleCredit;
    console.log(calcData.totalMxP);
    calcData.totalMCClearedInternal += currModuleCredit;
    calcData.currentCap =
      parseFloat(calcData.totalMxP) /
      parseFloat(calcData.totalMCClearedInternal);
  } else if (
    prevGradeObj.type === NORMAL &&
    (newGradeObj.type === NOT_CLEARED || newGradeObj.type === SU)
  ) {
    const newMxP =
      calcData.totalMxP - prevGradeObj.gradePoint * currModuleCredit;
    const newMc = calcData.totalMCClearedInternal - currModuleCredit;
    const newCap = parseFloat(newMxP) / parseFloat(newMc);

    if (isNaN(newCap) || newCap === Infinity) {
      calcData.totalMxP = newMxP;
      calcData.totalMCClearedInternal = newMc;
      calcData.currentCap = 0.0;
    }
  } else if (prevGradeObj.type === NORMAL && newGradeObj.type === NORMAL) {
    const MxPToMinus = prevGradeObj.gradePoint * currModuleCredit;
    const MxPToAdd = newGradeObj.gradePoint * currModuleCredit;

    calcData.totalMxP -= MxPToMinus;
    calcData.totalMxP += MxPToAdd;

    calcData.currentCap =
      parseFloat(calcData.totalMxP) /
      parseFloat(calcData.totalMCClearedInternal);
  }

  if (prevGradeObj.isCleared === true && newGradeObj.isCleared === false) {
    calcData.totalMCClearedExternal -= currModuleCredit;
  } else if (
    prevGradeObj.isCleared === false &&
    newGradeObj.isCleared === true
  ) {
    calcData.totalMCClearedExternal += currModuleCredit;
  }

  // console.log('prev grade');
  // console.log(prevGradeObj);

  // console.log('new grade');
  // console.log(newGradeObj);

  if (
    (prevGradeObj.grade === 'S' || prevGradeObj.grade === 'U') &&
    !(newGradeObj.grade === 'S' || newGradeObj.grade === 'U')
  ) {
    // console.log('ran su to not su');
    calcData.suUsed -= currModuleCredit;
  } else if (
    !(prevGradeObj.grade === 'S' || prevGradeObj.grade === 'U') &&
    (newGradeObj.grade === 'S' || newGradeObj.grade === 'U')
  ) {
    // console.log('ran not su to su');
    calcData.suUsed += currModuleCredit;
  }

  return tempGlobalData;
}
