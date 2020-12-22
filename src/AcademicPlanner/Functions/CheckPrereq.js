export function CheckPrereq(currObj, currentCheckModuleCode) {
  console.log(currObj.length);
  for (let i = 0; i < currObj.length; i++) {
    if (typeof currObj[i] === 'string') {
      console.log('String ran');
      if (
        currentCheckModuleCode.length === currObj[i] &&
        currentCheckModuleCode.includes(currObj[i])
      ) {
        currObj.splice(i);
      }
    } else if (typeof currObj[i] === 'object') {
      if ('and' in currObj) {
        console.log('AND ran');
        const andData = currObj.and;

        for (let j = 0; j < andData.length; j++) {
          //Condition where current entry of 'and is a module code
          if (typeof andData[j] === 'string') {
            if (
              currentCheckModuleCode.length === andData[j] &&
              currentCheckModuleCode.includes(andData[j])
            ) {
              andData.splice(j);

              if (andData.length === 0) {
                return true;
              }
            }
          } else if (typeof andData[j] === 'object') {
            const isRemove = CheckPrereq(andData[j], currentCheckModuleCode);

            if (isRemove === true) {
              andData.splice(j);
            }
          }
        }
      } else if ('or' in currObj) {
        console.log('OR ran');
        const orData = currObj.or;

        for (let j = 0; j < orData.length; j++) {
          //Condition where current entry of 'or' is a module code
          if (typeof orData[j] === 'string') {
            if (
              currentCheckModuleCode.length === orData[j] &&
              currentCheckModuleCode.includes(orData[j])
            ) {
              return true;
            }
          } else if (typeof orData[j] === 'object') {
            const isRemove = CheckPrereq(orData[j], currentCheckModuleCode);

            if (isRemove === true) {
              orData.splice(j);
            }
          }
        }
      }
    }
  }

  return false;
}

// export function back() {
//   if ('and' in reqData) {
//     const andData = prereqData.and;

//     for (let j = 0; j < andData.length; j++) {
//       //Condition where current entry of prereqTree.and is a module code
//       if (typeof andData[j] === 'string') {
//         if (
//           currentCheckModuleCode.length === andData[j] &&
//           currentCheckModuleCode.includes(andData[j])
//         ) {
//           andData.splice(j);
//           break;
//         }
//       } else if (typeof andData[j] === 'object') {
//         //Condition where current entry of prereqTree.and is an 'or' object
//         if ('or' in andData[j]) {
//           const orEntry = andData[j].or;
//           let breakFlag = false;

//           for (let k = 0; k < orEntry.length; k++) {
//             if (
//               currentCheckModuleCode.length === orEntry[k] &&
//               currentCheckModuleCode.includes(orEntry[k])
//             ) {
//               andData.splice(j);
//               breakFlag = true;
//               break;
//             }
//           }

//           if (breakFlag === true) {
//             break;
//           }
//         }
//       }
//     }
//   }
// }
