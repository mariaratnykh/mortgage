import {addWhiteSpaceInNumbers, removeWhiteSpaceInNumbers} from './whitespace';
const YEAR_PERCENT = 9;

export let screen = document.querySelector('.screen');
screen.appendChild(document.querySelector('.input-screen').content.cloneNode(true));

let paymentInput = document.querySelector('.payment-input');
let paymentRange = document.querySelector('#payment-range');
let depositRange = document.querySelector('#deposit-range');
let depositInput = document.querySelector('.deposit-input');

paymentInput.value = addWhiteSpaceInNumbers(paymentInput.value);
depositInput.value = addWhiteSpaceInNumbers(depositInput.value);

connectInputs(paymentInput, paymentRange);
connectInputs(depositInput, depositRange);

function connectInputs(inputText, inputRange) {
    inputText.addEventListener('input', function(evt) {
        let temp = removeWhiteSpaceInNumbers(evt.target.value);
        inputRange.value = temp;
        inputText.value = addWhiteSpaceInNumbers(temp);
    })
    
    inputRange.addEventListener('input', function(evt) {
        inputText.value = evt.target.value;
        inputText.value = addWhiteSpaceInNumbers(inputText.value);
    })
}

const countButton = document.querySelector('.mortgage-parameters__button');
import {showBanks} from './showbanks';

countButton.addEventListener('click', function(evt) {
    const userInfo = {
        payment: removeWhiteSpaceInNumbers(paymentInput.value),
        deposit: removeWhiteSpaceInNumbers(depositInput.value),
        duration: document.querySelector('.duration-input').value,
        get maxCredit() {
            let creditAmount = Math.round((1200 * this.payment*(1 - Math.pow((1 + YEAR_PERCENT/1200), -12 * this.duration)))/YEAR_PERCENT);
            return creditAmount;
        },
        get totalPropertyCost() {
            return +this.maxCredit + +this.deposit
        }
    }
    showBanks(userInfo);
})