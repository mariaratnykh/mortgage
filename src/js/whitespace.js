export {addWhiteSpaceInNumbers, removeWhiteSpaceInNumbers}

function addWhiteSpaceInNumbers (param) {
  let str = String(param);
  let stringArray = str.split('');
  let whitespaceCount = Math.floor(str.length/3);
  if(whitespaceCount == 0) {
    return str;
  }
  let whitespacePosition = [];
  // count the place of first whitespace
  whitespacePosition[0] = str.length % 3;
  // count places of other whitespace
  for(let i = 1; i < whitespaceCount; i++) {
    whitespacePosition[i] = whitespacePosition[i-1] + 3;
  }
  // sort the array from max to min to not affect position of whitespace
  whitespacePosition.sort((a,b) => b-a);
  whitespacePosition.forEach((number) => stringArray.splice(number, 0, ' '))
  let strWithWhiteSpace = stringArray.join('');
  return strWithWhiteSpace;
}

function removeWhiteSpaceInNumbers (param) {
  let str = String(param);
  let outStr = str.split(' ').join('');
  return outStr;
}