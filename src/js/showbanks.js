import {banks} from './banks';
import {addWhiteSpaceInNumbers} from './whitespace';
export {showMaxPropertyCost, showBanks};

let screen = document.querySelector('.screen');

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

function createReloadButton () {
  let reloadButton = document.createElement('button');
  reloadButton.classList.add('button');
  reloadButton.classList.add('button-reload');
  reloadButton.textContent = 'Пересчитать снова';
  reloadButton.addEventListener('click', function() {
    window.location.reload();
  })
  return reloadButton;
}

function getMaxPropertyCostAndBankName(banks) {
  let loansArray = [];
  let banksNames = [];
  banks.forEach((bank) => {
    if (bank.isGiveTheLoan) {
      loansArray.push(+bank.creditAmountPlusDeposit);
      banksNames.push(bank.name);
    }
  });
  let maxLoan = Math.max.apply(null, loansArray);
  let maxLoanIndex = loansArray.indexOf(maxLoan);
  return [loansArray[maxLoanIndex], banksNames[maxLoanIndex]];
}

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

function showBanks () {
  screen.textContent = "";
  banks.forEach((bank) => {
    if(bank.isGiveTheLoan) {
      screen.appendChild(createBankCard(bank))
    }
  })
}
