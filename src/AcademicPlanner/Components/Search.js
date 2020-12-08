//An implementation of binary search
export default function Search(moduleData, moduleDataLength, userInput) {
  let startIndex = 0;
  let endIndex = moduleDataLength - 1;
  // let currentChar = 0;

  // Iterate while start not meets end
  while (startIndex <= endIndex) {
    let midIndex = Math.floor((startIndex + endIndex) / 2);

    // If element is present at mid, return True
    if (moduleData[midIndex].moduleCode.indexOf(userInput) === 0) {
      return midIndex;
    } else if (
      //Test out whether need manually code the letter by letter check
      // moduleData[midIndex].moduleCode.charAt(currentChar) <
      // userInput.charAt(currentChar)
      moduleData[midIndex].moduleCode < userInput
    ) {
      startIndex = midIndex + 1;
      // currentChar++;
    } else {
      endIndex = midIndex - 1;
      // currentChar++;
    }
  }

  return -1;
}
