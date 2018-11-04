/**@module main */

import {removeWhiteSpaceInNumbers} from './user-inputs/whitespace';
import {connectInputs ,paymentInput, paymentRange, depositRange, depositInput} from './user-inputs/connect-inputs';
import {showBanks, showMaxPropertyCost} from './banks/showbanks';
import {makeBanksButtonsFunctional} from './bank-popup/popup';
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

function getUserInfo() {
  userInfo = {
    payment: removeWhiteSpaceInNumbers(paymentInput.value),
    deposit: removeWhiteSpaceInNumbers(depositInput.value),
    duration: document.querySelector('.duration__input').value
  }
}

const countButton = document.querySelector('.mortgage-parameters__button');
countButton.addEventListener('click', function(evt) {
  getUserInfo();
  showBanks();
  showMaxPropertyCost();
  makeBanksButtonsFunctional();
})