/** @module show-banks */

import {banks} from './banks-data';
import {addWhiteSpaceInNumbers} from '../user-inputs/whitespace';
export {showMaxPropertyCost, showBanks};

let screen = document.querySelector('.screen');

/**
 * Funtion creates block with information about max property cost and 
 * insert it before banks cards. 
 * @static
 */
function showMaxPropertyCost () {
  let values = getMaxPropertyCostAndBankName(banks);
  let fragment = document.createDocumentFragment();
  let totalCost = document.createElement('h3');
  if(values[0] != undefined) {
    totalCost.textContent = `Максимально возможная стоимость квартиры по вашим
    параметрам составляет ${addWhiteSpaceInNumbers(values[0])} рублей в банке "${values[1]}"`; 
  } else {
    totalCost.textContent = `К сожалению, ни один банк не готов предоставить Вам кредит. 
    Попробуйте увеличить сумму первоначального взноса`;
    screen.style.marginBottom = '300px';
  }
  fragment.appendChild(totalCost);
  fragment.appendChild(createReloadButton());
  screen.insertBefore(fragment, screen.firstChild);
}

/** Function creates button, which reloads page */
function createReloadButton () {
  let reloadButton = document.createElement('button');
  reloadButton.classList.add('button');
  reloadButton.classList.add('button-reload');
  reloadButton.textContent = 'Пересчитать снова';
  const reloadButtonHandler = () => {
    window.location.reload();
    reloadButton.removeEventListener('click', reloadButtonHandler);
  }
  reloadButton.addEventListener('click', reloadButtonHandler);
  return reloadButton;
}

/** Function search the maximum of loans from banks. Returns loan value and 
 * bank name.
 * @param {object[]} banks - the array of all banks 
 * @returns {object[]} - [loan, bank.name]
  */
function getMaxPropertyCostAndBankName(banks) {
  let loansArray = [];
  let banksNames = [];
  console.log(banks[0].isGiveTheLoan());
  banks.forEach((bank) => {
    if (bank.isGiveTheLoan()) {
      loansArray.push(+bank.creditAmountPlusDeposit());
      banksNames.push(bank.name);
    }
  });
  console.log(loansArray)
  let maxLoan = Math.max.apply(null, loansArray);
  let maxLoanIndex = loansArray.indexOf(maxLoan);
  return [loansArray[maxLoanIndex], banksNames[maxLoanIndex]];
}

/** Function fill the template of bank-card with bank information
 * @param {object} bank - the instance of Bank class
 * @returns {document-fragment}
 */
function createBankCard (bank) {
  let template = document.querySelector('.bank').content.cloneNode(true);
  template.querySelector('.bank__logo').src = bank.logo;
  template.querySelector('.bank__title').textContent = bank.name;
  template.querySelector('.bank__deposit--title').textContent = bank.depositPercent + '%';
  template.querySelector('.bank__percentage').textContent = bank.percent + '% годовых';
  template.querySelector('.bank__rating--title').textContent = bank.rating + ' место';
  template.querySelector('.bank__card--button').data = bank;
  return template;
}

/** Function shows banks, which is ready to give the loan. Creates and insert
 * bank-cards of such banks.
 * @static
 */
function showBanks () {
  screen.textContent = "";
  banks.forEach((bank) => {
    if(bank.isGiveTheLoan()) {
      screen.appendChild(createBankCard(bank))
    }
  })
}
