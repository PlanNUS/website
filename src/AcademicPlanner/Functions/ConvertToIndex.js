export default function ConvertToIndex(year, sem) {
  const yearPlusOne = year * 4;
  const semPlusOne = sem;
  // const semPlusOne = sem + 2;
  // const yearPlusOne = year + 1;

  return yearPlusOne + semPlusOne;
}
