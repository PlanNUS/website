export function CheckPrereq(reqData, currentCheckModuleCode) {
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
