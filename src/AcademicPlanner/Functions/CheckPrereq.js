export function CheckPrereq(reqData, currentCheckModuleCode) {
  console.log(reqData);

  let isToRemove = CheckPrereqRecursive(
    reqData.prereqTree,
    currentCheckModuleCode,
  );

  console.log('is to remove ' + isToRemove);
  console.log(reqData);

  if (isToRemove) {
    if (typeof reqData.prereqTree === 'string') {
      delete reqData.prereqTree;
    } else if (typeof reqData.prereqTree === 'object') {
      if ('or' in reqData.prereqTree) {
        console.log('or is deleted');
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
  console.log('');
  console.log('');
  console.log('');
  console.log('');
  console.log('');
  console.log('');
  // console.log('length of current obj in check prereq ' + currObj.length);
  console.log(currObj);
  console.log(typeof currObj);
  console.log('current check module code ' + currentCheckModuleCode);

  //Condition where the current item is just one string
  if (typeof currObj === 'string') {
    if (
      currentCheckModuleCode.length === currObj.length &&
      currentCheckModuleCode.includes(currObj)
    ) {
      console.log('ran in string and return true');
      return true;
    }
  } else {
    let objLength = 0;

    if (currObj.length === undefined) {
      objLength = Object.keys(currObj).length;
    } else {
      objLength = currObj.length;
    }

    console.log('current obj.length ' + objLength);

    for (let i = 0; i < objLength; i++) {
      if (typeof currObj[i] === 'string') {
        console.log('String ran');
        if (
          currentCheckModuleCode.length === currObj[i].length &&
          currentCheckModuleCode.includes(currObj[i])
        ) {
          currObj.splice(i);
        }
      } else {
        // else if (typeof currObj[i] === 'object') {
        if ('and' in currObj) {
          console.log('AND ran');
          const andData = currObj.and;
          console.log(andData);

          for (let j = 0; j < andData.length; j++) {
            //Condition where current entry of 'and is a module code
            if (typeof andData[j] === 'string') {
              if (
                currentCheckModuleCode.length === andData[j].length &&
                currentCheckModuleCode.includes(andData[j])
              ) {
                andData.splice(j, 1);

                console.log('after string splice in and');
                console.log(andData);

                if (andData.length === 0) {
                  console.log('shouldnt run here after string splice in and');
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

              console.log('after and');
              console.log(andData);
            }
          }
        } else if ('or' in currObj) {
          console.log('OR ran');
          const orData = currObj.or;
          console.log(orData);

          for (let j = 0; j < orData.length; j++) {
            console.log(orData[j]);
            //Condition where current entry of 'or' is a module code
            if (typeof orData[j] === 'string') {
              if (
                currentCheckModuleCode.length === orData[j].length &&
                currentCheckModuleCode.includes(orData[j])
              ) {
                console.log('Ran in or string');
                return true;
              }
            } else if (typeof orData[j] === 'object') {
              // const currLengthBefor
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
