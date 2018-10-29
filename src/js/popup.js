import {createChartForLoan} from './chart';
import {addWhiteSpaceInNumbers} from './whitespace';
export {makeBanksButtonsFunctional};

let screen = document.querySelector('.screen');

function makeBanksButtonsFunctional (){
  let bankButtons = Array.from(document.querySelectorAll('.bank__card--button'));
  bankButtons.forEach((button) => {
    button.addEventListener('click', showPopup);
  });
}

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

function createPopup (bank) {
  let popup = document.querySelector('.bank__popup').content.cloneNode(true);
  popup.querySelector('.popup__title').textContent = bank.name;
  popup.querySelector('.popup__loan').innerHTML = `Банк готов предоставить Вам <br \/>  ${addWhiteSpaceInNumbers(bank.creditAmountPlusDeposit())} рублей`;
  popup.querySelector('.popup__percent-payment').innerHTML = `Переплата составит <br \/>  ${addWhiteSpaceInNumbers(bank.interestPaymentsTotal())} рублей`;
  return popup;
}

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