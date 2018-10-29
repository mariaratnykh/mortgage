export {connectInputs ,paymentInput, paymentRange, depositRange, depositInput}
import {addWhiteSpaceInNumbers, removeWhiteSpaceInNumbers} from './whitespace';

let paymentInput = document.querySelector('.monthly-payment__input');
let paymentRange = document.querySelector('.payment-range');
let depositRange = document.querySelector('.deposit-range');
let depositInput = document.querySelector('.deposit__input');

paymentInput.value = addWhiteSpaceInNumbers(paymentInput.value);
depositInput.value = addWhiteSpaceInNumbers(depositInput.value);

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