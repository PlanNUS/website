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
  ['"mcLeft":', 'Q='],
  ['"targetCapString":', 'R='],
  ['"targetCap":', 'S='],
  ['"neededCap":', 'T='],
  ['"currentCap":', 'U='],
  ['"isDarkModeChecked":', 'V='],
  ['"isDisplayed":', 'W='],

  ['true', 't'],
  ['false', 'f'],
];

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
