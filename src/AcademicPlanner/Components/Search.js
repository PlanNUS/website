//An implementation of binary search
export default function Search(moduleData, moduleDataLength, userInput) {
  let startIndex = 0;
  let endIndex = moduleDataLength - 1;

  while (startIndex <= endIndex) {
    let midIndex = Math.floor((startIndex + endIndex) / 2);
    let currentModuleCode = moduleData[midIndex].moduleCode;

    //Search with module letter code
    if (currentModuleCode.indexOf(userInput) === 0) {
      // if (currentModuleCode.localeCompare(userInput) === 0) {
      // console.log('inside mid index');
      // let counter = 0;
      // console.log('Current mid index ' + midIndex);
      // console.log(moduleData[midIndex]);

      if (moduleData[midIndex].moduleCode > userInput) {
        while (
          midIndex - 1 > -1 &&
          moduleData[midIndex].moduleCode > userInput
        ) {
          // counter++;
          midIndex--;
        }

        if (!moduleData[midIndex].moduleCode.includes(userInput)) {
          midIndex++;
        }
        // console.log('decreased by ' + counter);
      } else if (moduleData[midIndex].moduleCode < userInput) {
        while (
          midIndex + 1 < moduleDataLength &&
          moduleData[midIndex].moduleCode < userInput
        ) {
          // counter++;
          midIndex++;
        }

        if (!moduleData[midIndex].moduleCode.includes(userInput)) {
          midIndex--;
        }
        // console.log('increase by ' + counter);
      }

      // console.log(moduleData[midIndex]);
      return midIndex;
    } else if (currentModuleCode < userInput) {
      // console.log('inside else if');
      startIndex = midIndex + 1;
    } else {
      endIndex = midIndex - 1;
    }
  }

  return -1;
}
