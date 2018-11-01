/** @module whitespace */

export {addWhiteSpaceInNumbers, removeWhiteSpaceInNumbers}

/**
 * Function that makes numbers readable by adding whitespace
 * @static
 * @param {number|string} param - number
 * @returns {string} - number with whitespaces 
 */

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
/**
 * Function that removes whitespace from string. Uses for working with numbers 
 * with whitespace in it
 * @static
 * @param {string} param 
 * @returns {string}
 */
function removeWhiteSpaceInNumbers (param) {
  let str = String(param);
  let outStr = str.split(' ').join('');
  return outStr;
}