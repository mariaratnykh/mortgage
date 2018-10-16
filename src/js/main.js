let paymentInput = document.querySelector('.payment-input');
let paymentRange = document.querySelector('#payment-range');
let depositRange = document.querySelector('#deposit-range');
let depositInput = document.querySelector('.deposit-input');

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

paymentInput.value = addWhiteSpaceInNumbers(paymentInput.value);
depositInput.value = addWhiteSpaceInNumbers(depositInput.value);

function addWhiteSpaceInNumbers (str) {
    let stringArray = str.split('');
    let whitespaceCount = Math.floor(str.length/3);
    if(whitespaceCount == 0) {
        return str;
    }
    let whitespacePosition = [];
    // count the place of first whitespace
    whitespacePosition[0] = str.length % 3;
    // count places of other whitespace
    for(let i = 1; i < whitespaceCount; i++) {
        whitespacePosition[i] = whitespacePosition[i-1] + 3;
    }
    // sort the array from max to min to not affect position of whitespace
    whitespacePosition.sort((a,b) => b-a);
    whitespacePosition.forEach((number) => stringArray.splice(number, 0, ' '))
    let strWithWhiteSpace = stringArray.join('');
    return strWithWhiteSpace;
}

function removeWhiteSpaceInNumbers (str) {
    let outStr = str.split(' ').join('');
    return outStr;
}

const countButton = document.querySelector('.mortgage-parameters__button');

const payment;
const deposit;
const duration;

countButton.addEventListener('click', function(evt) {
    payment = removeWhiteSpaceInNumbers(paymentInput.value);
    deposit = removeWhiteSpaceInNumbers(depositInput.value);
    duration = document.querySelector('.duration-input').value;
})

export {payment, deposit, duration}