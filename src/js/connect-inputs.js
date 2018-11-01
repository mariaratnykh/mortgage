/** @module connect-inputs */

export {
  paymentInput, paymentRange, depositRange, depositInput,
  connectInputs
}
import {addWhiteSpaceInNumbers, removeWhiteSpaceInNumbers} from './whitespace';

const paymentInput = document.querySelector('.monthly-payment__input');
const paymentRange = document.querySelector('.payment-range');
const depositRange = document.querySelector('.deposit-range');
const depositInput = document.querySelector('.deposit__input');

paymentInput.value = addWhiteSpaceInNumbers(paymentInput.value);
depositInput.value = addWhiteSpaceInNumbers(depositInput.value);

  /** The function connects values of input[text] and input[range]
   * @function
   * @static
   * @param inputText - input['text']
   * @param inputRange - input['range']
   */
function connectInputs(inputText, inputRange) {

  inputText.addEventListener('input', function(evt) {
    let temp = removeWhiteSpaceInNumbers(evt.target.value);
    inputRange.value = temp;
    inputText.value = addWhiteSpaceInNumbers(temp);
  });

  inputRange.addEventListener('input', function(evt) {
    inputText.value = evt.target.value;
    inputText.value = addWhiteSpaceInNumbers(inputText.value);
  });
}