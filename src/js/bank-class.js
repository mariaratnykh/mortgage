export class Bank {

  constructor(name, percent, deposit, logo, rating) {
    this.name = name,
    this.percent = percent,
    this.depositPercent = deposit,
    this.logo = logo,
    this.rating = rating
  }

  creditAmountForUser () {
    return Math.round((1200 * userInfo.payment*(1 - Math.pow((1 + this.percent/1200), -12 * userInfo.duration)))/this.percent);
  }

  creditAmountPlusDeposit () {
    return +this.creditAmountForUser() + +userInfo.deposit;
  }
  
  interestPaymentsPerYear() { // money paid as a percents for the loan
    let creditAmount = this.creditAmountForUser();
    let interestPayments = [];
    // recursive function
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

  interestPaymentsTotal() {
    return this.interestPaymentsPerYear().reduce((a,b) => a + b);
  }

  loanPaymentsPerMonth() {
    let outputArr = [];
    this.interestPaymentsPerMonth().forEach((value, i) =>  {
      outputArr[i] = userInfo.payment - value;
    });
    return outputArr;
  }

  loanPaymentsPerYear() {
    let outputArr = [];
    this.loanPaymentsPerMonth().forEach((value, i) =>  {
      outputArr[i] = value*12;
    });
    return outputArr;
  }

  interestPaymentsPerMonth() {
    let interestPerMonth = this.interestPaymentsPerYear().map((a) => Math.round(a/12));
    return interestPerMonth;
  }

  isGiveTheLoan() {
    return (userInfo.deposit / this.creditAmountPlusDeposit() > (this.depositPercent/100));
  }
}