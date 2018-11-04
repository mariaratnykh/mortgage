/** @module bank-class */

import {userInfo} from '../main';

/** Recursive function. Returns interest payments for every year, depending on debt left
 * @param {number} creditAmount - debt
 * @param {number} payment - monthly payment
 * @param {number} percent - interest rate for the loan
 * @param {object[]} outputArr - array with output values. fuinction memorizes result of each 
 * iteration and pushes them in that array
 * @return {object[]}
 */
function getInterestPayments (creditAmount, payment, percent, outputArr) {
  outputArr.push(Math.round(creditAmount*(percent/100)));
  creditAmount = creditAmount*(1 + (percent/100)) - payment*12;
  if(creditAmount > 0) {
    getInterestPayments(creditAmount, payment, percent, outputArr);
  }
  return outputArr;
};

/** Class representing a Bank
 *  @class
 */
export class Bank {
  /** Create a Bank
   * @param {string} name
   * @param {string} percent - loan's percent
   * @param {string} deposit - percent of loan's deposit
   * @param {string} logo - logo link
   * @param {string} rating 
   */
  constructor(name, percent, deposit, logo, rating) {
    this.name = name,
    this.percent = percent,
    this.depositPercent = deposit,
    this.logo = logo,
    this.rating = rating
  }
  /**
   * Gets given loan for user
   * @return {number}
   */
  creditAmountForUser () {
    return Math.round((1200 * userInfo.payment*(1 - Math.pow((1 + this.percent/1200), -12 * userInfo.duration)))/this.percent);
  }
  /**
   * Gets total money for buying a property (summarized as user's deposit and given loan)
   * @return {number}
   */
  creditAmountPlusDeposit () {
    return +this.creditAmountForUser() + +userInfo.deposit;
  }

  /**
   * Gets percents payments for the loan per year. The value differ 
   * from year to year
   * @return {object[]} Payments for every year
   */
  interestPaymentsPerYear() { 
    let creditAmount = this.creditAmountForUser();
    let interestPayments = [];
    return getInterestPayments(creditAmount, userInfo.payment, this.percent, interestPayments)
  }
  
  /** Summarize all percent payments
   * @return {number} total percent payment
   */
  interestPaymentsTotal() {
    return this.interestPaymentsPerYear().reduce((a,b) => a + b);
  }

  /** Gets monthly repayments of debt
   * @return {object[]} 
  */
  loanPaymentsPerMonth() {
    let outputArr = [];
    this.interestPaymentsPerMonth().forEach((value, i) =>  {
      outputArr[i] = userInfo.payment - value;
    });
    return outputArr;
  }

  /** Gets yearly repayments of debt
   * @return {object[]}
   */
  loanPaymentsPerYear() {
    let outputArr = [];
    this.loanPaymentsPerMonth().forEach((value, i) =>  {
      outputArr[i] = value*12;
    });
    return outputArr;
  }

  /** Gets monthly percent payments (average for every year)
   * @return {object[]}
   */
  interestPaymentsPerMonth() {
    let interestPerMonth = this.interestPaymentsPerYear().map((a) => Math.round(a/12));
    return interestPerMonth;
  }

  /** Whether the bank will issue the loan
   * @param {boolean}
   */
  isGiveTheLoan() {
    return (userInfo.deposit / this.creditAmountPlusDeposit() > (this.depositPercent/100));
  }
}