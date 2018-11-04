/** @module popup */

import {createChartForLoan} from './chart';
import {addWhiteSpaceInNumbers} from '../user-inputs/whitespace';
export {makeBanksButtonsFunctional};

let screen = document.querySelector('.screen');

/** Functioin which call showpopup function after press on the bank-card button
 * @function
 * @static
 */
function makeBanksButtonsFunctional (){
  let bankButtons = Array.from(document.querySelectorAll('.bank__card--button'));
  bankButtons.forEach((button) => {
    button.addEventListener('click', showPopup);
  });
}

/** Function for addEventListener. Showing popup and close it
 * @function
 * @param {event} evt - event 'click' from user
*/
function showPopup (evt) {
  let targetBank = evt.target.data;
  document.body.appendChild(createPopup(targetBank));
  createChartForLoan(targetBank.interestPaymentsPerMonth());
  switchChart (targetBank);

  let popupCloseButton = document.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', function(evt) {
    document.body.removeChild(document.querySelector('.popup__wrapper'));
  })
}

/** Function that fills popup with data from selected bank
 * @param {object} bank - the instance of Bank class
 */
function createPopup (bank) {
  let popup = document.querySelector('.bank__popup').content.cloneNode(true);
  popup.querySelector('.popup__title').textContent = bank.name;
  popup.querySelector('.popup__loan').innerHTML = `Банк готов предоставить Вам <br \/>  ${addWhiteSpaceInNumbers(bank.creditAmountPlusDeposit())} рублей`;
  popup.querySelector('.popup__percent-payment').innerHTML = `Переплата составит <br \/>  ${addWhiteSpaceInNumbers(bank.interestPaymentsTotal())} рублей`;
  return popup;
}

/** Function which call chart.createChartForLoan with bank data. Shows two 
 * different charts of bank data, depending on user's choice 
 * @param {object} bank - the instance of Bank class
 * @see module:chart
*/
function switchChart (bank) {
  document.getElementById('percent-month').addEventListener('click', function(evt) {
    createChartForLoan(bank.interestPaymentsPerMonth());
  });
  document.getElementById('loan-month').addEventListener('click', function(evt) {
    createChartForLoan(bank.loanPaymentsPerMonth())
  });
}

// The program doesn't need this removeEventListeners, because 'popup' will be removed
// from the DOM
function removeSwitchChart (bank) {
  document.getElementById('percent-month').removeEventListener('click', function(evt) {
    createChartForLoan(bank.interestPaymentsPerMonth());
  });
  document.getElementById('loan-month').removeEventListener('click', function(evt) {
    createChartForLoan(bank.loanPaymentsPerMonth())
  });
}