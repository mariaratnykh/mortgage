import {removeWhiteSpaceInNumbers} from './whitespace';
import {connectInputs ,paymentInput, paymentRange, depositRange, depositInput} from './connect-inputs';
import {showBanks, showMaxPropertyCost} from './showbanks';
import {minPercent, banks} from './banks';
import {makeBanksButtonsFunctional} from './popup';

connectInputs(paymentInput, paymentRange);
connectInputs(depositInput, depositRange);

const countButton = document.querySelector('.mortgage-parameters__button');
countButton.addEventListener('click', function(evt) {
    window.userInfo = {
        payment: removeWhiteSpaceInNumbers(paymentInput.value),
        deposit: removeWhiteSpaceInNumbers(depositInput.value),
        duration: document.querySelector('.duration-input').value,
        get maxCredit() {
            let creditAmount = Math.round((1200 * this.payment*(1 - Math.pow((1 + minPercent/1200), -12 * this.duration)))/minPercent);
            return creditAmount;
        },
        get totalPropertyCost() {
            return +this.maxCredit + +this.deposit
        }
    }
    showBanks();
    showMaxPropertyCost();
    console.log(document.querySelector('.bank__card--button').data)
    makeBanksButtonsFunctional();
})