export {banks, minPercent};

class Bank {

    constructor(id, name, percent, deposit, logo) {
        this.id = id,
        this.name = name,
        this.percent = percent,
        this.depositPercent = deposit,
        this.logo = logo
    }

    get creditAmountForUser () {
        return Math.round((1200 * userInfo.payment*(1 - Math.pow((1 + this.percent/1200), -12 * userInfo.duration)))/this.percent);
    }

    get creditAmountPlusDeposit () {
        return +this.creditAmountForUser + +userInfo.deposit;
    }
    
    get interestPaymentsPerYear() { // money paid as a percents for the loan
        let creditAmount = this.creditAmountForUser;
        let interestPayments = [];

        function getInterestPayments (creditAmount, payment, percent) {
            interestPayments.push(Math.round(creditAmount*(percent/100)));
            creditAmount = creditAmount*(1 + (percent/100)) - payment*12;
            if(creditAmount > 0) {
                getInterestPayments(creditAmount, payment, percent);
            }
            return interestPayments;
        };

        return getInterestPayments(creditAmount, userInfo.payment, this.percent)
    }

    get interestPaymentsTotal() {
        return this.interestPaymentsPerYear.reduce((a,b) => a + b);
    }

    get loanPaymentsPerMonth() {
        let outputArr = [];
        this.interestPaymentsPerMonth.forEach((value, i) =>  {
            outputArr[i] = userInfo.payment - value;
        });
        return outputArr;
    }

    get loanPaymentsPerYear() {
        let outputArr = [];
        this.loanPaymentsPerMonth.forEach((value, i) =>  {
            outputArr[i] = value*12;
        });
        return outputArr;
    }

    get interestPaymentsPerMonth() {
        let interestPerMonth = this.interestPaymentsPerYear.map((a) => Math.round(a/12));
        return interestPerMonth;
    }

    get isGiveTheLoan() {
        return (userInfo.deposit / userInfo.totalPropertyCost > (this.depositPercent/100));
    }
}

let gas = new Bank('gas', 'Газпромбанк', '9', '10','src/img/gas.png');
let vtb = new Bank('vtb', 'ВТБ', '8.9', '20', 'src/img/vtb.jpg');
let sber = new Bank('sber', 'Сбербанк России', '7.6', '15', 'src/img/sber.png');
let open = new Bank('open', 'Открытие', '8.7', '10', 'src/img/open.jpeg');

const banks = [gas, vtb, sber, open];


let percents = [];
banks.forEach((bank) => percents.push(bank.percent));
let minPercent = Math.min.apply(null, percents);
