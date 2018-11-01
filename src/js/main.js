/**@module main */

import {removeWhiteSpaceInNumbers} from './whitespace';
import {connectInputs ,paymentInput, paymentRange, depositRange, depositInput} from './connect-inputs';
import {showBanks, showMaxPropertyCost} from './showbanks';
import {makeBanksButtonsFunctional} from './popup';
import '../css/style.css';
export {userInfo};

connectInputs(paymentInput, paymentRange);
connectInputs(depositInput, depositRange);

/** The object with user's parameters. All calculations in the program depending 
 * on this object. Keys and values records after 'click' event.
 * @static
 * @type {object}
 */
let userInfo = {};

const countButton = document.querySelector('.mortgage-parameters__button');
countButton.addEventListener('click', function(evt) {
  userInfo = {
    payment: removeWhiteSpaceInNumbers(paymentInput.value),
    deposit: removeWhiteSpaceInNumbers(depositInput.value),
    duration: document.querySelector('.duration__input').value
  }
  showBanks();
  showMaxPropertyCost();
  makeBanksButtonsFunctional();
})