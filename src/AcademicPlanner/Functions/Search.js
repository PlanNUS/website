//An implementation of binary search
export default function Search(moduleData, moduleDataLength, userInput) {
  let startIndex = 0;
  let endIndex = moduleDataLength - 1;

  while (startIndex <= endIndex) {
    let midIndex = Math.floor((startIndex + endIndex) / 2);
    let currentModuleCode = moduleData[midIndex].moduleCode;

    //Search with module letter code
    if (currentModuleCode.indexOf(userInput) === 0) {
      if (moduleData[midIndex].moduleCode > userInput) {
        while (
          midIndex - 1 > -1 &&
          moduleData[midIndex].moduleCode > userInput
        ) {
          midIndex--;
        }

        if (!moduleData[midIndex].moduleCode.includes(userInput)) {
          midIndex++;
        }
      } else if (moduleData[midIndex].moduleCode < userInput) {
        while (
          midIndex + 1 < moduleDataLength &&
          moduleData[midIndex].moduleCode < userInput
        ) {
          midIndex++;
        }

        if (!moduleData[midIndex].moduleCode.includes(userInput)) {
          midIndex--;
        }
      }

      return midIndex;
    } else if (currentModuleCode < userInput) {
      startIndex = midIndex + 1;
    } else {
      endIndex = midIndex - 1;
    }
  }

  return -1;
}
