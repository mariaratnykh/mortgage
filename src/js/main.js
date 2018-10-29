import {removeWhiteSpaceInNumbers} from './whitespace';
import {connectInputs ,paymentInput, paymentRange, depositRange, depositInput} from './connect-inputs';
import {showBanks, showMaxPropertyCost} from './showbanks';
import {minPercent, banks} from './banks-data';
import {makeBanksButtonsFunctional} from './popup';
import '../css/style.css';

connectInputs(paymentInput, paymentRange);
connectInputs(depositInput, depositRange);

const countButton = document.querySelector('.mortgage-parameters__button');
countButton.addEventListener('click', function(evt) {
  window.userInfo = {
    payment: removeWhiteSpaceInNumbers(paymentInput.value),
    deposit: removeWhiteSpaceInNumbers(depositInput.value),
    duration: document.querySelector('.duration__input').value
  }
  showBanks();
  showMaxPropertyCost();
  makeBanksButtonsFunctional();
})