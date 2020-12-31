import {NOT_CLEARED, NORMAL, SU} from '../../../Constants';

export default function UpdateGrade(
  currGradeConstArr,
  newGradeIdx,
  currModule,
  globalData,
) {
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

    calcData.totalMxP = newMxP;
    calcData.totalMCClearedInternal = newMc;

    if (isNaN(newCap) || newCap === Infinity) {
      calcData.currentCap = 0.0;
    } else {
      calcData.currentCap = newCap;
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

  if (
    (prevGradeObj.grade === 'S' || prevGradeObj.grade === 'U') &&
    !(newGradeObj.grade === 'S' || newGradeObj.grade === 'U')
  ) {
    calcData.suUsed -= currModuleCredit;
    calcData.suLeft = calcData.totalSU - calcData.suUsed;
  } else if (
    !(prevGradeObj.grade === 'S' || prevGradeObj.grade === 'U') &&
    (newGradeObj.grade === 'S' || newGradeObj.grade === 'U')
  ) {
    calcData.suUsed += currModuleCredit;
    calcData.suLeft = calcData.totalSU - calcData.suUsed;
  }

  calcData.mcLeft = calcData.totalMCAdded - calcData.totalMCClearedExternal;

  return tempGlobalData;
}
