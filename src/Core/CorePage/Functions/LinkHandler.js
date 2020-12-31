import {TOTAL_YEAR, TOTAL_SEMESTER} from '../../../Constants';

// const replaceArr = [
//   [/"moduleCode":/g, ''],
//   [/"moduleCredit":/g, '|'],
//   [/"attributes":/g, '|'],
//   [/"gradeIdx":/g, '|'],
//   [/"isFlagged":/g, '|'],
//   [/"isPrereqCleared":/g, '|'],
//   [/"isPrereqInSameSem":/g, '|'],
//   [/"isCoreqInSameSem":/g, '|'],
//   [/"isPrecluAdded":/g, '|'],

//   [/"su":/g, '^'],

//   [/"semModularCredit":/g, '_'],

//   [/"totalSU":/g, '&'],
//   [/"suUsed":/g, '&'],
//   [/"suLeft":/g, '&'],
//   [/"totalMCAdded":/g, '&'],
//   [/"totalMxP":/g, '&'],
//   [/"totalMCClearedInternal":/g, '&'],
//   [/"totalMCClearedExternal":/g, '&'],
//   [/"currentCap":/g, '&'],
//   [/"isDarkModeChecked":/g, '&'],
//   [/"isDisplayed":/g, '&'],

//   [/true/g, 't'],
//   [/false/g, 'f'],
// ];

const replaceArr = [
  ['"moduleCode":', 'A='],
  ['"moduleCredit":', 'B='],
  ['"attributes":', 'C='],
  ['"gradeIdx":', 'D='],
  ['"isFlagged":', 'E='],
  ['"isPrereqCleared":', 'F='],
  ['"isPrereqInSameSem":', 'G='],
  ['"isCoreqInSameSem":', 'H='],
  ['"isPrecluAdded":', 'I='],

  ['"su":', '^'],

  ['"semModularCredit":', '_'],

  ['"totalSU":', 'J='],
  ['"suUsed":', 'K='],
  ['"suLeft":', 'L='],
  ['"totalMCAdded":', 'M='],
  ['"totalMxP":', 'N='],
  ['"totalMCClearedInternal":', 'O='],
  ['"totalMCClearedExternal":', 'P='],
  ['"currentCap":', 'Q='],
  ['"isDarkModeChecked":', 'R='],
  ['"isDisplayed":', 'S='],

  ['true', 't'],
  ['false', 'f'],
];

// const reformatString = [
//   ['t', 'true'],
//   ['f', 'false'],
//   ['|', '"|":'],
//   ['^', '"su":'],
//   ['_', '"semModularCredit":'],
//   ['&', '"&":'],
// ];

export async function dataToLink(globalData) {
  var codec = require('json-url')('lzma');
  let finalString = JSON.stringify(globalData);
  const replaceLen = replaceArr.length;

  for (let i = 0; i < replaceLen; i++) {
    const tempString = finalString.replaceAll(
      replaceArr[i][0],
      replaceArr[i][1],
    );
    finalString = tempString;
  }

  return await codec.compress(finalString).then((result) => {
    return result;
  });
}

export async function linkToData(link) {
  var codec = require('json-url')('lzma');
  return await codec.decompress(link).then((result) => {
    let linkStr = result;
    const reformatLen = replaceArr.length;

    for (let i = reformatLen - 1; i >= 0; i--) {
      const tempString = linkStr.replaceAll(replaceArr[i][1], replaceArr[i][0]);
      linkStr = tempString;
    }

    try {
      const linkObj = JSON.parse(linkStr);
      return linkObj;
    } catch (err) {
      return undefined;
    }
  });
}
